const PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Mouse',
    category: 'Computer Peripherals',
    price: 499,
    description: 'Ergonomic 2.4GHz optical mouse with silent click buttons and long battery life.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="7"/>
        <line x1="12" y1="6" x2="12" y2="10"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'Computer Peripherals',
    price: 1299,
    description: 'Compact tactile keyboard with durable mechanical switches and RGB backlighting.',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3"/>
        <line x1="6" y1="8" x2="6" y2="8.01"/>
        <line x1="10" y1="8" x2="10" y2="8.01"/>
        <line x1="14" y1="8" x2="14" y2="8.01"/>
        <line x1="18" y1="8" x2="18" y2="8.01"/>
        <line x1="6" y1="12" x2="6" y2="12.01"/>
        <line x1="10" y1="12" x2="10" y2="12.01"/>
        <line x1="14" y1="12" x2="14" y2="12.01"/>
        <line x1="18" y1="12" x2="18" y2="12.01"/>
        <line x1="8" y1="16" x2="16" y2="16"/>
      </svg>
    ),
  },
];

function ProductList({ onAddToCart, lastAddedId }) {
  return (
    <section className="product-list" aria-label="Products">
      <div className="section-header">
        <h2 className="section-title">Featured Products</h2>
        <span className="product-count-chip">2 Items Available</span>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((product) => {
          const isRecentlyAdded = lastAddedId === product.id;
          return (
            <article key={product.id} className={`product-card${isRecentlyAdded ? ' card-just-added' : ''}`}>
              <div className="product-illustration-wrapper">
                <div className="product-illustration" aria-hidden="true">
                  {product.icon}
                </div>
                <span className="product-category-badge">{product.category}</span>
              </div>

              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-pricing-row">
                  <span className="price-tag">
                    <span className="currency-symbol">₹</span>
                    <span className="product-price">{product.price.toLocaleString('en-IN')}</span>
                  </span>
                  <span className="stock-status">In Stock</span>
                </div>
              </div>

              <button
                className={`btn btn-primary btn-add-cart${isRecentlyAdded ? ' btn-success-pulse' : ''}`}
                onClick={() => onAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {isRecentlyAdded ? (
                    <polyline points="20 6 9 17 4 12"/>
                  ) : (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </>
                  )}
                </svg>
                <span>{isRecentlyAdded ? 'Added to Cart ✓' : 'Add to Cart'}</span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProductList;
