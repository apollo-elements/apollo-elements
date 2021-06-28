import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { addPlugin } from 'plugins-manager';
import { slideDecksPlugin } from './eleventy/slide-decks.js';

/**
 * @return {Partial<import('@rocket/cli/dist-types/types/main').RocketPreset>}
 */
export function slideDecks() {
  return {
    path: resolve(dirname(fileURLToPath(import.meta.url))),
    setupEleventyPlugins: [
      addPlugin({
        name: 'slide-decks',
        plugin: slideDecksPlugin,
      }),
    ],
  };
}
