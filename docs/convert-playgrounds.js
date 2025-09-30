#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join, basename } from 'path';

const files = process.argv.slice(2);

if (!files.length) {
  console.error('Usage: node convert-playgrounds.js <file1> <file2> ...');
  process.exit(1);
}

// Regex to match legacy playground blocks
const playgroundRegex = /```(\w+)\s+playground(-file)?\s+([^\s]+)\s+([^\n]+)\n([\s\S]*?)```/g;

for (const filePath of files) {
  console.log(`Processing ${filePath}...`);

  const content = readFileSync(filePath, 'utf8');
  let newContent = content;
  const matches = [...content.matchAll(playgroundRegex)];

  if (matches.length === 0) {
    console.log(`  No playground blocks found in ${filePath}`);
    continue;
  }

  // Group matches by playground ID
  const playgrounds = new Map();

  for (const match of matches) {
    const [fullMatch, lang, isFile, playgroundId, filename, code] = match;

    if (!playgrounds.has(playgroundId)) {
      playgrounds.set(playgroundId, []);
    }

    playgrounds.get(playgroundId).push({
      fullMatch,
      lang,
      isFile: !!isFile,
      playgroundId,
      filename: filename.trim(),
      code: code.trim()
    });
  }

  // Create directory for playground files
  const fileDir = dirname(filePath);

  // Process each playground
  for (const [playgroundId, blocks] of playgrounds) {
    const playgroundDir = join(fileDir, playgroundId);

    // Create playground directory if it doesn't exist
    if (!existsSync(playgroundDir)) {
      mkdirSync(playgroundDir, { recursive: true });
      console.log(`  Created directory: ${playgroundDir}`);
    }

    // Find the main playground block (first one without -file)
    const mainBlock = blocks.find(b => !b.isFile);

    if (!mainBlock) {
      console.warn(`  Warning: No main playground block found for ${playgroundId}`);
      continue;
    }

    // Write all code blocks to files
    for (const block of blocks) {
      const codeFilePath = join(playgroundDir, block.filename);
      writeFileSync(codeFilePath, block.code + '\n');
      console.log(`  Wrote ${codeFilePath}`);
    }

    // Replace blocks in the markdown
    // First replace the main block
    const mainReplacement = `{{<docs-playground "${playgroundId}" "${mainBlock.lang}">}}
{{<include ${mainBlock.filename}>}}
{{</docs-playground>}}`;

    newContent = newContent.replace(mainBlock.fullMatch, mainReplacement);

    // Then replace the file blocks
    for (const block of blocks) {
      if (block.isFile) {
        const fileReplacement = `{{<playground-file "${playgroundId}" "${block.filename}">}}
{{<include ${block.filename}>}}
{{</playground-file>}}`;

        newContent = newContent.replace(block.fullMatch, fileReplacement);
      }
    }
  }

  // Write the updated markdown file
  writeFileSync(filePath, newContent);
  console.log(`✓ Updated ${filePath}\n`);
}

console.log('Conversion complete!');
