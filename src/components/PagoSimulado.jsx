import React from "react";
import './Menu.css';

export default function PagoSimulado({ dispatch }) {
  return (
    <form className="pedido-modal">
      <input className="form-input" onChange={(e) => dispatch({ type: "setFormulario", payload: { numero: e.target.value } })}
        type="text"
        placeholder="Número de tarjeta"
        name="cardNumber"
      />
      <input className="form-input" onChange={(e) => dispatch({ type: "setFormulario", payload: { nombre: e.target.value } })}
        type="text"
        placeholder="Nombre del titular"
        name="cardName"
      />
      <input className="form-input" onChange={(e) => dispatch({ type: "setFormulario", payload: { caducidad: e.target.value } })}
        type="text"
        placeholder="MM/AA"
        name="expiry"
      />
      <input className="form-input" onChange={(e) => dispatch({ type: "setFormulario", payload: { cvv: e.target.value } })}
        type="text"
        placeholder="CVV"
        name="cvv"
      />
     <button className="btn-checkout" onClick={() => dispatch({ type: "setPaso", payload: 4 })}>
  Confirmar Pago
</button>
    </form>
    
   
  );
}