const rocketCopy = {
  configFunction: (eleventyConfig, { _inputDirCwdRelative }) => {
    eleventyConfig.addPassthroughCopy(`${_inputDirCwdRelative}/!(*.md|*.html)*`);
    eleventyConfig.addPassthroughCopy(
      `${_inputDirCwdRelative}/!(_includes|_data|_assets)*/**/!(*.md|*.html)*`,
    );
    eleventyConfig.addPassthroughCopy(`${_inputDirCwdRelative}/assets/_static/**/*`);
  },
};

module.exports = rocketCopy;
