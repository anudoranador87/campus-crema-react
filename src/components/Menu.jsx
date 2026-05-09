import './Menu.css';
import { useReducer } from 'react';
import FormularioDomicilio from './FormularioDomicilio';
import FormularioRecoger from './FormularioRecoger';
import PagoSimulado from './PagoSimulado';
import PantallaConfirmacion from './PantallaConfirmacion';
import ResumenTicket from './ResumenTicket';

const items = [
  { id: 'espresso',         titulo: 'Espresso',              desc: 'Café intenso y concentrado',         precio: 2.5, img: '/assets/images/ESPRESSO DOBLE.png',     categoria: 'cafe'   },
  { id: 'flat-white',       titulo: 'Flat White',            desc: 'Espresso con leche vaporizada',      precio: 3.5, img: '/assets/images/FLAT WHITE.png',         categoria: 'cafe'   },
  { id: 'cappuccino',       titulo: 'Cappuccino',            desc: 'Espresso con espuma cremosa',        precio: 3.2, img: '/assets/images/Capuccino.png',          categoria: 'cafe'   },
  { id: 'latte',            titulo: 'Latte',                 desc: 'Café suave con leche al vapor',      precio: 3.4, img: '/assets/images/Latte.png',              categoria: 'cafe'   },
  { id: 'cortado',          titulo: 'Cortado',               desc: 'Espresso con un toque de leche',     precio: 2.8, img: '/assets/images/Cortado.png',            categoria: 'cafe'   },
  { id: 'iced-latte',       titulo: 'Iced Latte',            desc: 'Café frío con leche y hielo',        precio: 3.8, img: '/assets/images/iced_latte.png',         categoria: 'cafe'   },
  { id: 'matcha-latte',     titulo: 'Matcha Latte',          desc: 'Té matcha con leche cremosa',        precio: 4.2, img: '/assets/images/matcha_latte.png',       categoria: 'cafe'   },
  { id: 'chai-latte',       titulo: 'Chai Latte',            desc: 'Té especiado con leche vaporizada',  precio: 4.0, img: '/assets/images/chai_latte.png',         categoria: 'cafe'   },
  { id: 'salmon-cream',     titulo: 'Salmon cream',          desc: 'Pan artesano con Salmon y queso',    precio: 2.5, img: '/assets/images/SALMON CREAM.png',       categoria: 'salado' },
  { id: 'tostada-aguacate', titulo: 'Tostada con aguacate',  desc: 'Rodaja de pan cateto con aguacate', precio: 2.8, img: '/assets/images/TOASTES SOURDOUGH.png',  categoria: 'salado' },
  { id: 'serrano-premium',  titulo: 'Serrano Premium',       desc: 'Pan con Jamon Serrano iberico',     precio: 3.8, img: '/assets/images/serrano.png',            categoria: 'salado' },
  { id: 'bagel-pavo',       titulo: 'Bagel de Pavo',         desc: 'Bagel tostado con pavo y crema',     precio: 4.5, img: '/assets/images/bagel_pavo.png',         categoria: 'salado' },
  { id: 'hummus-bowl',      titulo: 'Hummus Bowl',           desc: 'Hummus casero con crudités',         precio: 5.2, img: '/assets/images/hummus_bowl.png',        categoria: 'salado' },
  { id: 'focaccia',         titulo: 'Focaccia',              desc: 'Focaccia de tomate y mozzarella',    precio: 4.8, img: '/assets/images/focaccia.png',           categoria: 'salado' },
  { id: 'croissant',        titulo: 'Croissant',             desc: 'Mantequilla francesa artesanal',    precio: 2.8, img: '/assets/images/Croissant.png',          categoria: 'dulce'  },
  { id: 'cookie',           titulo: 'Cookie',                desc: 'Chocolate negro con nueces',        precio: 3.2, img: '/assets/images/COOKIE LABORATORIO.png', categoria: 'dulce'  },
  { id: 'cheesecake',       titulo: 'Cheesecake',            desc: 'Tarta de queso estilo vasco',       precio: 4.0, img: '/assets/images/cheesecake.png',         categoria: 'dulce'  },
  { id: 'granola-bowl',     titulo: 'Granola bowl',          desc: 'Avena, frutas y miel',              precio: 4.5, img: '/assets/images/ENERGY BOWL.png',        categoria: 'dulce'  },
  { id: 'acai-bowl',        titulo: 'Açai Bowl',             desc: 'Açai con frutas y granola',          precio: 6.5, img: '/assets/images/acai_bowl.png',          categoria: 'dulce'  },
  { id: 'banana-bread',     titulo: 'Banana Bread',          desc: 'Bizcocho de plátano tostado',        precio: 3.5, img: '/assets/images/banana_bread.png',       categoria: 'dulce'  },
  { id: 'muffin',           titulo: 'Muffin Arándanos',      desc: 'Muffin tierno con arándanos',        precio: 3.0, img: '/assets/images/muffin_blueberries.png', categoria: 'dulce'  },
];

const IVA_FIJO = 10;

const estadoInicial = {
  ticket:      [],
  categoria:   "todos",
  paso:        0,
  tipoEntrega: null,
  formulario:  {},
};

function reducer(state, action) {
  switch (action.type) {
    case "añadir": {
      const existe = state.ticket.find(item => item.id === action.payload.id);
      if (existe) {
        return {
          ...state,
          ticket: state.ticket.map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          ticket: [...state.ticket, { ...action.payload, cantidad: 1 }],
        };
      }
    }
    case "cambiarCantidad":
      return {
        ...state,
        ticket: state.ticket
          .map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + action.payload.cambio }
              : item
          )
          .filter(item => item.cantidad > 0),
      };
    case "setCategoria":
      return { ...state, categoria: action.payload };
    case "setPaso":
      return { ...state, paso: action.payload };
    case "setTipoEntrega":
      return { ...state, tipoEntrega: action.payload };
    case "setFormulario":
      return { ...state, formulario: { ...state.formulario, ...action.payload } };
    case "confirmar":
      return { ...estadoInicial, paso: 3 };
    default:
      return state;
  }
}

function Menu() {
  const [state, dispatch] = useReducer(reducer, estadoInicial);
  const subtotal = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva      = subtotal * (IVA_FIJO / 100);
  const total    = subtotal + iva;

  const resumenProps = { ticket: state.ticket, subtotal, iva, total, dispatch };

  function renderPasos() {
    switch (state.paso) {

      // ── PASO 0: CARTA ──────────────────────────────────────────
      case 0:
        return (
          <section className="menu" id="carta">
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

            <div className="menu-grid">
              {items
                .filter(item => state.categoria === "todos" || item.categoria === state.categoria)
                .map(item => (
                  <article key={item.id} className="menu-item">
                    <img src={item.img} alt={item.titulo} />
                    <div className="menu-item-info">
                      <h3>{item.titulo}</h3>
                      <p>{item.desc}</p>
                      <span className="precio">{item.precio.toFixed(2)}€</span>
                      <button
                        className="item-add-btn"
                        onClick={() => dispatch({ type: "añadir", payload: item })}
                      >
                        Añadir
                      </button>
                    </div>
                  </article>
                ))
              }
            </div>

            {state.ticket.length > 0 && (
              <ResumenTicket {...resumenProps} mostrarBotones={true} />
            )}

            <div className="menu-order-container">
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  className="menu-order-btn"
                  onClick={() => dispatch({ type: "setPaso", payload: 1 })}
                  disabled={state.ticket.length === 0}
                >
                  Ver Carrito
                </button>
                <span style={{ position: "absolute", top: "-8px", right: "-8px", background: "#b5541a", color: "#fff", borderRadius: "999px", padding: "2px 7px", fontSize: "12px", fontWeight: "700" }}>
                  {state.ticket.reduce((acc, item) => acc + item.cantidad, 0)}
                </span>
              </div>
            </div>
          </section>
        );

      // ── PASO 1: TIPO DE ENTREGA + FORMULARIO ───────────────────
      case 1:
        return (
          <section className="menu">
            <h2>Tipo de entrega</h2>
            <div style={{ display: "flex", gap: "2rem", padding: "2rem", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <ResumenTicket {...resumenProps} mostrarBotones={false} />
              </div>
              <div style={{ flex: 1 }}>
                {state.tipoEntrega === null
                  ? (
                    <div className="pedido-modal-actions">
                      <button className="btn-domicilio" onClick={() => dispatch({ type: "setTipoEntrega", payload: "domicilio" })}>A domicilio</button>
                      <button className="btn-checkout"  onClick={() => dispatch({ type: "setTipoEntrega", payload: "recoger" })}>Recogida en tienda</button>
                    </div>
                  )
                  : state.tipoEntrega === "domicilio"
                    ? <FormularioDomicilio dispatch={dispatch} />
                    : <FormularioRecoger dispatch={dispatch} />
                }
              </div>
            </div>
            <button className="btn-domicilio" onClick={() => dispatch({ type: "setPaso", payload: 0 })}>
  ← Volver a la carta
</button>
          </section>
        );

      // ── PASO 2: PAGO SIMULADO ──────────────────────────────────
      case 2:
        return (
          <section className="menu">
            <h2>Pago</h2>
            <div style={{ display: "flex", gap: "2rem", padding: "2rem", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <ResumenTicket {...resumenProps} mostrarBotones={false} />
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <PagoSimulado dispatch={dispatch} />
              </div>
            </div>
            <button className="btn-domicilio" onClick={() => dispatch({ type: "setPaso", payload: 1 })}>
  ← Volver
</button>
          </section>
        );

      // ── PASO 3: CONFIRMACIÓN ───────────────────────────────────
      case 3:
        return (
          <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <PantallaConfirmacion dispatch={dispatch} />
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