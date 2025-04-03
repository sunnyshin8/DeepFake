// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://shaniaegis.live/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ShaniAegis/);

  await page.close();
});

test('is hemal team member', async ({ page }) => {
  await page.goto('https://shaniaegis.live/about/');

  // check if the first heading contains the text "Hemal Shingloo"
  await page.getByRole('heading').first().toHaveText('Hemal Shingloo');
});
