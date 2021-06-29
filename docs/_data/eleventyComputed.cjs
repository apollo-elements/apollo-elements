// @ts-check
const { getComputedConfig, generateEleventyComputed } = require('@rocket/cli');

const path = require('path');
const fs = require('fs');
const image = require('@11ty/eleventy-img');
const nunjucks = require('nunjucks');
const { capital } = require('case');
const Textbox = require('@borgar/textbox');
const woff2base64 = require('woff2base64');

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
const and = (p, q) => x => p(x) && q(x);
const or = (p, q) => x => p(x) || q(x);
const not = p => x => !p(x);
const words = s => s.split(' ');
const head = ([x]) => x;
const getLength = x => x.length;
const isLong = x => x >= 20;
const isShort = x => x < 7;
const getFirstWord = compose(head, words);
const getFirstWordLength = compose(getLength, getFirstWord);
const isLongFirstWord = compose(x => x > 15, getFirstWordLength);
const isShortFirstWord = compose(isShort, getFirstWordLength);
const isLongTitle = isLong;
const isShortTitle = and(isShort, not(isLongFirstWord));

function getFont() {
  const fontPath = path.resolve(__dirname, '../_assets/fonts/Recursive_VF_1.077.woff2');
  const woff2Buffer = fs.readFileSync(fontPath);
  return woff2base64({
    'Recursive_VF_1.077.woff2': woff2Buffer,
  }, {
    fontFamily: 'Recursive',
  });
}

const cssFonts = getFont();

async function createPageSocialImage(options) {
  const { s } = await import('hastscript');
  const { toHtml } = await import('hast-util-to-html');

  const {
    category = '',
    subcategory = '',
    subtitle = '',
    title = '',
    fontFace = '',
  } = options

  console.time(`Generate image ${title}`);

  const rocketConfig = getComputedConfig();

  const outputDir = path.join(rocketConfig.outputDevDir, '_merged_assets', '11ty-img');

  const templatePath = path.join(rocketConfig._inputDirCwdRelative, '_assets/social-template.njk');

  const templateBuffer = await fs.promises.readFile(templatePath);

  let template = templateBuffer.toString();

  const width = 592;

  const boxOpts = {
    createElement: s,
    valign: 'center',
    width,
  };

  let titleFontSize = 72;

  let subtitleFontSize = 47;

  const titleFont = () =>
    `400 ${titleFontSize}px/${titleFontSize*0.88}px Recursive, monospace`;

  const subtitleFont = () =>
    `300 ${subtitleFontSize}px Recursive, monospace`;

  if (title.length > 45)
    titleFontSize = 64;

  function widthOfString(string, getter = titleFont) {
    return Textbox.measureText(string, getter());
  }

  while (
    (widthOfString(title) > (width * 4)) ||
    (widthOfString(getFirstWord(title)) > width)
  )
    titleFontSize = titleFontSize - 2;

  while (subtitle && widthOfString(subtitle, subtitleFont) > width)
    subtitleFontSize = subtitleFontSize - 2;

  const titleBox = new Textbox({
    ...boxOpts,
    font: titleFont(),
    height: 268,
  });

  const subtitleBox = new Textbox({
    ...boxOpts,
    font: subtitleFont(),
    height: 100,
  });

  const backToAngleBrackets = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const titleSVG = toHtml(titleBox.linebreak(backToAngleBrackets(title)).render(), { space: 'svg' });
  const subtitleSVG = toHtml(subtitleBox.linebreak(backToAngleBrackets(subtitle)).render(), { space: 'svg' });

  const svgString = nunjucks.renderString(template, {
    category,
    subcategory,
    titleSVG,
    subtitleSVG,
    fontFace,
  });

  const filetype = 'png';

  const { [filetype]: [{ url }] } = await image(Buffer.from(svgString), {
    widths: [1000],
    formats: [filetype],
    outputDir,
    urlPath: '/_merged_assets/11ty-img/',
    sourceUrl: `${title}${subtitle}${category}${subcategory}`, // This is only used to generate the output filename hash
  });
  console.timeEnd(`Generate image ${title}`);

  return url;
}

const computed = generateEleventyComputed();

module.exports = {
  ...computed,
  async socialMediaImage(data) {
    if (
      !data.title ||
      data.permalink === false ||
      process.env.SKIP_SOCIAL === 'true' ||
      data.rocketConfig.createSocialMediaImages === false
    )
      return;
    else if (data.socialMediaImage)
      return data.socialMediaImage;
    else {
      const { section, titleMeta } = data;
      const category = section === 'api' ? 'API' : capital(section);
      const [title, sub, subcategory] = titleMeta?.parts ?? [];
      const subtitle = data.subtitle ?? !title ? 'GraphQL Web Components' : sub;
      return await createPageSocialImage({
        category,
        subcategory,
        subtitle,
        fontFace: cssFonts.woff2,
        title: title ?? 'Apollo Elements',
      });
    }
  },
};
