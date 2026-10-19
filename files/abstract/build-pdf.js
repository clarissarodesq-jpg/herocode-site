// Builds files/hero-code-educator-abstract.pdf from files/abstract/index.html.
//
// One-time setup:   npm install --no-save playwright-core
// Run from the repo root:   node files/abstract/build-pdf.js
//
// It uses an installed Chrome or Chromium. Set CHROME_PATH if it can't find one.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright-core');

const candidates = [
  process.env.CHROME_PATH,
  '/opt/pw-browsers/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

(async () => {
  const executablePath = candidates.find((p) => fs.existsSync(p));
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'index.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = path.join(__dirname, '..', 'hero-code-educator-abstract.pdf');
  await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('Wrote ' + out);
})();
