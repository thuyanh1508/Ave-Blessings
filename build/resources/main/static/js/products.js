import { products } from './products-data.js';
import { formatCurrency } from './site.js';

function renderProducts(filteredProducts) {
  const grid = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');

  if (filteredProducts.length === 0) {
    grid.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
  grid.innerHTML = filteredProducts.map(product => {
    const targetLink = `/products/${product.id}`;
    return `
      <div class="product-card" data-id="${product.id}" data-link="${targetLink}">
        <div class="product-image">${product.image}</div>
        <div class="product-info">
          <span class="tag">${product.tag}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <div class="price">${formatCurrency(product.price)}</div>
            <a href="${targetLink}" class="btn-detail" data-link="${targetLink}">詳細を見る</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  attachProductCardEvents();
}

function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const priceRange = document.getElementById('priceFilter').value;

  const filtered = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);
    const matchCategory = !category || product.category === category;

    let matchPrice = true;
    if (priceRange) {
      if (priceRange === '0-1000') matchPrice = product.price < 1000;
      else if (priceRange === '1000-3000') matchPrice = product.price >= 1000 && product.price <= 3000;
      else if (priceRange === '3000') matchPrice = product.price >= 3000;
    }

    return matchSearch && matchCategory && matchPrice;
  });

  renderProducts(filtered);
}

function goToDetail(productId) {
  window.location.href = `/products/${productId}`;
}

function attachProductCardEvents() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const productId = card.dataset.id;
    const productLink = card.dataset.link || `/products/${productId}`;

    card.addEventListener('click', () => {
      window.location.href = productLink;
    });

    const button = card.querySelector('.btn-detail');
    if (button) {
      button.addEventListener('click', event => {
        event.stopPropagation();
      });
    }
  });
}

function initProductPage() {
  document.getElementById('searchInput').addEventListener('input', filterProducts);
  document.getElementById('categoryFilter').addEventListener('change', filterProducts);
  document.getElementById('priceFilter').addEventListener('change', filterProducts);
  renderProducts(products);
}

window.addEventListener('DOMContentLoaded', initProductPage);
