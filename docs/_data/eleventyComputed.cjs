// @ts-check
const { getComputedConfig, generateEleventyComputed } = require('@rocket/cli');

const path = require('path');
const fs = require('fs');
const nunjucks = require('nunjucks');
const { capital } = require('case');
const Textbox = require('@borgar/textbox');
const puppeteer = require('puppeteer');
const crypto = require('crypto');
const { blue, bold, green, yellow } = require('chalk');

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

/** @type {import('puppeteer').Browser} */
let browser;
/** @type {import('puppeteer').Page} */
let puppeteerPage;
let stillGoing = false;

async function getPage() {
  if (!puppeteerPage) {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--font-render-hinting=none']
    });
    puppeteerPage = await browser.newPage();
  }
  return puppeteerPage;
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear'
 * that is a function which will clear the timer to prevent previously scheduled executions.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  return debounced;
};

const clearBrowser = debounce(async function clearBrowser() {
  await browser.close();
  browser = undefined;
  puppeteerPage = undefined;
}, 2000, false);

function checksumFile(path, hashName = 'md5') {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(hashName);
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

const BUFFERS = new Map();

async function getTemplate(templatePath) {
  if (!BUFFERS.has(templatePath))
    BUFFERS.set(templatePath, await fs.promises.readFile(templatePath));
  return BUFFERS.get(templatePath);
}

async function createPageSocialImage(options) {
  const { s } = await import('hastscript');
  const { toHtml } = await import('hast-util-to-html');

  const {
    category = '',
    subcategory = '',
    subtitle = '',
    title = 'Apollo Elements',
  } = options

  const sourceUrl = `${title}-${subtitle}-${category}-${subcategory}.svg`.replace(/[\s,:]/g, '-').replace(/-+/g, '-').toLowerCase();

  if (!CACHE.get(sourceUrl)) {

    const consoleTimeLabel = yellow`[social] ` + blue`Generated image for ` + bold(blue(title)) + blue` in`;

    console.time(consoleTimeLabel);

    const rocketConfig = getComputedConfig();

    const outputDir = path.join(rocketConfig.outputDevDir, '_merged_assets', 'social');
    const urlPath = '/_merged_assets/social/';
    const svgSourcePath = path.join(__dirname, '..', urlPath, sourceUrl);
    const pngFilePath = path.join(outputDir, sourceUrl.replace('.svg', '.png'));

    const templatePath = path.join(rocketConfig._inputDirCwdRelative, '_assets', 'social-template.njk');
    const templateBuffer = await getTemplate(templatePath);
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

    await fs.promises.mkdir(path.dirname(svgSourcePath), { recursive: true });
    await fs.promises.mkdir(outputDir, { recursive: true });
    await fs.promises.writeFile(svgSourcePath, svgString, 'utf8');

    try {
      const page = await getPage();
      await page.goto('file://' + svgSourcePath);
      const svgElement = await page.$('svg');
      await svgElement.screenshot({
        path: pngFilePath,
        omitBackground: true,
      })
    } catch(e) {
      console.error(e)
      throw e;
    }

    const hash = await checksumFile(pngFilePath);
    const hashedPath = pngFilePath.replace('.png', `-${hash}.png`).replace(/-+/g, '-');
    const url = hashedPath.replace('_site-dev', '');
    await fs.promises.rename(pngFilePath, hashedPath);

    console.timeEnd(consoleTimeLabel);
    console.log('         ' + blue('URL is'), green(url));

    CACHE.set(sourceUrl, url);
  }

  await clearBrowser();
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
        title,
      });
    }
  },
};
