export default function PantallaConfirmacion({ dispatch, ultimoPedido }) {
  const pedido = ultimoPedido;
  const tipoLabel =
    pedido?.tipoEntrega === 'domicilio'
      ? 'Envío a domicilio'
      : pedido?.tipoEntrega === 'recoger'
        ? 'Recogida en tienda'
        : null;

  return (
    <div className="container">
      <div className="card confirm-card">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido ha sido confirmado.</p>

        {pedido?.ticket?.length ? (
          <div className="confirm-resumen" aria-label="Resumen del pedido confirmado">
            <h3 className="confirm-resumen__title">Resumen</h3>
            {tipoLabel ? <p className="confirm-resumen__tipo">{tipoLabel}</p> : null}
            <ul className="confirm-resumen__list">
              {pedido.ticket.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.titulo} × {item.cantidad}
                  </span>
                  <span>{(item.precio * item.cantidad).toFixed(2)}€</span>
                </li>
              ))}
            </ul>
            <p className="confirm-resumen__total">
              Total pagado: <strong>{pedido.total.toFixed(2)}€</strong>
              <span className="confirm-resumen__iva"> (IVA incl.)</span>
            </p>
            {pedido.formulario?.nombre ? (
              <p className="confirm-resumen__nombre">A nombre de: {pedido.formulario.nombre}</p>
            ) : null}
          </div>
        ) : null}

        <p className="footer">
          Es una demo: no se ha enviado ningún correo ni cobro real.
        </p>

        <button
          type="button"
          className="btn-checkout"
          onClick={() => dispatch({ type: 'setPaso', payload: 0 })}
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
}
