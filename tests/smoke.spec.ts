import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByText('Connect with Spotify').click()
  await page.getByTestId('login-username').fill('YOUR USERNAME')
  await page.getByTestId('login-password').fill('YOUR PASSWORD')
  await page.getByTestId('login-button').click()
  await page.getByPlaceholder('Place your URL').fill('https://www.youtube.com/playlist?list=PLdb7flCF7TesJ53sydb-5cyLzqE3-rLOs')
  await page.getByRole('button').nth(2).click()
  await page.waitForTimeout(8000)
  await expect(page.getByRole('heading', { name: 'BUTTERFLY EFFECT3:' })).toContainText('BUTTERFLY EFFECT3:10')


});

