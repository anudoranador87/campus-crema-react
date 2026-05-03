import './Menu.css';
import { useReducer } from 'react';
import FormularioDomicilio from './FormularioDomicilio';
import FormularioRecoger from './FormularioRecoger';
import PagoSimulado from './PagoSimulado';
import PantallaConfirmacion from './PantallaConfirmacion';

// ─── DATOS ESTÁTICOS — fuera del componente ──────────────────────
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

const IVA_FIJO = 10; // constante fija, fuera del componente

const estadoInicial = { // va fuera del componente
  ticket:      [],
  categoria:   "todos",
  paso:        0,    // 0=carta, 1=resumen, 2=datos, 3=pago, 4=confirmación
  tipoEntrega: null, // "recoger" o "domicilio"
  formulario:  {},
};

// ─── REDUCER — fuera del componente, función pura ─────────────────
function reducer(state, action) {
  switch (action.type) {

    case "añadir": {
      const existe = state.ticket.find(item => item.id === action.payload.id); // buscamos si el item ya existe en el ticket, devuelve el item o undefined
      // tenemos que poner una condicion
      if (existe) { // si este existe, tenemos que devolver un nuevo array con la cantidad aumentada en 1, si no es el item que buscamos, lo dejamos igual
        return {
          ...state, // esto devuelve el estado actual, pero con el ticket modificado
          ticket: state.ticket.map(item => // recorre el ticket, si el item es el que buscamos, devuelve una copia del item con la cantidad aumentada en 1
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 } // si el item es el que buscamos, devuelve una copia del item con la cantidad aumentada en 1
              : item
          ),
        };
      } else {
        // devuelve nuevo array, añadimos cantidad: 1, no habia ninguno.
        return {
          ...state,
          ticket: [...state.ticket, { ...action.payload, cantidad: 1 }], // añadimos el nuevo item al ticket con cantidad 1
        };
      }
    }

    case "cambiarCantidad":
      return {
        ...state,
        ticket: state.ticket
          .map(item => // cambiamos la cantidad a la que viene en el payload
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + action.payload.cambio } // cambio es +1 o -1
              : item
          )
          .filter(item => item.cantidad > 0), // si la cantidad es 0, lo eliminamos del ticket
      };

    case "setCategoria":
      return { ...state, categoria: action.payload }; // payload es la categoria, segun la que elijamos

    case "setPaso":
      return { ...state, paso: action.payload }; // segun el paso que elijamos, se muestra una cosa u otra

    case "setTipoEntrega":
      return { ...state, tipoEntrega: action.payload };

    case "setFormulario":
      return {
        ...state,
        formulario: { ...state.formulario, ...action.payload }, // devuelve estado actual, formulario modificado con los datos del payload
      };

    case "confirmar":
      return {
        ...estadoInicial, // al confirmar, volvemos al estado inicial, vaciamos el ticket, reseteamos el formulario.
        paso: 4,
      };

    default:
      return state;
  }
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────
function Menu() { // Componente principal
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  function renderPasos() {
    switch (state.paso) {

      // ── PASO 0: CARTA ──────────────────────────────────────────
      case 0:
        return (
          <section className="menu" id="carta">
            <h2>Nuestra Carta</h2>

            {/* Filtros de categoría */}
            <div className="categorias">
              <button
                className={state.categoria === "todos"  ? "activo" : ""}
                onClick={() => dispatch({ type: "setCategoria", payload: "todos" })}
              >Todos</button>
              <button
                className={state.categoria === "cafe"   ? "activo" : ""}
                onClick={() => dispatch({ type: "setCategoria", payload: "cafe" })}
              >Café</button>
              <button
                className={state.categoria === "salado" ? "activo" : ""}
                onClick={() => dispatch({ type: "setCategoria", payload: "salado" })}
              >Salado</button>
              <button
                className={state.categoria === "dulce"  ? "activo" : ""}
                onClick={() => dispatch({ type: "setCategoria", payload: "dulce" })}
              >Dulce</button>
            </div>

            {/* Productos filtrados */}
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

      // ── PASO 1: RESUMEN DEL TICKET ─────────────────────────────
      case 1: {
        const subtotal = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        const iva      = subtotal * (IVA_FIJO / 100);
        const total    = subtotal + iva;

        return (
          <section className="menu">
            <h2>Tu Pedido</h2>
            <div className="pedido-modal">
              <div className="pedido-ticket">
                <ul>
                  {state.ticket.map(item => (
                    <li key={item.id}>
                      <span>{item.titulo}</span>
                      <span>{item.precio.toFixed(2)}€</span>
                      <button onClick={() => dispatch({ type: "cambiarCantidad", payload: { id: item.id, cambio: -1 } })}>-</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => dispatch({ type: "cambiarCantidad", payload: { id: item.id, cambio:  1 } })}>+</button>
                    </li>
                  ))}
                </ul>
                <div className="totales">
                  <p>Subtotal: <strong>{subtotal.toFixed(2)}€</strong></p>
                  <p>IVA ({IVA_FIJO}%): <strong>{iva.toFixed(2)}€</strong></p>
                  <p>Total: <strong>{total.toFixed(2)}€</strong></p>
                </div>
              </div>
              <div className="pedido-modal-actions">
                <button className="btn-domicilio" onClick={() => dispatch({ type: "setPaso", payload: 0 })}>Volver</button>
                <button className="btn-checkout"  onClick={() => dispatch({ type: "setPaso", payload: 2 })}>Continuar</button>
              </div>
            </div>
          </section>
        );
      }

      // ── PASO 2: TIPO DE ENTREGA + FORMULARIO ───────────────────
      case 2:
        return (
          <section className="menu">
            <h2>Tipo de entrega</h2>
            <div className="pedido-modal">
              {state.tipoEntrega === null
                ? ( // si tipoEntrega es null, mostramos los botones de elección
                  <div className="pedido-modal-actions">
                    <button className="btn-domicilio" onClick={() => dispatch({ type: "setTipoEntrega", payload: "domicilio" })}>A domicilio</button>
                    <button className="btn-checkout"  onClick={() => dispatch({ type: "setTipoEntrega", payload: "recoger"   })}>Recogida en tienda</button>
                  </div>
                )
                : state.tipoEntrega === "domicilio" // ternario anidado — domicilio o recoger
                  ? <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormularioDomicilio dispatch={dispatch} />
                </div>
                  : <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormularioRecoger dispatch={dispatch} />
                </div>
              }
            </div>
          </section>
        );

      // ── PASO 3: PAGO SIMULADO ──────────────────────────────────
      case 3:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PagoSimulado dispatch={dispatch} />
          </div>
        );
      
      case 4:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PantallaConfirmacion dispatch={dispatch} />
          </div>
        );


    }
  }

  return (
    <div>
      {renderPasos()}
    </div>
  );
}

export default Menu;
