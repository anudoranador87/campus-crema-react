import { IVA_FIJO } from '../reducers/cartReducer';

export function calculateSubtotal(ticket = []) {
  return ticket.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
}

export function calculateDiscount(subtotal, percentage = 0) {
  return subtotal * (percentage / 100);
}

export function calculateSubtotalWithDiscount(subtotal, discountAmount) {
  return subtotal - discountAmount;
}

export function calculateTax(amount, taxRate = IVA_FIJO) {
  return amount * (taxRate / 100);
}

export function calculateTotal(subtotalWithDiscount, taxAmount) {
  return subtotalWithDiscount + taxAmount;
}

export function calculateCartCount(ticket = []) {
  return ticket.reduce((acc, item) => acc + item.cantidad, 0);
}

export function calculateCartTotals(ticket, discountPercentage = 0) {
  const subtotal = calculateSubtotal(ticket);
  const descuentoImporte = calculateDiscount(subtotal, discountPercentage);
  const subtotalConDescuento = calculateSubtotalWithDiscount(
    subtotal,
    descuentoImporte
  );
  const iva = calculateTax(subtotalConDescuento);
  const total = calculateTotal(subtotalConDescuento, iva);

  return {
    subtotal,
    descuentoImporte,
    subtotalConDescuento,
    iva,
    total,
  };
}
