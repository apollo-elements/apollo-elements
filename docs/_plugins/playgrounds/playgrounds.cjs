const path = require('node:path');
const fs = require('node:fs');

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

module.exports = function(eleventyConfig, { playgroundsDir = './docs/_playgrounds' } = {}) {
  eleventyConfig.ignores.add(playgroundsDir);

  eleventyConfig.addGlobalData('playgroundsDir', playgroundsDir);

  eleventyConfig.addJavaScriptFunction('readPlaygroundFile', (filename, playgroundName) => {
    const filePath = path.join(playgroundsDir, playgroundName, filename);
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      console.error('readPlaygroundFile', filePath, e);
      throw e;
    }
  });

  eleventyConfig.addJavaScriptFunction('getPlaygroundFiles', playgroundName => {
    const pgDir = path.join(playgroundsDir, playgroundName);
    try {
      const items = fs.readdirSync(pgDir);
      return items.flatMap(x => {
        const childPath = path.join(pgDir, x);
        if (fs.statSync(childPath).isDirectory()) {
          return fs.readdirSync(childPath).map(y => path.join(x, y));
        } else {
          return [x];
        }
      })
    } catch (e) {
      console.error('getPlaygroundFiles', pgDir, e);
      throw e;
    }
  });
  // eleventyConfig.addExtension('html', { compile, compileOptions, getData });
  // eleventyConfig.addExtension('playground.html', { compile, compileOptions, getData });
  // eleventyConfig.addExtension('playground.css', { compile, compileOptions, getData });
  // eleventyConfig.addExtension('playground.graphql', { compile, compileOptions, getData });
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
