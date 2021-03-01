/**
 * ## Regexp: match:
 *
 * - `(\s+)?`: any amount of whitespace or none
 * - `(&.*;)`: any html entity e.g. &#25;
 * - `link`: the literal string 'link'
 *
 * In other words, the URL-encoded double-encoded string `<link`
 */
const ENCODED_LINK_TAG_RE = /((\s+)?(&.*;)link)/;

export function fixNoscript(eleventyConfig) {
  eleventyConfig.addTransform('fix-noscript-style', content =>
    content.replace(ENCODED_LINK_TAG_RE, '<link')
  );
}
