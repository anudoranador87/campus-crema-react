import './FormularioDomicilio.css';

export default function FormularioDomicilio({ dispatch }) {
    return (
      <div className="menu-container">
        <form className="form-card">
          <h2 className="form-title">Pedido a domicilio</h2>
  
          <input
            className="form-input"
            onChange={(e) => dispatch({ type: "setFormulario", payload: { nombre: e.target.value } })}
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
          />
  
          <input
            className="form-input"
            onChange={(e) => dispatch({ type: "setFormulario", payload: { telefono: e.target.value } })}
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            required
          />
  
          <input
            className="form-input"
            onChange={(e) => dispatch({ type: "setFormulario", payload: { direccion: e.target.value } })}
            type="text"
            name="direccion"
            placeholder="Dirección"
            required
          />
  
          <textarea
            className="form-textarea"
            onChange={(e) => dispatch({ type: "setFormulario", payload: { instrucciones: e.target.value } })}
            name="instrucciones"
            placeholder="Instrucciones para el repartidor"
          />
  
          <button
            type="button"
            className="btn-principal form-btn"
            onClick={() => dispatch({ type: "setPaso", payload: 3 })}
          >
            Continuar al pago
          </button>
        </form>
      </div>
    );
  }