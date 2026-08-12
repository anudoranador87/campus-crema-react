import { saveOrder } from '../utils/storage';

export function createOrder(state, totals) {
  return {
    id: 'CC-' + Math.floor(100000 + Math.random() * 900000),
    fecha: new Date().toISOString(),
    ticket: [...state.ticket],
    tipoEntrega: state.tipoEntrega,
    formulario: { ...state.formulario },
    subtotal: totals.subtotal,
    descuentoCode: state.descuentoCode,
    descuentoPorcentaje: state.descuentoPorcentaje,
    descuentoImporte: totals.descuentoImporte,
    iva: totals.iva,
    total: totals.total,
    estado: 'recibido',
  };
}

export function confirmOrder(state, totals) {
  const order = createOrder(state, totals);
  saveOrder(order);
  return order;
}
