import { products } from './products-data.js';

export const CART_STORAGE_KEY = 'aveBlessingsCart';

export function formatCurrency(value) {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0
  }).format(value);
}

export function getCart() {
  const rawCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!rawCart) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawCart);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(productId, quantity = 1) {
  const currentCart = getCart();
  const normalizedId = Number(productId);
  const existing = currentCart.find(item => item.id === normalizedId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    currentCart.push({ id: normalizedId, quantity });
  }

  saveCart(currentCart);
  return currentCart;
}

export function updateCartItem(productId, quantity) {
  const currentCart = getCart();
  const normalizedId = Number(productId);
  const nextCart = currentCart
    .map(item => item.id === normalizedId ? { ...item, quantity: Math.max(0, quantity) } : item)
    .filter(item => item.quantity > 0);

  saveCart(nextCart);
  return nextCart;
}

export function removeCartItem(productId) {
  const nextCart = getCart().filter(item => item.id !== Number(productId));
  saveCart(nextCart);
  return nextCart;
}

export function seedDemoCart() {
  const cart = getCart();

  if (cart.length > 0) {
    return cart;
  }

  const defaultCart = [{ id: 1, quantity: 1 }];
  saveCart(defaultCart);
  return defaultCart;
}

export function getCartItemsWithProductData() {
  const cart = seedDemoCart();

  return cart
    .map(item => {
      const product = products.find(entry => entry.id === Number(item.id));
      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
        lineTotal: product.price * item.quantity
      };
    })
    .filter(Boolean);
}

export function getCartSummary() {
  const items = getCartItemsWithProductData();
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const shipping = items.length > 0 ? 300 : 0;
  const total = subtotal + shipping;

  return {
    items,
    subtotal,
    shipping,
    total
  };
}
