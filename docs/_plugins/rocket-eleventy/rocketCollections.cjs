const path = require('path');
const fs = require('fs');
const slash = require('slash');
const { readdirSync } = require('fs');

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

const rocketCollections = {
  configFunction: (eleventyConfig, { _inputDirCwdRelative }) => {
    const sectionNames = getDirectories(_inputDirCwdRelative);
    const headerCollectionPaths = [];
    for (const section of sectionNames) {
      const fullPath = path.join(_inputDirCwdRelative, section);
      const indexSection = path.join(fullPath, 'index.md');
      if (fs.existsSync(indexSection)) {
        // add to header
        headerCollectionPaths.push(indexSection);
        // add to specific collection
        eleventyConfig.addCollection(section, collection => {
          let docs = [
            ...collection.getFilteredByGlob(`${_inputDirCwdRelative}/${section}/**/*.md`),
          ];
          docs = docs.filter(page => page.inputPath !== `./${slash(indexSection)}`);

          return docs;
        });
      }
    }

    if (headerCollectionPaths.length > 0) {
      eleventyConfig.addCollection('header', collection => {
        let headers = [];
        for (const headerCollectionPath of headerCollectionPaths) {
          headers = [...headers, ...collection.getFilteredByGlob(headerCollectionPath)];
        }
        headers = headers.sort((a, b) => {
          const aOrder =
            (a.data && a.data.eleventyNavigation && a.data.eleventyNavigation.order) || 0;
          const bOrder =
            (b.data && b.data.eleventyNavigation && b.data.eleventyNavigation.order) || 0;
          return aOrder - bOrder;
        });

        return headers;
      });
    }
  },
};

module.exports = rocketCollections;
