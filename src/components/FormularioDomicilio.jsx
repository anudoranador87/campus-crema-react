import { useState } from 'react';
import './FormularioDomicilio.css';

export default function FormularioDomicilio({ dispatch, formulario = {} }) {
  const [error, setError] = useState('');

  function continuar() {
    const nombre = (formulario.nombre || '').trim();
    const telefono = (formulario.telefono || '').trim();
    const direccion = (formulario.direccion || '').trim();
    if (!nombre || !telefono || !direccion) {
      setError('Completa nombre, teléfono y dirección para continuar.');
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
        <h2 className="form-title">Pedido a domicilio</h2>

        {error ? <p className="form-error" role="alert">{error}</p> : null}

        <label className="form-label" htmlFor="dom-nombre">Nombre</label>
        <input
          id="dom-nombre"
          className="form-input"
          value={formulario.nombre || ''}
          onChange={(e) => dispatch({ type: 'setFormulario', payload: { nombre: e.target.value } })}
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          autoComplete="name"
          required
        />

        <label className="form-label" htmlFor="dom-tel">Teléfono</label>
        <input
          id="dom-tel"
          className="form-input"
          value={formulario.telefono || ''}
          onChange={(e) => dispatch({ type: 'setFormulario', payload: { telefono: e.target.value } })}
          type="tel"
          name="telefono"
          placeholder="Teléfono de contacto"
          autoComplete="tel"
          required
        />

        <label className="form-label" htmlFor="dom-dir">Dirección</label>
        <input
          id="dom-dir"
          className="form-input"
          value={formulario.direccion || ''}
          onChange={(e) => dispatch({ type: 'setFormulario', payload: { direccion: e.target.value } })}
          type="text"
          name="direccion"
          placeholder="Calle, número, piso…"
          autoComplete="street-address"
          required
        />

        <label className="form-label" htmlFor="dom-inst">Instrucciones para el repartidor</label>
        <textarea
          id="dom-inst"
          className="form-textarea"
          value={formulario.instrucciones || ''}
          onChange={(e) => dispatch({ type: 'setFormulario', payload: { instrucciones: e.target.value } })}
          name="instrucciones"
          placeholder="Ej.: portería automática, timbre 3B…"
        />

        <button type="submit" className="btn-checkout form-btn">
          Continuar al pago
        </button>
      </form>
    </div>
  );
}
