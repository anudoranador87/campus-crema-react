

export default function PantallaConfirmacion({dispatch}) {
  return (
    <div className="container">
      <div className="card">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu pedido ha sido confirmado.</p>
       
        <p className="footer">
          Recibirás un email con los detalles de tu pedido.
        </p>

        <button className="btn-checkout" onClick={() => dispatch({ type: "setPaso", payload: 0 })}>
  Seguir comprando
</button>
      </div>
    </div>
  );
}