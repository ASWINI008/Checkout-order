function Cart({ items, onIncrease, onDecrease, onRemove }) {
  const orderTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="cart cart-empty-state" aria-label="Shopping Cart" role="region">
        <div className="section-header">
          <h2 className="section-title">Shopping Cart</h2>
          <span className="cart-badge-chip">0 Items</span>
        </div>
        <div className="empty-cart-content">
          <div className="empty-cart-icon-bubble" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
          </div>
          <p className="empty-cart-message" role="status">
            Your cart is empty. Add a product to get started.
          </p>
          <p className="empty-cart-subtext">
            Explore our curated essentials on the left to begin your checkout.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="cart" aria-label="Shopping Cart" role="region">
      <div className="section-header">
        <h2 className="section-title">Shopping Cart</h2>
        <span className="cart-badge-chip has-items">
          {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <ul className="cart-list" aria-label="Cart items">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity;
          return (
            <li key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-unit-price">
                  Price: ₹{item.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls" role="group" aria-label={`Quantity for ${item.name}`}>
                  <button
                    className="btn btn-qty"
                    onClick={() => onDecrease(item.id)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="quantity-value" aria-label={`Quantity: ${item.quantity}`}>
                    {item.quantity}
                  </span>
                  <button
                    className="btn btn-qty"
                    onClick={() => onIncrease(item.id)}
                    aria-label={`Increase quantity of ${item.name}`}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <span
                  className="cart-item-subtotal"
                  aria-label={`Subtotal for ${item.name}: ₹${lineTotal.toLocaleString('en-IN')}`}
                >
                  Subtotal: ₹{lineTotal.toLocaleString('en-IN')}
                </span>

                <button
                  className="btn btn-remove"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  title="Remove from cart"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  <span>Remove</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="order-total-card" aria-live="polite">
        <div className="order-total-row">
          <div className="order-total-meta">
            <span className="order-total-label">Order Total</span>
            <span className="order-total-caption">Includes all taxes and items</span>
          </div>
          <span
            className="order-total-amount"
            aria-label={`Order total: ₹${orderTotal.toLocaleString('en-IN')}`}
          >
            ₹{orderTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Cart;
