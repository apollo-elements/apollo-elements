let browser;

async function makeBrowser() {
  const puppeteer = await import('puppeteer');
  return puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--font-render-hinting=none']
  });
}

/** @return {Promise<import('puppeteer').Browser>} */
module.exports = async function getPuppeteerBrowser() {
  browser ??= await makeBrowser();
  return browser;
}
