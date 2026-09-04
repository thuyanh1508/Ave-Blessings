function matchesPrice(price, priceRange) {
  if (!priceRange) return true;
  if (priceRange === '0-1000') return price < 1000;
  if (priceRange === '1000-3000') return price >= 1000 && price <= 3000;
  if (priceRange === '3000') return price >= 3000;
  return true;
}

function filterProducts() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const priceRange = document.getElementById('priceFilter').value;

  const cards = document.querySelectorAll('.product-card');
  let anyVisible = false;
  cards.forEach(card => {
    const name = (card.querySelector('h3') && card.querySelector('h3').textContent || '').toLowerCase();
    const desc = (card.querySelector('p') && card.querySelector('p').textContent || '').toLowerCase();
    const tag = (card.querySelector('.tag') && card.querySelector('.tag').textContent || '').toLowerCase();
    const priceText = (card.querySelector('.price') && card.querySelector('.price').textContent || '0');
    const price = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;

    const matchSearch = name.includes(searchTerm) || desc.includes(searchTerm) || tag.includes(searchTerm);
    const matchCategory = !category || (card.getAttribute('data-category') === category) || (card.getAttribute('data-category') == null && true);
    const matchPrice = matchesPrice(price, priceRange);

    const show = matchSearch && matchCategory && matchPrice;
    card.style.display = show ? '' : 'none';
    if (show) anyVisible = true;
  });

  const noResults = document.getElementById('noResults');
  if (noResults) {
    if (!anyVisible) noResults.classList.remove('hidden');
    else noResults.classList.add('hidden');
  }
}

function attachProductCardEvents() {
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const link = card.querySelector('.btn-detail');
    if (link) {
      link.addEventListener('click', (e) => { e.stopPropagation(); });
    }
    card.addEventListener('click', () => {
      const a = card.querySelector('.btn-detail');
      if (a && a.href) window.location.href = a.href;
    });
  });
}

function initProductPage() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');

  if (searchInput) searchInput.addEventListener('input', filterProducts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
  if (priceFilter) priceFilter.addEventListener('change', filterProducts);

  attachProductCardEvents();
}

window.addEventListener('DOMContentLoaded', initProductPage);
