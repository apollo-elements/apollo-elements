// @ts-check
const { getComputedConfig, generateEleventyComputed } = require('@rocket/cli');

const path = require('path');
const fs = require('fs');
const image = require('@11ty/eleventy-img');
const nunjucks = require('nunjucks');
const { capital } = require('case');
const Textbox = require('@borgar/textbox');
const puppeteer = require('puppeteer');
const util = require('util');

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

const CACHE = new Map();

async function createPageSocialImage(options) {
  const { s } = await import('hastscript');
  const { toHtml } = await import('hast-util-to-html');

  const {
    category = '',
    subcategory = '',
    subtitle = '',
    title = '',
  } = options

  const sourceUrl = `${title}${subtitle}${category}${subcategory}.svg`

  if (!CACHE.get(sourceUrl)) {

    const consoleTimeLabel = `Generated image for ${title} in`;

    console.time(consoleTimeLabel);

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
    });

    const urlPath = '/_merged_assets/11ty-img/';

    const filetype = 'png';

    const svgSourcePath = path.join(__dirname, '..', urlPath, sourceUrl);
    const svgOutputPath = path.join(__dirname, '..', urlPath, sourceUrl.replace('.svg', '.png').replace(/[\s,:]/g, '-'));

    await fs.promises.mkdir(path.dirname(svgSourcePath), { recursive: true });
    await fs.promises.writeFile(svgSourcePath, svgString, 'utf8');

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--font-render-hinting=none']
      });
      const page = await browser.newPage();
      await page.goto('file://' + svgSourcePath);
      const svgElement = await page.$('svg');
      await svgElement.screenshot({
        path: svgOutputPath,
        omitBackground: true,
      })
    } catch(e) {
      console.error(e)
      throw e;
    }

    const { [filetype]: [{ url }] } = await image(await fs.promises.readFile(svgOutputPath), {
      widths: [1000],
      formats: [filetype],
      outputDir,
      urlPath,
      sourceUrl,
    });

    console.timeEnd(consoleTimeLabel);

    CACHE.set(sourceUrl, url);
  }

  return CACHE.get(sourceUrl);
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
        title: title ?? 'Apollo Elements',
      });
    }
  },
};
