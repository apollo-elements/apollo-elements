import path from 'path';

function getSlidesCollection(collectionApi) {
  return collectionApi.getFilteredByTag('slide').sort((a, b) => {
    return (
        a.template.inputPath < b.template.inputPath ? -1
      : a.template.inputPath > b.template.inputPath ? 1
      : 0
    );
  });
}

export function slideDecksPlugin(eleventyConfig, options) {
  eleventyConfig.addPassthroughCopy('_merged_assets/_static/slide-decks/**/*');
  eleventyConfig.addFilter('dirname', pathname => pathname && path.dirname(pathname));
  eleventyConfig.addFilter('joinPath', (pathname, ...to) => path.join(pathname, ...to));
  eleventyConfig.addCollection('slides', getSlidesCollection);
}
