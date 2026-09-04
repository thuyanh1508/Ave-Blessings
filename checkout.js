import {
  formatCurrency,
  getCartSummary,
  seedDemoCart
} from './site.js';

function renderCheckoutSummary() {
  const summary = getCartSummary();
  const summaryContainer = document.getElementById('checkoutSummary');

  if (!summary.items.length) {
    summaryContainer.innerHTML = '<div class="empty-state">Giỏ hàng hiện đang trống. Vui lòng chọn mẫu thiệp trước khi thanh toán.</div>';
    document.getElementById('checkoutTotal').textContent = formatCurrency(0);
    document.getElementById('checkoutForm').querySelector('button[type="submit"]').disabled = true;
    return;
  }

  summaryContainer.innerHTML = summary.items.map(item => `
    <div class="summary-row">
      <span>${item.name} × ${item.quantity}</span>
      <span>${formatCurrency(item.lineTotal)}</span>
    </div>
  `).join('');

  document.getElementById('checkoutSubtotal').textContent = formatCurrency(summary.subtotal);
  document.getElementById('checkoutShipping').textContent = formatCurrency(summary.shipping);
  document.getElementById('checkoutTotal').textContent = formatCurrency(summary.total);
}

document.addEventListener('DOMContentLoaded', () => {
  seedDemoCart();
  renderCheckoutSummary();

  const form = document.getElementById('checkoutForm');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nameValue = document.getElementById('fullName').value.trim();
    const emailValue = document.getElementById('email').value.trim();

    if (!nameValue || !emailValue) {
      alert('Vui lòng điền đầy đủ thông tin người đặt hàng.');
      return;
    }

    alert('Đặt hàng thành công! Demo đơn hàng đã được ghi nhận.');
    localStorage.removeItem('aveBlessingsCart');
    window.location.href = '/products';
  });
});
