import { markdown } from '../lib/markdown.js';

export function markdownShortcodePlugin(eleventyConfig) {
  eleventyConfig.addPairedShortcode('markdown', markdown);
}
