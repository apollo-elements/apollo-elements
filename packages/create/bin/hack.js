#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const index = new URL(path.join('..', 'index.js'), import.meta.url);

async function exists(x) {
  try {
    await fs.access(x, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * ```bash
 * [ -s index.js ]
 * ```
 */
async function dashEss(x) {
  try {
    const { size } = await fs.stat(x);
    return size !== 0;
  } catch {
    return false;
  }
}

async function rm(p) {
  try {
    await fs.rm(p);
  } catch {}
}

async function hack() {
  const command = process.argv.pop();
  switch (command) {
    case 'pre': return (await exists(index)) || await fs.writeFile(index, '', 'utf-8');
    case 'post': return (await dashEss(index)) || await rm(index);
  }
}

hack();
