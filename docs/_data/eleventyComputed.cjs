// @ts-check
const { generateEleventyComputed, getComputedConfig } = require('@rocket/cli');

const fs = require('fs');
const getPuppeteerBrowser = require('../_plugins/getPuppeteerBrowser.cjs');
const nunjucks = require('nunjucks');
const Textbox = require('@borgar/textbox');
const { join } = require('path');
const { capital } = require('case');
const { createHash } = require('crypto');
const { blue, bold, green, yellow } = require('chalk');

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
// const and = (p, q) => x => p(x) && q(x);
// const or = (p, q) => x => p(x) || q(x);
// const not = p => x => !p(x);
const words = s => s.split(' ');
const head = ([x]) => x;
// const getLength = x => x.length;
// const isLong = x => x >= 20;
// const isShort = x => x < 7;
const getFirstWord = compose(head, words);
// const getFirstWordLength = compose(getLength, getFirstWord);
// const isLongFirstWord = compose(x => x > 15, getFirstWordLength);
// const isShortFirstWord = compose(isShort, getFirstWordLength);
// const isLongTitle = isLong;
// const isShortTitle = and(isShort, not(isLongFirstWord));
const backToAngleBrackets = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const CACHE = new Map();

const BUFFERS = new Map();

/** @type {import('puppeteer').Page} */
let page;

/**
 * Hash a file
 * @param  {string} path
 * @param  {string} [hashName='md5']
 * @return {Promise<string>}
 */
function checksumFile(path, hashName = 'md5') {
  return new Promise((resolve, reject) => {
    const hash = createHash(hashName);
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

/**
 * @param {fs.PathLike | fs.promises.FileHandle} filePath
 */
async function readCached(filePath) {
  if (!BUFFERS.has(filePath))
    BUFFERS.set(filePath, await fs.promises.readFile(filePath));
  return BUFFERS.get(filePath);
}

/**
 * @param {string} template
 * @param {Record<`${'sub'|''}${'title'|'category'}`, string>} opts
 */
async function stamp(template, { title, subtitle, category, subcategory }) {
  const { s: createElement } = await import('hastscript');
  const { toHtml } = await import('hast-util-to-html');

  const width = 592;

  let titleFontSize = title.length > 45 ? 64 : 72;
  let subtitleFontSize = 47;

  const titleFont = () => `400 ${titleFontSize}px/${titleFontSize*0.88}px Recursive, monospace`;
  const subtiFont = () => `300 ${subtitleFontSize}px Recursive, monospace`;

  while (
    (Textbox.measureText(title, titleFont()) > (width * 4)) ||
    (Textbox.measureText(getFirstWord(title), titleFont()) > width)
  )
    titleFontSize = titleFontSize - 2;

  while (subtitle && Textbox.measureText(subtitle, subtiFont) > width)
    subtitleFontSize = subtitleFontSize - 2;

  const titleBox = new Textbox({
    createElement,
    font: titleFont(),
    height: 268,
    valign: 'top',
    width,
  });

  const subtitleBox = new Textbox({
    createElement,
    font: subtiFont(),
    height: 70,
    valign: 'top',
    width,
  });

  const titleSVG = toHtml(titleBox.linebreak(backToAngleBrackets(title)).render(), { space: 'svg' });
  const subtitleSVG = toHtml(subtitleBox.linebreak(backToAngleBrackets(subtitle)).render(), { space: 'svg' });

  const FRONTMATTER_REGEXP = /^---\r?\n(.*)\r?\n---$/m;
  return nunjucks.renderString(template.replace(FRONTMATTER_REGEXP, ''), { category, subcategory, subtitleSVG, titleSVG });
}

/**
* @param {{ inPath: string; outPath: string }} opts
 */
async function screenshot({ inPath, outPath }) {
  const browser = await getPuppeteerBrowser();
  const page = await browser.newPage();

  await page.goto(`file://${inPath}`);

  await page.waitForSelector('svg');

  const svgElement = await page.$('svg');

  await svgElement.screenshot({
    path: outPath,
    omitBackground: true,
  });
}

/**
 * @param {string} sourceUrl
 * @param {string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView> | import("stream").Stream} svgString
 */
async function createPageSocialImage(sourceUrl, svgString, { rocketConfig }) {
  if (!CACHE.get(sourceUrl)) {
    const inputDir = join(__dirname, '..', '/_merged_assets/social/');
    await fs.promises.mkdir(inputDir, { recursive: true });
    const outputDir = join(rocketConfig.outputDevDir, '_merged_assets', 'social');
    await fs.promises.mkdir(outputDir, { recursive: true });

    const inPath = join(inputDir, sourceUrl);
    const outPath = join(outputDir, sourceUrl.replace('.svg', '.png'));

    await fs.promises.writeFile(inPath, svgString, 'utf8');

    await screenshot({ outPath, inPath });

    const hash = await checksumFile(outPath);
    const hashedPath = outPath.replace('.png', `-${hash}.png`).replace(/-+/g, '-');
    const url = hashedPath.replace('_site-dev', '');

    await fs.promises.rename(outPath, hashedPath);

    CACHE.set(sourceUrl, url);
  }

  return CACHE.get(sourceUrl);
}

async function socialMediaImage(data) {
  if (
    process.env.SKIP_SOCIAL === 'true' ||
    data.rocketConfig.createSocialMediaImages === false ||
    !data.title ||
    data.permalink === false ||
    data.page.fileSlug === '404' ||
    Object.keys(data).length === 0
  )
    return;
  else if (data.socialMediaImage)
    return data.socialMediaImage;
  else {
    const category = data.section === 'api' ? 'API' : capital(data.section) ?? '';
    const [title = 'Apollo Elements', sub, subcategory = ''] = data.titleMeta?.parts ?? [];
    const subtitle = data.subtitle ?? !title ? 'GraphQL Web Components' : sub ?? '';

    const consoleTimeLabel = yellow`[social] ` + blue`Generated image for ` + bold(blue(title)) + blue` in`;
    console.time(consoleTimeLabel);

    const tplBuffer = await readCached(join(data.rocketConfig._inputDirCwdRelative, '_assets', 'social-template.njk'));
    const svgString = await stamp(tplBuffer.toString(), { category, subcategory, subtitle, title });
    const sourceUrl = `${title}-${subtitle}-${category}-${subcategory}.svg`.replace(/[\s,:]/g, '-').replace(/-+/g, '-').replace(/-\.svg$/, '.svg').toLowerCase();

    const url = await createPageSocialImage(sourceUrl, svgString, data);

    console.timeEnd(consoleTimeLabel);

    return url;
  }
}

module.exports = {
  ...generateEleventyComputed(),
  socialMediaImage,
};
