import { useState } from 'react';
import './FormularioDomicilio.css';

export default function FormularioRecoger({ dispatch, formulario = {} }) {
  const [error, setError] = useState('');

  function continuar() {
    const nombre = (formulario.nombre || '').trim();
    const telefono = (formulario.telefono || '').trim();
    const hora = (formulario.hora || '').trim();
    if (!nombre || !telefono || !hora) {
      setError('Completa nombre, teléfono y hora de recogida.');
      return;
    }
    setError('');
    dispatch({ type: 'setPaso', payload: 2 });
  }

  return (
    <div className="menu-container">
      <form
        className="form-card"
        onSubmit={(e) => {
          e.preventDefault();
          continuar();
        }}
      >
        <h2 className="form-title">Recogida en tienda</h2>

        {error ? <p className="form-error" role="alert">{error}</p> : null}

        <label className="form-label" htmlFor="rec-nombre">Nombre</label>
        <input
          id="rec-nombre"
          className="form-input"
          value={formulario.nombre || ''}
          onChange={(e) =>
            dispatch({ type: 'setFormulario', payload: { nombre: e.target.value } })
          }
          type="text"
          name="nombre"
          placeholder="Nombre para el pedido"
          autoComplete="name"
          required
        />

        <label className="form-label" htmlFor="rec-tel">Teléfono</label>
        <input
          id="rec-tel"
          className="form-input"
          value={formulario.telefono || ''}
          onChange={(e) =>
            dispatch({ type: 'setFormulario', payload: { telefono: e.target.value } })
          }
          type="tel"
          name="telefono"
          placeholder="Teléfono de contacto"
          autoComplete="tel"
          required
        />

        <label className="form-label" htmlFor="rec-hora">Hora de recogida</label>
        <input
          id="rec-hora"
          className="form-input"
          value={formulario.hora || ''}
          onChange={(e) =>
            dispatch({ type: 'setFormulario', payload: { hora: e.target.value } })
          }
          type="time"
          name="horaRecogida"
          required
        />

        <button type="submit" className="btn-checkout form-btn">
          Continuar al pago
        </button>
      </form>
    </div>
  );
}
