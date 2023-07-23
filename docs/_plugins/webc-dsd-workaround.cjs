/** @param {import('@11ty/eleventy/src/UserConfig')} */
module.exports = function(eleventyConfig, options) {
  const TAG_NAME = options?.tagName ?? 'webc-dsd-slot-workaround';
  eleventyConfig.addTransform(TAG_NAME, async function(content) {
    const { parse, serialize } = await import('parse5');
    const U = await import('@parse5/tools');
    const isWorkaround = node => U.isElementNode(node) && node.tagName === TAG_NAME;
    const document = parse(content)
    for (const template of U.queryAll(document, U.isTemplateNode)) {
      const { content } = template;
      for (const node of U.queryAll(content, isWorkaround)) {
        node.tagName = 'slot';
      }
    }
    return serialize(document);
  })
}
