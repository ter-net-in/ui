import { expect, test } from 'playwright/test';

test('authentication example validates fields and never sends credentials', async ({ page }) => {
  const submissions: string[] = [];
  page.on('request', (request) => {
    if (request.method() !== 'GET') submissions.push(request.url());
  });
  await page.goto('/examples/auth');
  await page.getByLabel('Email', { exact: true }).fill('example@example.com');
  await page.getByLabel('Password', { exact: true }).fill('example-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('does not send credentials');
  expect(submissions).toEqual([]);
  expect(
    await page.getByLabel('Email', { exact: true }).evaluate((element) => getComputedStyle(element).borderRadius)
  ).toBe('6px');
});

test('admin example supports filtering with real empty feedback', async ({ page }) => {
  await page.goto('/examples/admin');
  await page.getByPlaceholder('Find a service').fill('webhook');
  await expect(page.getByRole('cell', { name: 'webhook hooks.example.com' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'docs docs.example.com' })).toHaveCount(0);
  await page.getByPlaceholder('Find a service').fill('does-not-exist');
  await expect(page.getByText('No services match your search.')).toBeVisible();
});

test('mobile list/detail navigation restores focus and drawer Escape restores the trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/examples/workspace');
  const message = page.getByRole('button', { name: /Release notes Your workspace is ready/ });
  await message.click();
  await expect(page.getByRole('region', { name: 'Message list' })).toBeHidden();
  await expect(page.getByRole('region', { name: 'Message detail' })).toBeFocused();
  await page.getByRole('button', { name: 'Back to messages' }).click();
  await expect(message).toBeFocused();
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  await expect(page.getByRole('dialog', { name: 'Folders' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('settings example keeps form and switch behavior local', async ({ page }) => {
  await page.goto('/examples/settings');
  const control = page.getByRole('switch', { name: 'Notify about service status changes' });
  await expect(control).toBeChecked();
  await control.click();
  await expect(control).not.toBeChecked();
  await page.getByRole('button', { name: 'Save changes' }).click();
  await expect(page.getByRole('status')).toHaveText('Saved in this example only.');
});

for (const theme of ['light', 'dark'] as const) {
  for (const width of [390, 1440]) {
    test(`examples fit ${width}px in ${theme} theme`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const name of ['auth', 'admin', 'settings', 'workspace']) {
        await page.goto(`/examples/${name}`);
        await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /dark/ : /^(?!.*dark)/);
        if (await page.locator('input:not([type="checkbox"])').count()) {
          const background = await page
            .locator('body')
            .evaluate((element) => getComputedStyle(element).backgroundColor);
          await expect(page.locator('input:not([type="checkbox"])').first()).toHaveCSS('background-color', background);
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await page.screenshot({
          path: `/tmp/ternet-ui-rollout-20261029/${name}-${theme}-${width}.png`,
          fullPage: true
        });
      }
      expect(errors).toEqual([]);
      await context.close();
    });
  }
}

test('input groups preserve only their outside corners for one, two, or three children', async ({ page }) => {
  await page.goto('/examples/settings');
  const group = page.locator('.ui-input-group');
  const corners = () =>
    group.evaluate((element) =>
      Array.from(element.children, (child) => {
        const style = getComputedStyle(child);
        return [style.borderTopLeftRadius, style.borderTopRightRadius];
      })
    );
  expect(await corners()).toEqual([
    ['6px', '0px'],
    ['0px', '6px']
  ]);
  await group.evaluate((element) =>
    element.insertBefore(element.firstElementChild!.cloneNode(), element.lastElementChild)
  );
  expect(await corners()).toEqual([
    ['6px', '0px'],
    ['0px', '0px'],
    ['0px', '6px']
  ]);
  await group.evaluate((element) => {
    while (element.children.length > 1) element.lastElementChild!.remove();
  });
  expect(await corners()).toEqual([['6px', '6px']]);
});
