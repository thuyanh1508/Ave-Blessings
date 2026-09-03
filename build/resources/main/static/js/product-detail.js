import { products } from './products-data.js';
import { addToCart, formatCurrency } from './site.js';

function getProductById(id) {
  return products.find(p => p.id === parseInt(id, 10));
}

function getRelatedProducts(productId, limit = 3) {
  const current = getProductById(productId);
  if (!current) return [];

  return products
    .filter(p => p.id !== productId && p.category === current.category)
    .slice(0, limit);
}

function renderDetail(product) {
  const relatedProducts = getRelatedProducts(product.id);

  return `
    <div class="detail-content">
      <div class="detail-image">${product.image}</div>
      <div class="detail-info">
        <span class="detail-tag">${product.tag}</span>
        <h1>${product.name}</h1>

        <div class="detail-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span>${product.rating} (${product.reviews}件のレビュー)</span>
        </div>

        <div class="detail-price">${formatCurrency(product.price)}</div>

        <div class="detail-description">
          ${product.fullDescription}
        </div>

        <div class="product-features">
          <h3>このテンプレートの特徴</h3>
          <ul class="features-list">
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>

        <div class="actions">
          ${product.link ? `
            <a href="${product.link}" class="btn-primary">テンプレートを見る</a>
          ` : `
            <button class="btn-primary" id="addToCartButton">カートに追加</button>
          `}
          <button class="btn-secondary" id="backButton">戻る</button>
        </div>
      </div>
    </div>

    ${relatedProducts.length > 0 ? `
      <div class="related-section">
        <h2>関連商品</h2>
        <div class="related-products">
          ${relatedProducts.map(p => `
            <div class="related-card" data-id="${p.id}">
              <div class="related-image">${p.image}</div>
              <div class="related-info">
                <h4>${p.name}</h4>
                <div class="related-price">${formatCurrency(p.price)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

function initDetailPage() {
  const pathParts = window.location.pathname.split('/');
  const productId = Number(pathParts[pathParts.length - 1]);
  const detailContent = document.getElementById('detailContent');
  const notFound = document.getElementById('notFound');

  if (!productId) {
    detailContent.classList.add('hidden');
    notFound.classList.remove('hidden');
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    detailContent.classList.add('hidden');
    notFound.classList.remove('hidden');
    return;
  }

  document.title = `${product.name} - Ave Blessings`;
  document.getElementById('breadcrumbTitle').textContent = product.name;
  detailContent.innerHTML = renderDetail(product);

  const backButton = document.getElementById('backButton');
  if (backButton) backButton.addEventListener('click', () => window.history.back());

  const addToCartButton = document.getElementById('addToCartButton');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      addToCart(product.id, 1);
      alert(`${product.name} がカートに追加されました。`);
    });
  }

  document.querySelectorAll('.related-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      window.location.href = `/products/${id}`;
    });
  });
}

window.addEventListener('DOMContentLoaded', initDetailPage);
