import {
  formatCurrency,
  getCartSummary,
  removeCartItem,
  updateCartItem,
  seedDemoCart
} from './site.js';

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const summary = getCartSummary();

  if (!summary.items.length) {
    cartItems.innerHTML = '<div class="empty-state">Giỏ hàng của bạn hiện đang trống. Hãy quay lại danh sách sản phẩm để chọn mẫu thiệp phù hợp.</div>';
    document.getElementById('subtotal').textContent = formatCurrency(0);
    document.getElementById('shipping').textContent = formatCurrency(0);
    document.getElementById('total').textContent = formatCurrency(0);
    return;
  }

  cartItems.innerHTML = summary.items.map(item => `
    <article class="cart-item" data-id="${item.id}">
      <div class="cart-item-image">${item.image}</div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.tag}</p>
        <div class="cart-item-meta">
          <div class="quantity-control" aria-label="Quantity selector">
            <button type="button" data-action="decrease" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" data-id="${item.id}">+</button>
          </div>
          <button class="remove-btn" type="button" data-action="remove" data-id="${item.id}">Xóa</button>
        </div>
      </div>
      <div class="item-price">${formatCurrency(item.lineTotal)}</div>
    </article>
  `).join('');

  document.getElementById('subtotal').textContent = formatCurrency(summary.subtotal);
  document.getElementById('shipping').textContent = formatCurrency(summary.shipping);
  document.getElementById('total').textContent = formatCurrency(summary.total);

  document.querySelectorAll('[data-action="increase"]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const currentItem = summary.items.find(item => String(item.id) === String(id));
      updateCartItem(id, (currentItem?.quantity || 1) + 1);
      renderCart();
    });
  });

  document.querySelectorAll('[data-action="decrease"]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const currentItem = summary.items.find(item => String(item.id) === String(id));
      updateCartItem(id, (currentItem?.quantity || 1) - 1);
      renderCart();
    });
  });

  document.querySelectorAll('[data-action="remove"]').forEach(button => {
    button.addEventListener('click', () => {
      removeCartItem(button.dataset.id);
      renderCart();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  seedDemoCart();
  renderCart();
});
