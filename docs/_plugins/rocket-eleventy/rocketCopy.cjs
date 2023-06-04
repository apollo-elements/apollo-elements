const rocketCopy = {
  configFunction: (eleventyConfig, { _inputDirCwdRelative }) => {
    eleventyConfig.addPassthroughCopy(`${_inputDirCwdRelative}/!(*.md|*.html)*`);
    eleventyConfig.addPassthroughCopy(
      `${_inputDirCwdRelative}/!(_includes|_data|_assets|_merged_data|_merged_includes)*/**/!(*.md|*.html)*`,
    );
    eleventyConfig.addPassthroughCopy(`${_inputDirCwdRelative}/_merged_assets/_static/**/*`);
  },
};

module.exports = rocketCopy;
