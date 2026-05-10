import { useState } from 'react';

export default function ResumenTicket({
  ticket,
  subtotal,
  iva,
  total,
  dispatch,
  mostrarBotones,
  allowCollapse = false,
}) {
  const IVA_FIJO = 10;
  const [visible, setVisible] = useState(true);

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
          {ticket.length === 0 ? (
            <p className="ticket-vacio">No hay productos en el carrito.</p>
          ) : (
            <ul>
              {ticket.map((item) => {
                const linea = item.precio * item.cantidad;
                return (
                  <li key={item.id}>
                    <span className="pedido-line__title">{item.titulo}</span>
                    <span className="pedido-line__unit">{item.precio.toFixed(2)}€</span>
                    <button
                      type="button"
                      aria-label={`Quitar uno de ${item.titulo}`}
                      onClick={() =>
                        dispatch({ type: 'cambiarCantidad', payload: { id: item.id, cambio: -1 } })
                      }
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
          <div className="totales">
            <p>
              Subtotal: <strong>{subtotal.toFixed(2)}€</strong>
            </p>
            <p>
              IVA ({IVA_FIJO}%): <strong>{iva.toFixed(2)}€</strong>
            </p>
            <p className="totales-total">
              Total: <strong>{total.toFixed(2)}€</strong>
            </p>
          </div>
        </div>
        {mostrarBotones && ticket.length > 0 && (
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
