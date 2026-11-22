// @ts-check
import { test, expect } from '@playwright/test';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Add a product to the cart by its "Add to Cart" button aria-label. */
async function addToCart(page, productName) {
  await page.getByRole('button', { name: `Add ${productName} to cart` }).click();
}

/** Increase the quantity of a cart item. */
async function increaseQty(page, productName) {
  await page.getByRole('button', { name: `Increase quantity of ${productName}` }).click();
}

/** Decrease the quantity of a cart item. */
async function decreaseQty(page, productName) {
  await page.getByRole('button', { name: `Decrease quantity of ${productName}` }).click();
}

/** Remove an item from the cart. */
async function removeFromCart(page, productName) {
  await page.getByRole('button', { name: `Remove ${productName} from cart` }).click();
}

// ─── TC01: Successful Checkout ─────────────────────────────────────────────────
test('TC01 – Successful checkout', async ({ page }) => {
  await page.goto('/');

  // 1. Add Wireless Mouse to cart
  await addToCart(page, 'Wireless Mouse');

  // 2. Verify item appears in cart with unit price and line total
  const cartSection = page.getByRole('region', { name: 'Shopping Cart' });
  await expect(cartSection.getByText('Wireless Mouse')).toBeVisible();
  await expect(cartSection.getByText('Price: ₹499')).toBeVisible();
  await expect(cartSection.getByText('Subtotal: ₹499')).toBeVisible();

  // 3. Enter customer name "Aswini"
  await page.getByLabel(/Customer Name/).fill('Aswini');

  // 4. Click Place Order
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 5. Verify success confirmation is visible
  await expect(page.getByText('Order Placed Successfully!')).toBeVisible();

  // 6. Verify unique order reference is visible (ORD-XXXXXX format)
  const orderRef = page.getByText(/ORD-[A-Z0-9]{6}/);
  await expect(orderRef).toBeVisible();

  // 7. Verify customer's name is displayed
  await expect(page.getByText(/Customer:/)).toBeVisible();
  await expect(page.getByText('Aswini')).toBeVisible();

  // 8. Verify the total is correct (₹499)
  const confirmationSection = page.getByRole('region', { name: 'Order Confirmation' });
  await expect(confirmationSection.locator('.conf-total-amount')).toHaveText('₹499');

  // 9. Verify Place Order button cannot create another order (button removed upon order placement)
  await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0);
});

// ─── TC02: Missing Customer Name ───────────────────────────────────────────────
test('TC02 – Missing customer name validation', async ({ page }) => {
  await page.goto('/');

  // 1. Add Wireless Mouse
  await addToCart(page, 'Wireless Mouse');

  // 2. Leave name empty and click Place Order
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 3. Verify validation error message appears
  const errorMsg = page.getByRole('alert');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText('Please enter your name to continue.');

  // 4. Verify order confirmation is not displayed
  await expect(page.getByText('Order Placed Successfully!')).toHaveCount(0);

  // 5. Verify cart contents remain unchanged
  const cartSection = page.getByRole('region', { name: 'Shopping Cart' });
  await expect(cartSection.getByText('Wireless Mouse')).toBeVisible();
  await expect(cartSection.getByText('Subtotal: ₹499')).toBeVisible();
});

// ─── TC03: Empty Cart Checkout ─────────────────────────────────────────────────
test('TC03 – Empty cart checkout validation', async ({ page }) => {
  await page.goto('/');

  // 1. Keep cart empty, enter customer name
  await page.getByLabel(/Customer Name/).fill('Aswini');

  // 2. Click Place Order
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 3. Verify empty cart validation error
  const errorMsg = page.getByRole('alert');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toHaveText('Your cart is empty. Please add an item before checkout.');

  // 4. Verify no order confirmation is displayed
  await expect(page.getByText('Order Placed Successfully!')).toHaveCount(0);
});

// ─── TC04: Quantity Update & Exact Totals ───────────────────────────────────────
test('TC04 – Quantity update and exact total calculation', async ({ page }) => {
  await page.goto('/');

  // 1. Add Wireless Mouse
  await addToCart(page, 'Wireless Mouse');

  // 2. Increase quantity to 2
  await increaseQty(page, 'Wireless Mouse');

  // 3. Add Mechanical Keyboard
  await addToCart(page, 'Mechanical Keyboard');

  const cartSection = page.getByRole('region', { name: 'Shopping Cart' });

  // 4. Verify mouse line total: 499 × 2 = ₹998
  await expect(cartSection.getByText('Subtotal: ₹998')).toBeVisible();

  // 5. Verify keyboard line total: 1299 × 1 = ₹1,299
  await expect(cartSection.getByText('Subtotal: ₹1,299')).toBeVisible();

  // 6. Verify exact order total: 998 + 1299 = ₹2,297
  await expect(cartSection.locator('.order-total-amount')).toHaveText('₹2,297');
});

// ─── TC05: Remove Product ──────────────────────────────────────────────────────
test('TC05 – Remove product from cart', async ({ page }) => {
  await page.goto('/');

  // 1. Add Wireless Mouse and Mechanical Keyboard
  await addToCart(page, 'Wireless Mouse');
  await addToCart(page, 'Mechanical Keyboard');

  const cartSection = page.getByRole('region', { name: 'Shopping Cart' });
  await expect(cartSection.getByText('₹1,798')).toBeVisible();

  // 2. Remove Wireless Mouse
  await removeFromCart(page, 'Wireless Mouse');

  // 3. Verify Wireless Mouse is removed
  await expect(cartSection.getByText('Wireless Mouse')).toHaveCount(0);

  // 4. Verify Mechanical Keyboard remains and total updates to ₹1,299
  await expect(cartSection.getByText('Mechanical Keyboard')).toBeVisible();
  await expect(cartSection.locator('.order-total-amount')).toHaveText('₹1,299');
});

// ─── TC06: Rapid Double-Click Protection ────────────────────────────────────────
test('TC06 – Rapid double-click protection prevents duplicate orders', async ({ page }) => {
  await page.goto('/');

  // 1. Add product and enter customer name
  await addToCart(page, 'Wireless Mouse');
  await page.getByLabel(/Customer Name/).fill('Aswini');

  // 2. Rapidly double click Place Order button
  const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
  await placeOrderBtn.dblclick();

  // 3. Verify only one confirmation appears
  await expect(page.getByText('Order Placed Successfully!')).toHaveCount(1);

  // 4. Verify only one order reference exists
  const refs = await page.getByText(/ORD-[A-Z0-9]{6}/).all();
  expect(refs.length).toBe(1);

  // 5. Verify order cannot be submitted again (button is not present)
  await expect(page.getByRole('button', { name: 'Place Order' })).toHaveCount(0);
});

// ─── TC07: Decrease Quantity Floor ──────────────────────────────────────────────
test('TC07 – Decrease quantity and prevent below 1', async ({ page }) => {
  await page.goto('/');

  // 1. Add Wireless Mouse and increase to 2
  await addToCart(page, 'Wireless Mouse');
  await increaseQty(page, 'Wireless Mouse');

  const cartSection = page.getByRole('region', { name: 'Shopping Cart' });
  await expect(cartSection.getByText('Subtotal: ₹998')).toBeVisible();

  // 2. Decrease quantity back to 1
  await decreaseQty(page, 'Wireless Mouse');
  await expect(cartSection.getByText('Subtotal: ₹499')).toBeVisible();

  // 3. Verify decrease button is now disabled at quantity 1
  const decBtn = page.getByRole('button', { name: 'Decrease quantity of Wireless Mouse' });
  await expect(decBtn).toBeDisabled();
});

// ─── TC08: Preserve User Input on Validation Failure ───────────────────────────
test('TC08 – Preserve cart and input fields on validation failure', async ({ page }) => {
  await page.goto('/');

  // 1. Add product to cart
  await addToCart(page, 'Wireless Mouse');

  // 2. Enter whitespace-only name
  const nameInput = page.getByLabel(/Customer Name/);
  await nameInput.fill('   ');

  // 3. Click Place Order
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 4. Validation error appears
  await expect(page.getByRole('alert')).toHaveText('Please enter your name to continue.');

  // 5. Verify input value and cart items are preserved
  await expect(nameInput).toHaveValue('   ');
  const cartSection = page.getByRole('region', { name: 'Shopping Cart' });
  await expect(cartSection.getByText('Wireless Mouse')).toBeVisible();
  await expect(cartSection.getByText('Subtotal: ₹499')).toBeVisible();
});
