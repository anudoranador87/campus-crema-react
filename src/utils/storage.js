const CART_STORAGE_KEY = 'cc_cart';
const ORDERS_STORAGE_KEY = 'cc_orders';

function readJson(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error leyendo ${key} de localStorage`, error);
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error guardando ${key} en localStorage`, error);
  }
}

export function loadCart() {
  return readJson(CART_STORAGE_KEY, {});
}

export function saveCart(cart) {
  writeJson(CART_STORAGE_KEY, cart);
}

export function loadOrders() {
  return readJson(ORDERS_STORAGE_KEY, []);
}

export function saveOrder(order) {
  const orders = loadOrders();
  orders.unshift(order);
  writeJson(ORDERS_STORAGE_KEY, orders);
}
