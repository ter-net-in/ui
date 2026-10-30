import { expect, test } from 'playwright/test';

test.use({ colorScheme: 'light' });

test('theme actions use their visible names and persist the selected theme', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('button', { name: 'Light theme', exact: true })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Light theme', exact: true }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Dark theme', exact: true })).toBeVisible();
});
