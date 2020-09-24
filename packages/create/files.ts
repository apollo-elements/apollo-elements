import { promisify } from 'util';

import fs from 'fs';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

export function processTemplate(template: string, interpolations: Record<string, string>): string {
  let partial = template;
  Object.entries(interpolations).forEach(([key, value]) => {
    partial = partial.replace(new RegExp(`<%= ${key} %>`, 'g'), value || '');
  });
  return partial;
}
