import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found" aria-labelledby="nf-title">
      <span className="not-found__icon" aria-hidden="true">☕</span>
      <p className="not-found__code" aria-label="Error 404">404</p>
      <h1 id="nf-title" className="not-found__title">¡Ups! Esta página no existe</h1>
      <p className="not-found__desc">
        Parece que esta taza está vacía. La página que buscas no se encontró,
        pero tenemos café recién hecho esperándote.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__btn-primary">
          Volver al inicio
        </Link>
        <Link to="/#carta" className="not-found__btn-secondary">
          Ver la carta
        </Link>
      </div>
    </main>
  );
}
