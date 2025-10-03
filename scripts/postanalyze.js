#!/usr/bin/env node
import { readFile, writeFile, readdir } from 'fs/promises';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const typeTablesDir = resolve(__dirname, '../docs/type-tables/');

async function appendTypeTables(manifest) {
  // Get all type table files
  const typeTableFiles = await readdir(typeTablesDir);
  const typeTables = new Map();

  // Load all type tables
  for (const file of typeTableFiles) {
    if (!file.endsWith('.md')) continue;
    const typeName = basename(file, '.md');
    const content = await readFile(resolve(typeTablesDir, file), 'utf-8');
    typeTables.set(typeName, content.trim());
  }

  // Append type tables to matching type references in the manifest
  for (const module of manifest.modules || []) {
    for (const declaration of module.declarations || []) {
      for (const member of declaration.members || []) {
        if (!member.type?.text) continue;

        // Check if this type has a corresponding table
        const typeText = member.type.text;
        for (const [typeName, tableContent] of typeTables) {
          if (typeText.includes(typeName)) {
            member.description = member.description || '';
            if (!member.description.includes(tableContent)) {
              member.description = member.description.trim()
                ? `${member.description.trim()}\n\n${tableContent}`
                : tableContent;
            }
          }
        }
      }
    }
  }
}

async function postAnalyze(manifestPath) {
  // Read the generated manifest
  const manifestContent = await readFile(manifestPath, 'utf-8');
  let manifest = JSON.parse(manifestContent);

  // Append type tables
  await appendTypeTables(manifest);

  // Write back the modified manifest
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
}

const manifestPath = process.argv[2] || resolve(process.cwd(), 'custom-elements.json');
postAnalyze(manifestPath)
  .then(() => console.log(`Post-processed ${manifestPath}`))
  .catch(error => {
    console.error('Post-processing failed:', error);
    process.exit(1);
  });
