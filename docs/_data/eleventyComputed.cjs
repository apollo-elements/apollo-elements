const { getComputedConfig, generateEleventyComputed } = require('@rocket/cli');

const path = require('path');
const fs = require('fs');
const image = require('@11ty/eleventy-img');
const nunjucks = require('nunjucks');
const { capital } = require('case');
const Textbox = require('@borgar/textbox');
const createElement = require('hastscript/svg');
const toHTML = require('hast-util-to-html');

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

async function createPageSocialImage(options) {
  const {
    category = '',
    subcategory = '',
    subtitle = '',
    title = '',
  } = options

  const rocketConfig = getComputedConfig();

  const outputDir = path.join(rocketConfig.outputDevDir, '_merged_assets', '11ty-img');

  const templatePath = path.join(rocketConfig._inputDirCwdRelative, '_assets/social-template.njk');

  const templateBuffer = await fs.promises.readFile(templatePath);

  let template = templateBuffer.toString();

  const width = 592;

  const boxOpts = {
    createElement,
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

  const titleSVG = toHTML(titleBox.linebreak(title).render(), { space: 'svg' });
  const subtitleSVG = toHTML(subtitleBox.linebreak(subtitle).render(), { space: 'svg' });

  const fontBase64 = fs.readFileSync(path.resolve(__dirname, '../_assets/fonts/Recursive_VF_1.072.woff2'), {encoding: 'base64'});

  const svgString = nunjucks.renderString(template, {
    category,
    subcategory,
    titleSVG,
    subtitleSVG,
    fontFace: `@font-face { font-family: "Recursive"; src: url("data:application/font-woff2;charset=utf-8;base64,${fontBase64}"); }`,
  });

  const filetype = 'png';

  console.time(`generate image ${title}`);
  const { [filetype]: [{ url }] } = await image(Buffer.from(svgString), {
    widths: [1000],
    formats: [filetype],
    outputDir,
    urlPath: '/_merged_assets/11ty-img/',
    sourceUrl: `${title}${subtitle}${category}${subcategory}`, // This is only used to generate the output filename hash
  });
  console.timeEnd(`generate image ${title}`);

  return url;
}

const computed = generateEleventyComputed();

module.exports = {
  ...computed,
  async socialMediaImage(data) {
    if (data.rocketConfig.createSocialMediaImages === false)
      return;
    else if (data.socialMediaImage)
      return data.socialMediaImage;
    else if (!data.title)
      return;
    else {
      const { section, titleMeta } = data;
      const category = section === 'api' ? 'API' : capital(section);
      const [title, sub, subcategory] = titleMeta?.parts ?? [];
      const subtitle = data.subtitle ?? !title ? 'GraphQL Web Components' : sub;
      return await createPageSocialImage({
        category,
        subcategory,
        subtitle,
        title: title ?? 'Apollo Elements',
      });
    }
  },
};
