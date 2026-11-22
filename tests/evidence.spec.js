// @ts-check
import { test } from '@playwright/test';

test('Evidence capture – Empty cart, cart with products, and successful checkout', async ({ page }) => {
  // 1. Empty Cart Screenshot
  await page.goto('/');
  await page.screenshot({ path: 'evidence/empty-cart.png', fullPage: true });
  await page.screenshot({ path: 'evidence/initial-state.png', fullPage: true });

  // 2. Empty Cart Validation Screenshot
  await page.getByLabel(/Customer Name/).fill('Aswini');
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'evidence/empty-cart-validation.png', fullPage: true });

  // 3. Cart with Products Screenshot
  await page.goto('/');
  await page.getByRole('button', { name: 'Add Wireless Mouse to cart' }).click();
  await page.getByRole('button', { name: 'Increase quantity of Wireless Mouse' }).click();
  await page.getByRole('button', { name: 'Add Mechanical Keyboard to cart' }).click();
  await page.getByLabel(/Customer Name/).fill('Aswini');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'evidence/cart-with-products.png', fullPage: true });
  await page.screenshot({ path: 'evidence/cart-with-items.png', fullPage: true });

  // 4. Successful Checkout Screenshot
  const btn = page.getByRole('button', { name: 'Place Order' });
  await btn.dblclick();
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'evidence/successful-checkout.png', fullPage: true });
  await page.screenshot({ path: 'evidence/double-click-protection.png', fullPage: true });
});
