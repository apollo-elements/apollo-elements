export async function playgroundElementsEleventyPlugin(eleventyConfig, { importMap }) {
  eleventyConfig.addPassthroughCopy('_merged_assets/_static/playground-elements/*');
  eleventyConfig.addPassthroughCopy(`_merged_assets/_static/playground-elements/playground-service-worker-proxy.html`);
}
