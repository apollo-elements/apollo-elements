/* eslint-env node */
import {
  copyPlaygroundFiles,
  buildPlayground,
} from '../packages/docs/rocket-plugins/build-components.js';

if (process.env.CI)
  buildPlayground();
copyPlaygroundFiles();
