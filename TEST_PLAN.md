# Test Plan: Mini Checkout and Browser Test Suite

## 1. Overview & Objectives
This Test Plan details the verification and validation strategy for the Mini Checkout web application. The core objective is to ensure that the single-page checkout flow behaves reliably, calculates totals accurately, protects against invalid submissions and rapid double-clicks, and provides clear visual feedback and accessibility for end users.

## 2. Scope
- **In-Scope**:
  - Product catalog listing (Wireless Mouse - ₹499, Mechanical Keyboard - ₹1,299).
  - Cart operations: Adding products, removing products, increasing quantity, decreasing quantity (floor of 1).
  - Exact calculations: Line totals and dynamic order total.
  - Checkout form validation: Missing customer name, whitespace-only customer name, empty cart.
  - Input and cart state preservation upon validation failure.
  - Double-click and duplicate submission prevention.
  - Order confirmation screen: Single unique order reference generation, customer name, purchased items summary, total paid.
  - Automated Playwright browser tests and manual test cases.
- **Out-of-Scope**:
  - Backend API integration, database persistence, payment gateway processing, user authentication.

## 3. Test Strategy & Tools
- **Test Automation**: Playwright (`@playwright/test`) running headless/headed browser sessions with Chromium.
- **Locators & Assertions**: Resilient, accessibility-focused user-facing locators (`getByRole`, `getByLabel`, `getByText`, exact text assertions).
- **Execution & Reporting**: Playwright test runner with automated Vite dev server lifecycle via `playwright.config.js`. HTML and List reporting.
- **Manual Testing**: Targeted edge case validation for empty cart and double-click scenarios with screenshots stored in `evidence/`.

## 4. Test Scenarios & Traceability Matrix

| Test ID | Scenario | Priority | Preconditions | Test Steps | Expected Result |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **TC01** | Successful checkout | High | Cart contains product | 1. Add Wireless Mouse to cart.<br>2. Verify cart displays item.<br>3. Enter customer name "Aswini".<br>4. Click "Place Order". | Success confirmation is displayed with unique ORD-XXXXXX reference, customer name, items summary, correct total, and Place Order button is disabled/removed. |
| **TC02** | Missing customer name | High | Cart contains product | 1. Add Wireless Mouse to cart.<br>2. Leave name empty or whitespace.<br>3. Click "Place Order". | Validation error "Please enter your name to continue." is displayed. Confirmation is not shown. Cart contents remain preserved. |
| **TC03** | Empty cart checkout | High | Empty cart | 1. Do not add any product.<br>2. Enter customer name "Aswini".<br>3. Click "Place Order". | Validation error "Your cart is empty. Please add an item before checkout." is shown. No confirmation is displayed. |
| **TC04** | Quantity update | High | Product added | 1. Add Wireless Mouse.<br>2. Increase quantity to 2.<br>3. Add Mechanical Keyboard. | Wireless Mouse line total updates to ₹998. Mechanical Keyboard line total displays ₹1,299. Order total accurately calculates to ₹2,297. |
| **TC05** | Remove product | Medium | Product added | 1. Add Wireless Mouse and Mechanical Keyboard.<br>2. Click Remove on Wireless Mouse. | Wireless Mouse disappears from cart. Order total recalculates to ₹1,299. |
| **TC06** | Rapid double-click | High | Valid cart and name | 1. Add Wireless Mouse.<br>2. Enter name "Aswini".<br>3. Rapidly double-click "Place Order". | Only one confirmation is generated. Only one unique order reference exists. Duplicate order submission is strictly prevented. |
| **TC07** | Decrease quantity | Medium | Quantity greater than 1 | 1. Add item and increase quantity to 2.<br>2. Click decrease button (−).<br>3. Click decrease button again when quantity is 1. | Quantity decreases from 2 to 1 and totals recalculate. Decrease button is disabled at quantity 1, preventing negative or zero quantities. |
| **TC08** | Preserve user input | High | Validation failure | 1. Add product to cart.<br>2. Enter spaces in name field.<br>3. Submit order. | Validation triggers, but existing cart items and entered field values are retained. |

## 5. Risk Assessment & Prioritization
- **High Risk**:
  - Overcharging or calculation discrepancies in subtotals/totals.
  - Duplicate order generation on rapid clicks or network latency.
  - Submitting orders with empty names or empty carts.
- **Medium Risk**:
  - Cart item removal and quantity bounds logic.
- **Low Risk**:
  - Minor visual styling or hover effect states.
