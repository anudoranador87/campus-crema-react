import './Menu.css';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import FormularioDomicilio from './FormularioDomicilio';
import FormularioRecoger from './FormularioRecoger';
import PagoSimulado from './PagoSimulado';
import PantallaConfirmacion from './PantallaConfirmacion';
import ResumenTicket from './ResumenTicket';
import TextExpander from './TextExpander';
import menuItems from '../Data/menuItems.js';

// Los datos del menú están en src/Data/menuItems.js
const items = menuItems;

const PASOS_CHECKOUT = [
  { id: 1, label: 'Entrega' },
  { id: 2, label: 'Pago' },
  { id: 3, label: 'Confirmación' },
];

function CheckoutStepper({ pasoActual }) {
  return (
    <ol className="checkout-stepper" aria-label="Progreso del pedido">
      {PASOS_CHECKOUT.map((p, i) => {
        const hecho = pasoActual > p.id;
        const activo = pasoActual === p.id;
        return (
          <li
            key={p.id}
            className={[
              'checkout-stepper__step',
              hecho ? 'checkout-stepper__step--done' : '',
              activo ? 'checkout-stepper__step--active' : '',
            ].filter(Boolean).join(' ')}
          >
            <span className="checkout-stepper__num" aria-hidden>{hecho ? '✓' : i + 1}</span>
            <span className="checkout-stepper__label">{p.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Menu() {
  const { state, dispatch, subtotal, iva, total, cartCount, addToast } = useCart();
  const sectionRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [badgePop, setBadgePop] = useState(false);

  // Dispara animación pop en el badge al añadir productos
  function handleAddItem(item) {
    dispatch({ type: 'añadir', payload: item });
    addToast(`¡Añadido ${item.titulo} al carrito! ☕`, 'success');
    setBadgePop(true);
  }

  const resumenProps = {
    mostrarBotones: false,
    allowCollapse: state.paso === 0,
  };

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.paso]);

  // Filtrar y ordenar productos
  const itemsFiltradosYOrdenados = items
    .filter(item => state.categoria === 'todos' || item.categoria === state.categoria)
    .filter(item => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        item.titulo.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.precio - b.precio;
      if (sortBy === 'price-desc') return b.precio - a.precio;
      if (sortBy === 'name-asc') return a.titulo.localeCompare(b.titulo);
      return 0;
    });

  function renderPasos() {
    switch (state.paso) {

      // ── PASO 0: CARTA ──────────────────────────────────────────
      case 0:
        return (
          <section className="menu" id="carta" ref={sectionRef}>
            <h2>Nuestra Carta</h2>

            <div className="categorias">
              {["todos", "cafe", "salado", "dulce"].map(cat => (
                <button
                  key={cat}
                  className={state.categoria === cat ? "activo" : ""}
                  onClick={() => dispatch({ type: "setCategoria", payload: cat })}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Filtros de Buscador y Ordenación */}
            <div className="menu-filters">
              <div className="search-box">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar café, postre, tostada..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Buscar productos de la carta"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="search-clear-btn"
                    aria-label="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="sort-box">
                <label htmlFor="sort-select" className="sort-label">Ordenar:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Recomendado</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name-asc">Nombre: A-Z</option>
                </select>
              </div>
            </div>

            {itemsFiltradosYOrdenados.length === 0 ? (
              <div className="menu-empty-state">
                <p>No encontramos productos que coincidan con tu búsqueda.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    dispatch({ type: 'setCategoria', payload: 'todos' });
                  }}
                  className="btn-checkout"
                >
                  Ver toda la carta
                </button>
              </div>
            ) : (
              <div className="menu-grid">
                {itemsFiltradosYOrdenados.map(item => (
                  <article key={item.id} className="menu-item">
                    <img
                      src={item.img}
                      alt={item.titulo}
                      loading="lazy"
                      width="300"
                      height="180"
                    />
                    <div className="menu-item-info">
                      <h3>{item.titulo}</h3>

                      {/* Badges de alérgenos / dieta */}
                      {item.badges && item.badges.length > 0 && (
                        <ul className="badge-list" aria-label="Información dietética">
                          {item.badges.map((badge, i) => (
                            <li key={i} className="badge">{badge}</li>
                          ))}
                        </ul>
                      )}

                      <TextExpander collapsedNumWords={8}>
                        {item.desc}
                      </TextExpander>

                      <span className="precio">{item.precio.toFixed(2)}€</span>
                      <button
                        className="item-add-btn"
                        onClick={() => handleAddItem(item)}
                        aria-label={`Añadir ${item.titulo} al carrito`}
                      >
                        Añadir
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {state.ticket.length > 0 && (
              <ResumenTicket {...resumenProps} />
            )}

            <div className="menu-order-container">
              <div className="menu-cart-btn-wrap">
                <button
                  type="button"
                  className="menu-order-btn"
                  onClick={() => dispatch({ type: 'setPaso', payload: 1 })}
                  disabled={state.ticket.length === 0}
                  aria-label={cartCount ? `Ver carrito, ${cartCount} artículos` : 'Ver carrito'}
                >
                  Ver carrito y tramitar pedido
                </button>
                {cartCount > 0 && (
                  <span
                    className={`menu-cart-badge${badgePop ? ' menu-cart-badge--pop' : ''}`}
                    aria-hidden
                    onAnimationEnd={() => setBadgePop(false)}
                  >
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
            </div>
          </section>
        );

      // ── PASO 1: TIPO DE ENTREGA + FORMULARIO ───────────────────
      case 1:
        return (
          <section className="menu checkout-section" ref={sectionRef}>
            <h2>Tipo de entrega</h2>
            <CheckoutStepper pasoActual={1} />
            <div className="checkout-layout">
              <div className="checkout-layout__col checkout-layout__col--ticket">
                <ResumenTicket {...resumenProps} mostrarBotones={false} />
              </div>
              <div className="checkout-layout__col">
                {state.tipoEntrega === null ? (
                  <div className="entrega-opciones">
                    <p className="entrega-opciones__hint">Elige cómo quieres recibir tu pedido.</p>
                    <div className="pedido-modal-actions pedido-modal-actions--stack">
                      <button
                        type="button"
                        className="btn-domicilio"
                        onClick={() => dispatch({ type: 'setTipoEntrega', payload: 'domicilio' })}
                      >
                        A domicilio
                      </button>
                      <button
                        type="button"
                        className="btn-checkout"
                        onClick={() => dispatch({ type: 'setTipoEntrega', payload: 'recoger' })}
                      >
                        Recogida en tienda
                      </button>
                    </div>
                  </div>
                ) : state.tipoEntrega === 'domicilio' ? (
                  <FormularioDomicilio dispatch={dispatch} formulario={state.formulario} />
                ) : (
                  <FormularioRecoger dispatch={dispatch} formulario={state.formulario} />
                )}
              </div>
            </div>
            <div className="checkout-nav">
              <button
                type="button"
                className="btn-domicilio btn-domicilio--ghost"
                onClick={() =>
                  state.tipoEntrega === null
                    ? dispatch({ type: 'setPaso', payload: 0 })
                    : dispatch({ type: 'setTipoEntrega', payload: null })
                }
              >
                {state.tipoEntrega === null ? '← Volver a la carta' : '← Cambiar tipo de entrega'}
              </button>
            </div>
          </section>
        );

      // ── PASO 2: PAGO SIMULADO ──────────────────────────────────
      case 2:
        return (
          <section className="menu checkout-section" ref={sectionRef}>
            <h2>Pago</h2>
            <CheckoutStepper pasoActual={2} />
            <p className="checkout-disclaimer">Pago simulado para demostración. No se cargará ningún import real.</p>
            <div className="checkout-layout">
              <div className="checkout-layout__col checkout-layout__col--ticket">
                <ResumenTicket {...resumenProps} mostrarBotones={false} />
              </div>
              <div className="checkout-layout__col checkout-layout__col--pay">
                <PagoSimulado dispatch={dispatch} formulario={state.formulario} />
              </div>
            </div>
            <div className="checkout-nav">
              <button
                type="button"
                className="btn-domicilio btn-domicilio--ghost"
                onClick={() => dispatch({ type: 'setPaso', payload: 1 })}
              >
                ← Volver a entrega
              </button>
            </div>
          </section>
        );

      // ── PASO 3: CONFIRMACIÓN ───────────────────────────────────
      case 3:
        return (
          <div className="checkout-confirm-wrap" ref={sectionRef}>
            <CheckoutStepper pasoActual={3} />
            <PantallaConfirmacion dispatch={dispatch} ultimoPedido={state.ultimoPedido} />
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div>
      {renderPasos()}
    </div>
  );
}

export default Menu;