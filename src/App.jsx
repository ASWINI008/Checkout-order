import { useState, useRef } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';

function generateOrderRef() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let ref = 'ORD-';
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)];
  }
  return ref;
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);
  const isSubmitting = useRef(false);

  // Derived: whether order has been placed
  const orderPlaced = order !== null;
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  function handleAddToCart(product) {
    setLastAddedId(product.id);
    setTimeout(() => {
      setLastAddedId(null);
    }, 800);

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function handleIncrease(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrease(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function handleRemove(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function handlePlaceOrder() {
    // Double-click / rapid-click protection
    if (isSubmitting.current || orderPlaced) return;
    isSubmitting.current = true;

    // Validation
    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add an item before checkout.');
      isSubmitting.current = false;
      return;
    }

    if (!customerName.trim()) {
      setError('Please enter your name to continue.');
      isSubmitting.current = false;
      return;
    }

    // All valid — place the order
    setError('');
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const confirmedOrder = {
      reference: generateOrderRef(),
      customerName: customerName.trim(),
      items: cartItems.map((item) => ({ ...item })),
      total,
    };
    setOrder(confirmedOrder);
  }

  function handleContinueShopping() {
    setOrder(null);
    setCartItems([]);
    setCustomerName('');
    setError('');
    isSubmitting.current = false;
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="store-badge" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div>
              <h1 className="site-title">Mini Store</h1>
              <p className="site-tagline">Simple and secure checkout</p>
            </div>
          </div>

          <div className="header-cart-badge" aria-label={`Shopping cart with ${totalItemCount} items`}>
            <div className="cart-badge-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <span className="cart-badge-label">Cart</span>
            <span className={`cart-count-pill${totalItemCount > 0 ? ' has-items' : ''}`}>
              {totalItemCount}
            </span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="layout">
          {/* Left column – products */}
          <div className="left-col">
            <ProductList onAddToCart={handleAddToCart} lastAddedId={lastAddedId} />
          </div>

          {/* Right column – cart + checkout + confirmation */}
          <div className="right-col">
            <Cart
              items={cartItems}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />

            {!orderPlaced && (
              <CheckoutForm
                customerName={customerName}
                onNameChange={(val) => {
                  setCustomerName(val);
                  if (error) setError('');
                }}
                onPlaceOrder={handlePlaceOrder}
                error={error}
                orderPlaced={orderPlaced}
              />
            )}

            {orderPlaced && (
              <OrderConfirmation
                order={order}
                onContinueShopping={handleContinueShopping}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>© 2026 Mini Store • Fast, accessible & secure browser checkout</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
