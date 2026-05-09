import{useState} from "react"

export default function ResumenTicket({ ticket, subtotal, iva, total, dispatch, setMostrarResumen,mostrarBotones }) {
    const IVA_FIJO = 10;
    const [visible, setVisible] = useState(true);
      //Para mostrar u ocultar el resumen de compra del ticket
      if (!visible) return <button onClick={() => setVisible(true)}>🛒</button>;
    // Añado algunas props para hacer este resumen visible en todos los pasos
    return (
    <div>
          <h2>Tu Pedido</h2>
          <div className="pedido-modal">
            <div className="pedido-ticket">
            <button type="button" onClick={() => setVisible(false)}>✕</button>
              <ul>
                {ticket.map(item => (
                  <li key={item.id}>
                    <span>{item.titulo}</span>
                    <span>{item.precio.toFixed(2)}€</span>
                    <button onClick={() => dispatch({ type: "cambiarCantidad", payload: { id: item.id, cambio: -1 } })}>-</button>
                    <span>{item.cantidad}</span>
                    <button onClick={() => dispatch({ type: "cambiarCantidad", payload: { id: item.id, cambio:  1 } })}>+</button>
                  </li>
                ))}
              </ul>
              <div className="totales">
                <p>Subtotal: <strong>{subtotal.toFixed(2)}€</strong></p>
                <p>IVA ({IVA_FIJO}%): <strong>{iva.toFixed(2)}€</strong></p>
                <p>Total: <strong>{total.toFixed(2)}€</strong></p>
              </div>
            </div>
        {mostrarBotones && (
  <div className="pedido-modal-actions">
              <button className="btn-domicilio" onClick={() => dispatch({ type: "setPaso", payload: 0 })}>Volver</button>
              <button className="btn-checkout"  onClick={() => dispatch({ type: "setPaso", payload: 1 })}>Continuar</button>
            </div>)}
          </div>
          </div>
      );
                }