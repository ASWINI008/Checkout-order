function CheckoutForm({ customerName, onNameChange, onPlaceOrder, error, orderPlaced }) {
  return (
    <section className="checkout-form" aria-label="Checkout" role="region">
      <div className="section-header">
        <h2 className="section-title">Customer Checkout</h2>
        <span className="security-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Instant Verification
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onPlaceOrder();
        }}
        noValidate
        className="form-inner"
      >
        <div className="form-group">
          <label htmlFor="customer-name" className="form-label">
            Customer Name <span aria-hidden="true" className="required-mark">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </span>
            <input
              id="customer-name"
              type="text"
              className={`form-input${error ? ' input-error' : ''}`}
              value={customerName}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="e.g. Aswini Kumar"
              aria-required="true"
              aria-describedby={error ? 'checkout-error' : undefined}
              disabled={orderPlaced}
              autoComplete="name"
            />
          </div>
        </div>

        {error && (
          <p id="checkout-error" className="error-message" role="alert" aria-live="assertive">
            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{error}</span>
          </p>
        )}

        <button
          type="submit"
          className="btn btn-place-order"
          disabled={orderPlaced}
          aria-label="Place Order"
        >
          <svg className="btn-lock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>{orderPlaced ? 'Order Placed ✓' : 'Place Order'}</span>
        </button>
      </form>
    </section>
  );
}

export default CheckoutForm;
