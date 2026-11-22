# Mini Checkout and Browser Test Suite

A clean, responsive, single-page mini checkout web application with an automated browser test suite powered by React, Vite, and Playwright.

---

## 1. Project Description
This project implements a lightweight e-commerce checkout flow for a small store selling synthetic peripheral products. It features interactive shopping cart operations, dynamic real-time subtotal and order total calculations, robust form validation with user state preservation, rapid double-click duplicate order prevention, and an accessible order confirmation display.

---

## 2. Objectives
- Deliver a clean, professional, responsive single-page shopping and checkout experience without unnecessary architectural complexity.
- Accurately calculate line totals and dynamic order sums with zero discrepancy.
- Prevent invalid order submissions (empty cart, missing customer name) while preserving customer entries.
- Ensure resilient protection against double-click and duplicate order creation.
- Build an end-to-end automated browser test suite with Playwright focusing on visible user journeys, resilient accessibility-based locators, and strict assertions.

---

## 3. Features
- **Product Catalog**: Two fixed products:
  - Wireless Mouse — ₹499
  - Mechanical Keyboard — ₹1,299
- **Interactive Shopping Cart**:
  - Add products to cart.
  - Remove items from cart.
  - Increment and decrement quantity controls.
  - Quantity lower-bound protection (minimum quantity 1; disabled decrement button).
  - Dynamic individual line subtotals and overall order total calculation.
  - Empty cart notification when no items are present.
- **Form Validation & UX**:
  - Requires customer name (disallows empty or whitespace-only inputs).
  - Blocks checkout on empty cart.
  - Displays visible error banners (`role="alert"`).
  - Retains entered customer name and cart contents upon validation failure.
- **Double-Click & Duplicate Submission Protection**:
  - Uses synchronous ref locking (`useRef`) to ignore concurrent or rapid double-clicks.
  - Ensures exactly one unique order reference (`ORD-XXXXXX`) is generated per submitted order.
  - Unmounts/disables the Place Order button after a successful order.
- **Order Confirmation**:
  - Clear visual transition to an order confirmation screen.
  - Displays unique generated reference, customer name, purchased line items with quantities, and total amount paid.

---

## 4. Technologies Used
- **Frontend**: React 19, JavaScript (ES Modules), HTML5, CSS3
- **Build Tool & Dev Server**: Vite 8
- **Browser Automation & Testing**: Playwright Test (`@playwright/test`)
- **Runtime**: Node.js v24+, npm v11+

---

## 5. Project Structure
```text
mini-checkout/
├── evidence/                       # Captured screenshots of manual & automated runs
│   ├── cart-with-items.png
│   ├── double-click-protection.png
│   ├── empty-cart-validation.png
│   ├── initial-state.png
│   └── successful-checkout.png
├── src/
│   ├── components/
│   │   ├── ProductList.jsx         # Product cards listing
│   │   ├── Cart.jsx                # Cart items, quantity controls, totals
│   │   ├── CheckoutForm.jsx        # Name input & Place Order trigger
│   │   └── OrderConfirmation.jsx   # Post-order confirmation summary
│   ├── App.jsx                     # Root application state & logic
│   ├── main.jsx                    # React entry point
│   └── styles.css                  # Modern responsive styling (Violet accent)
├── tests/
│   ├── checkout.spec.js            # Automated Playwright test cases (TC01–TC08)
│   └── evidence.spec.js            # Visual screenshot capture suite
├── playwright.config.js             # Playwright configuration with automated webServer
├── package.json                    # Project dependencies & scripts
├── vite.config.js                  # Vite configuration (port 5173, host 127.0.0.1)
├── README.md                       # Comprehensive documentation & execution guide
├── TEST_PLAN.md                    # Structured test plan & traceability matrix
└── TEST_RESULTS.md                 # Test results, pass/fail metrics & evidence
```

---

## 6. Installation Instructions
Clone the repository or navigate to the project directory, then install the dependencies:

```bash
cd mini-checkout
npm install
```

If Chromium is not yet installed in your Playwright cache, run:

```bash
npx playwright install chromium
```

---

## 7. How to Run the Application
Start the local Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://127.0.0.1:5173
```

To build and preview the production bundle:
```bash
npm run build
npm run preview
```

---

## 8. How to Run Playwright Tests

### Headless Test Run (All Tests)
Playwright is configured to automatically launch the Vite dev server using the `webServer` setting, execute all tests, and terminate the server when finished:

```bash
npx playwright test
```

### Run Tests with Interactive Playwright UI
To launch the interactive Playwright test runner UI with time-travel debugging:

```bash
npx playwright test --ui
```

### Run Tests in Headed Mode
To watch the browser actions live on your screen:

```bash
npx playwright test --headed
```

### View Playwright HTML Report
To view the detailed HTML report of the latest test run:

```bash
npx playwright show-report
```

---

## 9. Automated Test Scenarios

The automated test suite in `tests/checkout.spec.js` covers 8 test cases:

| Test ID | Scenario | Verification Focus |
| :--- | :--- | :--- |
| **TC01** | Successful checkout | Adds Wireless Mouse, inputs name, places order. Verifies confirmation dialog, `ORD-XXXXXX` reference, customer name, total ₹499, and button removal. |
| **TC02** | Missing customer name | Attempts submission without a name. Verifies alert message "Please enter your name to continue.", blocks confirmation, preserves cart. |
| **TC03** | Empty cart checkout | Attempts submission with 0 items. Verifies alert message "Your cart is empty. Please add an item before checkout." and blocks confirmation. |
| **TC04** | Quantity & exact total | Adds Mouse (x2 = ₹998) and Keyboard (x1 = ₹1,299). Confirms exact combined order total ₹2,297. |
| **TC05** | Remove product | Adds both products, removes Mouse. Confirms Mouse is removed from cart and total updates to ₹1,299. |
| **TC06** | Rapid double-click | Rapidly triggers two clicks on Place Order. Confirms only 1 confirmation is created and only 1 reference is generated. |
| **TC07** | Decrease quantity floor | Increases quantity to 2, decreases back to 1. Confirms decrement button is disabled at quantity 1. |
| **TC08** | Preserve user input | Submits invalid whitespace name. Confirms error appears and input value + cart items remain intact. |

---

## 10. Manual Test Instructions

### Manual Test 1: Empty Cart Validation
1. Open `http://127.0.0.1:5173`.
2. Do not click any "Add to Cart" buttons.
3. In the "Customer Name" input field, type `Aswini`.
4. Click the "Place Order" button.
5. **Expected Result**: An alert with text `"Your cart is empty. Please add an item before checkout."` appears. No order confirmation is generated. Customer name remains filled.
6. **Pass/Fail**: Pass. (Evidence: `evidence/empty-cart-validation.png`).

### Manual Test 2: Rapid Double-Click Protection
1. Open `http://127.0.0.1:5173`.
2. Click "Add to Cart" on the Wireless Mouse card.
3. In the "Customer Name" input field, type `Aswini`.
4. Rapidly double-click the "Place Order" button.
5. **Expected Result**: Only a single order confirmation is rendered with exactly one unique reference (`ORD-XXXXXX`). Duplicate orders are not generated.
6. **Pass/Fail**: Pass. (Evidence: `evidence/double-click-protection.png`).

---

## 11. Test Results Summary
- **Total Tests Executed**: 10 (8 Automated + 2 Manual)
- **Passed**: 10
- **Failed**: 0
- **Pass Rate**: 100%
- **Defects Discovered**: No defects were observed during the executed tests.

Refer to [`TEST_PLAN.md`](file:///c:/Users/aswin/Downloads/order/mini-checkout/TEST_PLAN.md) and [`TEST_RESULTS.md`](file:///c:/Users/aswin/Downloads/order/mini-checkout/TEST_RESULTS.md) for full test metrics and execution logs.
