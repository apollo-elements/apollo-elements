import { prompt } from './prompt.js';

export async function main(): Promise<void> {
  try {
    await prompt();
  } catch (e) {
    if (e)
      console.error(e);
  }
}
