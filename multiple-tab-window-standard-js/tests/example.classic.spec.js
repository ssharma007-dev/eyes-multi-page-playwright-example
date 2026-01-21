// tests/multiple-windows.spec.js
// @ts-check
const { test } = require('@playwright/test');
const { Eyes, ClassicRunner, Target, Configuration, BatchInfo } = require('@applitools/eyes-playwright');
const { saveScreenshot } = require('../utils/saveScreenshot');

test('Playwright Multi-page Classic test', async ({ page, context }) => {
  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);

  const batch = new BatchInfo('Playwright Multi-Window Classic');
  const config = new Configuration();
  config.setBatch(batch);

  eyes.setConfiguration(config);
  eyes.open("Playwright Multi-Window Demo", "Standard");

  // Initial Page
  await page.goto('https://the-internet.herokuapp.com/windows');
  eyes.check({name: 'Initial Page', page: page, fully: true});
  
  // New tab/pop up object
  const [newTab] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('//a[normalize-space()="Click Here"]'),
  ]);

  //Screenshot of new tab/pop up
  eyes.check({name: 'New Tab/Pop Up', page: newTab, fully: true});


  //Screenshot of Initial Page
  eyes.check({name: 'Initial Page Again', page: page, fully: true});
  
  await eyes.close();

  const allTestResults = await runner.getAllTestResults(false);
  console.log(allTestResults);
});
