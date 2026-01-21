import {test, expect} from '@applitools/eyes-playwright/fixture'

test('Multiple windows in one Eyes session using Fixtures', async ({ page, context, eyes }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Screenshot of Initial page
  await expect(page).toHaveScreenshot('Initial Page', {fullPage: true})


  //Navigate to new tab
  const [newTab] = await Promise.all([page.waitForEvent('popup'), 
  page.click('//a[normalize-space()="Click Here"]')])

  //Screenshot of new tab/pop up
  await expect(newTab).toHaveScreenshot('New Tab Page', {fullPage: true})

  //Screenshot of initial page using page object
  await expect(page).toHaveScreenshot('Initial Page Back Again', {fullPage: true})


});
