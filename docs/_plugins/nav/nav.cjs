const RocketNav = require('./eleventy-rocket-nav.cjs');
const addPageAnchors = require('./addPageAnchors.cjs');

// export the configuration function for plugin
module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter('rocketNav', RocketNav.findNavigationEntries);
  eleventyConfig.addNunjucksFilter('rocketPageAnchors', RocketNav.rocketPageAnchors);
  eleventyConfig.addNunjucksFilter('rocketNavBreadcrumb', RocketNav.findBreadcrumbEntries);
  eleventyConfig.addNunjucksFilter('rocketNavToHtml', function (pages, options) {
    return RocketNav.toHtml.call(eleventyConfig, pages, options);
  });
  eleventyConfig.addTransform('rocket-nav-add-page-anchors', async function (content) {
    const newContent = await addPageAnchors(content);
    return newContent;
  });
};

module.exports.navigation = {
  find: RocketNav.findNavigationEntries,
  findBreadcrumbs: RocketNav.findBreadcrumbEntries,
};
