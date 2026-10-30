import { expect, test } from 'playwright/test';

test('component navigation stays flush with the viewport on wide displays', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/components');
  const sidebar = page.getByRole('navigation', { name: 'Components', exact: true });
  expect((await sidebar.boundingBox())?.x).toBe(0);
  await page.getByRole('searchbox', { name: 'Search components' }).fill('rich text');
  await page.getByRole('button', { name: 'Rich Text Editor', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Rich Text Editor', exact: true })).toBeVisible();
});

test('editor formats content, exposes active controls, and edits links without submitting the form', async ({
  page
}) => {
  await page.goto('/examples/editor');
  const editor = page.getByRole('textbox', { name: 'Message', exact: true });
  await editor.fill('Hello world');
  await editor.press('ControlOrMeta+a');
  await page.getByRole('button', { name: 'Bold', exact: true }).click();
  await expect(editor.locator('strong')).toHaveText('Hello world');
  await expect(page.getByRole('button', { name: 'Bold', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Insert link', exact: true }).click();
  await page.getByRole('textbox', { name: 'Link URL' }).fill('https://example.com');
  await page.getByRole('button', { name: 'Apply link', exact: true }).click();
  await expect(editor.locator('a')).toHaveAttribute('href', 'https://example.com');
  await expect(page.getByRole('status')).toBeHidden();
  await page.getByRole('button', { name: 'Preview message' }).click();
  await expect(page.getByRole('status')).toContainText('Hello world');
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('link cancellation by keyboard never applies a link', async ({ page }) => {
  await page.goto('/examples/editor');
  const editor = page.getByRole('textbox', { name: 'Message', exact: true });
  await editor.fill('Keep this text');
  await editor.press('ControlOrMeta+a');
  await page.getByRole('button', { name: 'Insert link', exact: true }).click();
  await page.getByRole('textbox', { name: 'Link URL' }).fill('https://example.com');
  await page.getByRole('button', { name: 'Cancel', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('textbox', { name: 'Link URL' })).toBeHidden();
  await expect(editor.locator('a')).toHaveCount(0);
  await expect(editor).toBeFocused();
});

test('primary action remains colored when an existing installation has no action tokens', async ({ page }) => {
  await page.goto('/icons');
  const button = page.getByRole('button', { name: 'Add domain', exact: true });
  await button.evaluate((node) => {
    for (const name of ['--color-action', '--color-action-end', '--color-action-border', '--color-action-foreground'])
      (node as HTMLElement).style.setProperty(name, 'initial');
  });
  await expect(button).toHaveCSS('color', 'rgb(255, 255, 255)');
  await expect(button).toHaveCSS('background-image', 'linear-gradient(rgb(33, 108, 225), rgb(8, 84, 204))');
});

test('classic list and mark controls work with keyboard navigation and undo', async ({ page }) => {
  await page.goto('/examples/editor');
  const editor = page.getByRole('textbox', { name: 'Message', exact: true });
  await editor.fill('An item');
  await editor.press('ControlOrMeta+a');
  await page.getByRole('button', { name: 'Italic', exact: true }).click();
  await expect(editor.locator('em')).toHaveText('An item');
  await page.getByRole('button', { name: 'Underline', exact: true }).click();
  await expect(editor.locator('u')).toHaveText('An item');
  await page.getByRole('button', { name: 'Strikethrough', exact: true }).click();
  await expect(editor.locator('s')).toHaveText('An item');
  await page.getByRole('button', { name: 'Bullet list', exact: true }).click();
  await expect(editor.locator('ul li')).toHaveText('An item');
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(editor.locator('ul')).toHaveCount(0);
  await page.getByRole('button', { name: 'Redo', exact: true }).click();
  await expect(editor.locator('ul li')).toHaveText('An item');
  await page.getByRole('button', { name: 'Clear formatting', exact: true }).click();
  await expect(editor.locator('em,u,s,ul')).toHaveCount(0);
  await page.getByRole('button', { name: 'Bold', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: 'Italic', exact: true })).toBeFocused();
});
