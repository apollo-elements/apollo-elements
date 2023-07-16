const path = require('path');
const fs = require('fs');

function inlineFilePath(filePath) {
  let data = fs.readFileSync(filePath, function (err, contents) {
    if (err) {
      throw new Error(err);
    }
    return contents;
  });
  return data.toString('utf8');
}

const rocketFilters = {
  configFunction: (eleventyConfig, { _inputDirCwdRelative }) => {
    eleventyConfig.addFilter('asset', function (inPath) {
      return inPath.replace('_assets/', 'assets/');
    });

    eleventyConfig.addFilter('toAbsPath', function (inPath) {
      return path.join(_inputDirCwdRelative, inPath);
    });

    eleventyConfig.addFilter('inlineFilePath', inlineFilePath);
  },
};

module.exports = rocketFilters;
