#!/usr/bin/env node

import { prompt } from './prompt';

async function main() {
  try {
    await prompt();
  } catch (e) {
    if (e)
      console.error(e);
  }
}
main();
