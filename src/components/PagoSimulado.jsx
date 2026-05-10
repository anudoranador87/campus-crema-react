import { useState } from 'react';
import './Menu.css';

export default function PagoSimulado({ dispatch, formulario = {} }) {
  const [error, setError] = useState('');

  function confirmarPago(e) {
    e.preventDefault();
    const num = (formulario.numeroTarjeta || '').replace(/\s/g, '');
    const titular = (formulario.titularTarjeta || '').trim();
    const cad = (formulario.caducidad || '').trim();
    const cvv = (formulario.cvv || '').trim();
    if (num.length < 12 || !titular || !cad || cvv.length < 3) {
      setError('Introduce datos de tarjeta válidos (demo: número, titular, MM/AA y CVV).');
      return;
    }
    setError('');
    dispatch({ type: 'confirmar' });
  }

  return (
    <form className="pago-simulado pedido-modal" onSubmit={confirmarPago}>
      <h3 className="pago-simulado__title">Datos de pago</h3>
      {error ? <p className="form-error" role="alert">{error}</p> : null}

      <label className="form-label" htmlFor="pay-num">Número de tarjeta</label>
      <input
        id="pay-num"
        className="form-input"
        value={formulario.numeroTarjeta || ''}
        onChange={(e) =>
          dispatch({ type: 'setFormulario', payload: { numeroTarjeta: e.target.value } })
        }
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="0000 0000 0000 0000"
        name="cardNumber"
      />

      <label className="form-label" htmlFor="pay-name">Titular</label>
      <input
        id="pay-name"
        className="form-input"
        value={formulario.titularTarjeta || ''}
        onChange={(e) =>
          dispatch({ type: 'setFormulario', payload: { titularTarjeta: e.target.value } })
        }
        type="text"
        autoComplete="cc-name"
        placeholder="Como figura en la tarjeta"
        name="cardName"
      />

      <div className="pago-simulado__row">
        <div className="pago-simulado__field">
          <label className="form-label" htmlFor="pay-exp">Caducidad</label>
          <input
            id="pay-exp"
            className="form-input"
            value={formulario.caducidad || ''}
            onChange={(e) =>
              dispatch({ type: 'setFormulario', payload: { caducidad: e.target.value } })
            }
            type="text"
            autoComplete="cc-exp"
            placeholder="MM/AA"
            name="expiry"
          />
        </div>
        <div className="pago-simulado__field">
          <label className="form-label" htmlFor="pay-cvv">CVV</label>
          <input
            id="pay-cvv"
            className="form-input"
            value={formulario.cvv || ''}
            onChange={(e) =>
              dispatch({ type: 'setFormulario', payload: { cvv: e.target.value } })
            }
            type="password"
            autoComplete="cc-csc"
            placeholder="•••"
            name="cvv"
          />
        </div>
      </div>

      <button type="submit" className="btn-checkout pago-simulado__submit">
        Confirmar y finalizar pedido
      </button>
    </form>
  );
}
