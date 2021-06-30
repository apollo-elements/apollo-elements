export async function codeTabsEleventyPlugin(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('_merged_assets/_static/code-tabs/**/*');
}
