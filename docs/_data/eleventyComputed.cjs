// https://github.com/adamduncan/eleventy-auto-navigation/blob/main/src/_data/eleventyComputed.js
// This is a zany workaround to get out of manually declaring
// `parent` in every page's frontmatter. There will be a nicer
// way of doing this, but for a POC, maybe it's okay.

module.exports = {
  eleventyNavigation(data) {
    const url = data?.page?.url
    if (typeof url === 'string') {
      const urlParts = url.split("/");
      const pathDirs = urlParts?.slice(1, urlParts.length - 1);
      const key = data.key ?? pathDirs?.join("/");
      const parentDirs = urlParts?.slice(1, urlParts.length - 2);
      const parent = data.parent ?? parentDirs?.join("/");
      const { title } = data;
      const { order } = data.eleventyNavigation ?? {}
      return { key, title, parent, order };
    } else {
      return data.eleventyNavigation;
    }
  },
};
