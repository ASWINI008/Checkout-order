function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) return null;

  return (
    <section className="order-confirmation" aria-label="Order Confirmation" role="region">
      <div className="confirmation-header">
        <div className="confirmation-badge" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div>
          <h2 className="confirmation-title">Order Placed Successfully!</h2>
          <p className="confirmation-subtitle">Thank you for your purchase. We are preparing your order.</p>
        </div>
      </div>

      <div className="confirmation-body">
        <div className="confirmation-meta-grid">
          <div className="meta-card">
            <span className="meta-label">Order Reference</span>
            <span className="confirmation-reference">
              <strong>{order.reference}</strong>
            </span>
          </div>

          <div className="meta-card">
            <span className="meta-label">Customer Details</span>
            <span className="confirmation-customer">
              Customer: <strong>{order.customerName}</strong>
            </span>
          </div>
        </div>

        <div className="confirmation-items">
          <h3 className="confirmation-items-title">Ordered Items Summary</h3>
          <ul className="confirmation-item-list">
            {order.items.map((item) => (
              <li key={item.id} className="confirmation-item">
                <div className="conf-item-details">
                  <span className="conf-item-name">{item.name}</span>
                  <span className="conf-item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="conf-item-subtotal">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="confirmation-total">
          <div className="conf-total-label-group">
            <span className="conf-total-title">Total Paid</span>
            <span className="conf-total-sub">Payment Complete</span>
          </div>
          <span className="conf-total-amount">
            ₹{order.total.toLocaleString('en-IN')}
          </span>
        </div>

        {onContinueShopping && (
          <button
            type="button"
            className="btn btn-continue-shopping"
            onClick={onContinueShopping}
            aria-label="Continue Shopping"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            <span>Continue Shopping</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default OrderConfirmation;
