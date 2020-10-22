import { promisify } from 'util';

import fs from 'fs';

export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);

export function getInterpolationRegExp(string?: string): RegExp {
  if (typeof string === 'string')
    return new RegExp(`<%= ${string} %>`, 'g');
  else
    return /<%= (\w+) =%>/g;
}

export function processTemplate(template: string, interpolations: Record<string, string>): string {
  let partial = template;

  Object.entries(interpolations).forEach(([key, value]) => {
    partial = partial.replace(getInterpolationRegExp(key), value || '');
  });

  return partial
    .replace(getInterpolationRegExp(), ''); // CYA
}
