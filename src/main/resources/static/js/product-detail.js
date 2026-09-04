function initDetailInteractions() {
  const backButton = document.getElementById('backButton');
  if (backButton) backButton.addEventListener('click', () => window.history.back());

  const addToCartButton = document.getElementById('addToCartButton');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      const id = addToCartButton.getAttribute('data-product-id');
      // addToCart may be provided by site.js; call if available
      if (typeof window.addToCart === 'function') {
        window.addToCart(parseInt(id, 10), 1);
      }
      alert('商品がカートに追加されました。');
    });
  }

  document.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('a');
      if (link) window.location.href = link.href;
    });
  });
}

window.addEventListener('DOMContentLoaded', initDetailInteractions);
