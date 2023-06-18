const path = require('node:path');

function permalink(contents, path) {
  return () => path.includes('/_playgrounds/') ? false : undefined;
}

async function getData(inputPath) {
  const [, _playgroundName] = inputPath.match(/_playgrounds\/(.*)\//) ?? [];
  const [playgroundName] = _playgroundName?.split('/') ?? [];
  return { playgroundName, tags: playgroundName && ['playground'] };
}

function compile(content, path) {
  return function (data) {
    if (data.tags.includes('playground'))
      return content;
    else
      return this.defaultRenderer(data);
  }
}

const compileOptions = { permalink };

module.exports = function(eleventyConfig) {
  eleventyConfig.addExtension('html', { compile, compileOptions, getData });
  eleventyConfig.addExtension('playground.html', { compile, compileOptions, getData });
  eleventyConfig.addExtension('playground.css', { compile, compileOptions, getData });
  eleventyConfig.addExtension('playground.graphql', { compile, compileOptions, getData });
  // eleventyConfig.addTransform('playground-html', function(content) {
  //   if (this.page.inputPath.endsWith?.('webc') && this.page.outputPath && this.page.outputPath.endsWith('html')) {
  //     const $ = require('cheerio').load(content)
  //     $('script[type=sample/html], code-tab').each(function() {
  //       const s = $(this);
  //       const text = s.text();
  //       s.text(text
  //         .replaceAll('&amp;lt;', '<')
  //         .replaceAll('&lt;', '<')
  //         .replaceAll('&gt;', '>')
  //         .replaceAll('</script>', '&lt;/script>')
  //       );
  //     })
  //     return $.html();
  //   }
  //   return content
  // });
}
