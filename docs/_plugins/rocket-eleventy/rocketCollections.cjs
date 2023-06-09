const path = require('path');
const fs = require('fs');
const slash = require('slash');
const { readdirSync } = require('fs');

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

const inputdir = path.join(process.cwd(), 'docs');

const rocketCollections = {
  configFunction: (eleventyConfig) => {
    const sectionNames = getDirectories(inputdir);
    const headerCollectionPaths = [];
    for (const section of sectionNames) {
      const fullPath = path.join(inputdir, section);
      const indexSection = path.join(fullPath, 'index.webc.md');
      if (fs.existsSync(indexSection)) {
        // add to header
        headerCollectionPaths.push(indexSection);
        // add to specific collection
        eleventyConfig.addCollection(section, api => {
          const c = api.getFilteredByGlob(`docs/${section}/**/*.webc.md`)
            .filter(page => page.inputPath !== `./${slash(indexSection)}`)
            .map(x => (x.page.section = section, x));
          return c;
        });
      }
    }

    if (headerCollectionPaths.length > 0) {
      eleventyConfig.addCollection('header', api => {
        return headerCollectionPaths.flatMap(x => api.getFilteredByGlob(x)).sort((a, b) =>
          a?.data?.eleventyNavigation?.order ?? 0 -
          b?.data?.eleventyNavigation?.order ?? 0);
      });
    }
  },
};

module.exports = rocketCollections;
