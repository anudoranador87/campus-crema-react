import './FormularioDomicilio.css';

export default function FormularioRecoger({ dispatch }) {
    return (
      <div className="menu-container">
        <form className="form-card">
          <h2 className="form-title">Recogida en tienda</h2>
  
          <input
            className="form-input"
            onChange={(e) =>
              dispatch({ type: "setFormulario", payload: { nombre: e.target.value } })
            }
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
          />
  
          <input
            className="form-input"
            onChange={(e) =>
              dispatch({ type: "setFormulario", payload: { telefono: e.target.value } })
            }
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            required
          />
  
          <input
            className="form-input"
            onChange={(e) =>
              dispatch({ type: "setFormulario", payload: { hora: e.target.value } })
            }
            type="time"
            name="horaRecogida"
            required
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