import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';

export default function ResumenTicket({
  mostrarBotones,
  allowCollapse = false,
}) {
  const {
    state,
    dispatch,
    subtotal,
    descuentoImporte,
    iva,
    total,
    addToast,
    IVA_FIJO,
  } = useCart();
  const [visible, setVisible] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) return;

    let pct = 0;
    if (cleanCode === 'CAMPUS10') pct = 10;
    else if (cleanCode === 'COFFEELOVER') pct = 20;
    else if (cleanCode === 'PRIMERCAFE') pct = 15;

    if (pct > 0) {
      dispatch({ type: 'aplicarDescuento', payload: { code: cleanCode, porcentaje: pct } });
      addToast(`¡Cupón ${cleanCode} (-${pct}%) aplicado! 🎫`, 'success');
      setCouponCode('');
      setCouponError('');
    } else {
      setCouponError('Código no válido');
      addToast('El cupón ingresado no es válido ❌', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    const oldCode = state.descuentoCode;
    dispatch({ type: 'quitarDescuento' });
    addToast(`Cupón ${oldCode} eliminado`, 'info');
  };

  if (allowCollapse && !visible) {
    return (
      <button
        type="button"
        className="resumen-ticket-toggle"
        onClick={() => setVisible(true)}
        aria-expanded={false}
      >
        Mostrar resumen del pedido
      </button>
    );
  }

  return (
    <div className="resumen-ticket-root">
      <h2 className="resumen-ticket-title">Tu pedido</h2>
      <div className="pedido-modal">
        <div className="pedido-ticket">
          {allowCollapse && (
            <button
              type="button"
              className="pedido-close"
              onClick={() => setVisible(false)}
              aria-label="Ocultar resumen del pedido"
            >
              ✕
            </button>
          )}
          {state.ticket.length === 0 ? (
            <p className="ticket-vacio">No hay productos en el carrito.</p>
          ) : (
            <ul>
              {state.ticket.map((item) => {
                const linea = item.precio * item.cantidad;
                return (
                  <li key={item.id}>
                    <span className="pedido-line__title">{item.titulo}</span>
                    <span className="pedido-line__unit">{item.precio.toFixed(2)}€</span>
                    <button
                      type="button"
                      aria-label={`Quitar uno de ${item.titulo}`}
                      onClick={() => {
                        dispatch({ type: 'cambiarCantidad', payload: { id: item.id, cambio: -1 } });
                        if (item.cantidad === 1) {
                          addToast(`Eliminado ${item.titulo} del carrito`, 'info');
                        }
                      }}
                    >
                      −
                    </button>
                    <span aria-label={`Cantidad: ${item.cantidad}`}>{item.cantidad}</span>
                    <button
                      type="button"
                      aria-label={`Añadir uno más de ${item.titulo}`}
                      onClick={() =>
                        dispatch({ type: 'cambiarCantidad', payload: { id: item.id, cambio: 1 } })
                      }
                    >
                      +
                    </button>
                    <span className="pedido-line__sub">{linea.toFixed(2)}€</span>
                  </li>
                );
              })}
            </ul>
          )}

          {state.ticket.length > 0 && (
            <div className="coupon-section">
              {!state.descuentoCode ? (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Código de descuento (ej: CAMPUS10)"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-btn">
                    Aplicar
                  </button>
                  {couponError && <p className="coupon-error-msg">{couponError}</p>}
                </form>
              ) : (
                <div className="coupon-active-badge">
                  <span>🎟️ Cupón activo: <strong>{state.descuentoCode}</strong> (-{state.descuentoPorcentaje}%)</span>
                  <button type="button" onClick={handleRemoveCoupon} className="btn-remove-coupon" title="Eliminar cupón">
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="totales">
            <p>
              Subtotal: <strong>{subtotal.toFixed(2)}€</strong>
            </p>
            {state.descuentoPorcentaje > 0 && (
              <p className="descuento-line">
                Descuento: <strong className="descuento-value">-{descuentoImporte.toFixed(2)}€</strong>
              </p>
            )}
            <p>
              IVA ({IVA_FIJO}%): <strong>{iva.toFixed(2)}€</strong>
            </p>
            <p className="totales-total">
              Total: <strong>{total.toFixed(2)}€</strong>
            </p>
          </div>
        </div>
        {mostrarBotones && state.ticket.length > 0 && (
          <div className="pedido-modal-actions pedido-modal-actions--single">
            <button
              type="button"
              className="btn-checkout"
              onClick={() => dispatch({ type: 'setPaso', payload: 1 })}
            >
              Continuar con el pedido
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
