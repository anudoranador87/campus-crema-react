import './Menu.css';
import { useEffect, useReducer, useRef } from 'react';
import FormularioDomicilio from './FormularioDomicilio';
import FormularioRecoger from './FormularioRecoger';
import PagoSimulado from './PagoSimulado';
import PantallaConfirmacion from './PantallaConfirmacion';
import ResumenTicket from './ResumenTicket';
import TextExpander from './TextExpander';

const items = [
  { id: 'espresso',         titulo: 'Espresso',             desc: 'Café intenso y concentrado, extraído a alta presión durante 25 segundos. Origen etíope de tueste oscuro con notas de chocolate negro, frutos secos y un regusto largo y persistente.',                                                                          precio: 2.5, img: '/assets/images/ESPRESSO DOBLE.png',     categoria: 'cafe'   },
  { id: 'flat-white',       titulo: 'Flat White',           desc: 'Doble espresso cubierto con leche vaporizada de textura sedosa y microespuma fina. Más intenso que un latte, perfecto para quienes buscan el equilibrio entre café y leche.',                                                                                     precio: 3.5, img: '/assets/images/FLAT WHITE.png',         categoria: 'cafe'   },
  { id: 'cappuccino',       titulo: 'Cappuccino',           desc: 'Espresso clásico con partes iguales de leche vaporizada y espuma cremosa. Elaborado con leche entera para conseguir esa textura aterciopelada característica.',                                                                                                    precio: 3.2, img: '/assets/images/Capuccino.png',          categoria: 'cafe'   },
  { id: 'latte',            titulo: 'Latte',                desc: 'Café suave con una gran proporción de leche al vapor y una fina capa de microespuma. Ideal para empezar el día con calma, con notas dulces y un perfil muy equilibrado.',                                                                                         precio: 3.4, img: '/assets/images/Latte.png',              categoria: 'cafe'   },
  { id: 'cortado',          titulo: 'Cortado',              desc: 'Espresso corto equilibrado con un pequeño toque de leche vaporizada que suaviza la acidez sin perder la intensidad del café. El favorito de los puristas.',                                                                                                       precio: 2.8, img: '/assets/images/Cortado.png',            categoria: 'cafe'   },
  { id: 'iced-latte',       titulo: 'Iced Latte',           desc: 'Doble espresso vertido sobre hielo con leche fría. Refrescante y equilibrado, perfecto para los días de calor en Málaga. Se sirve en vaso alto con pajita.',                                                                                                     precio: 3.8, img: '/assets/images/iced_latte.png',         categoria: 'cafe'   },
  { id: 'matcha-latte',     titulo: 'Matcha Latte',         desc: 'Té matcha ceremonial japonés de primera calidad batido con leche cremosa vaporizada. Sabor terroso, ligeramente dulce y con un color verde vibrante. Sin cafeína añadida.',                                                                                      precio: 4.2, img: '/assets/images/matcha_latte.png',       categoria: 'cafe'   },
  { id: 'chai-latte',       titulo: 'Chai Latte',           desc: 'Mezcla aromática de especias — canela, cardamomo, jengibre y clavo — infusionada con té negro y leche vaporizada. Cálido, especiado y reconfortante en cualquier momento del día.',                                                                              precio: 4.0, img: '/assets/images/chai_latte.png',         categoria: 'cafe'   },
  { id: 'salmon-cream',     titulo: 'Salmon cream',         desc: 'Pan artesano de masa madre tostado con queso crema, salmón ahumado noruego, alcaparras y eneldo fresco. Un clásico que nunca falla para el desayuno o el brunch del fin de semana.',                                                                             precio: 2.5, img: '/assets/images/SALMON CREAM.png',       categoria: 'salado' },
  { id: 'tostada-aguacate', titulo: 'Tostada con aguacate', desc: 'Rodaja generosa de pan cateto tostado con aguacate maduro aplastado, aceite de oliva virgen extra, sal en escamas y un toque de limón. Simple, fresco y lleno de energía.',                                                                                      precio: 2.8, img: '/assets/images/TOASTES SOURDOUGH.png',  categoria: 'salado' },
  { id: 'serrano-premium',  titulo: 'Serrano Premium',      desc: 'Pan de masa madre con jamón serrano ibérico de bellota loncheado al momento, tomate natural rallado y un hilo de aceite de oliva virgen extra de Jaén. Sabor auténtico del sur.',                                                                               precio: 3.8, img: '/assets/images/serrano.png',            categoria: 'salado' },
  { id: 'bagel-pavo',       titulo: 'Bagel de Pavo',        desc: 'Bagel tostado con pavo ahumado, queso crema de hierbas, lechuga, tomate y mostaza antigua. Contundente y equilibrado, ideal para un almuerzo ligero sin renunciar al sabor.',                                                                                    precio: 4.5, img: '/assets/images/bagel_pavo.png',         categoria: 'salado' },
  { id: 'hummus-bowl',      titulo: 'Hummus Bowl',          desc: 'Hummus casero de garbanzos con tahini, limón y comino, acompañado de crudités de temporada, pimentón ahumado y pan de pita tostado. Fresco, nutritivo y completamente vegano.',                                                                                  precio: 5.2, img: '/assets/images/hummus_bowl.png',        categoria: 'salado' },
  { id: 'focaccia',         titulo: 'Focaccia',             desc: 'Focaccia artesana de tomate cherry, mozzarella fresca y albahaca. Horneada cada mañana en el local con masa de fermentación lenta de 24 horas. Crujiente por fuera y esponjosa por dentro.',                                                                    precio: 4.8, img: '/assets/images/focaccia.png',           categoria: 'salado' },
  { id: 'croissant',        titulo: 'Croissant',            desc: 'Croissant de mantequilla francesa elaborado con técnica de hojaldrado tradicional. Crujiente por fuera, tierno y laminado por dentro. Se hornea fresco cada mañana desde las 7h.',                                                                              precio: 2.8, img: '/assets/images/Croissant.png',          categoria: 'dulce'  },
  { id: 'cookie',           titulo: 'Cookie',               desc: 'Cookie artesana de chocolate negro 70% con nueces tostadas y un toque de sal marina. Crujiente en los bordes y con el centro ligeramente tierno. Receta propia de Campus & Crema.',                                                                             precio: 3.2, img: '/assets/images/COOKIE LABORATORIO.png', categoria: 'dulce'  },
  { id: 'cheesecake',       titulo: 'Cheesecake',           desc: 'Tarta de queso estilo vasco con base cremosa y exterior caramelizado. Elaborada con queso Philadelphia y nata fresca, sin base de galleta. Textura que se deshace en la boca.',                                                                                  precio: 4.0, img: '/assets/images/cheesecake.png',         categoria: 'dulce'  },
  { id: 'granola-bowl',     titulo: 'Granola bowl',         desc: 'Avena tostada con miel, frutas frescas de temporada, semillas de chía y yogur griego cremoso. Un desayuno completo y nutritivo que te da energía para toda la mañana.',                                                                                         precio: 4.5, img: '/assets/images/ENERGY BOWL.png',        categoria: 'dulce'  },
  { id: 'acai-bowl',        titulo: 'Açai Bowl',            desc: 'Base de açai orgánico congelado con leche de coco, cubierto de granola crujiente, plátano, fresas, arándanos y un hilo de miel. Antioxidante, energético y visualmente espectacular.',                                                                          precio: 6.5, img: '/assets/images/acai_bowl.png',          categoria: 'dulce'  },
  { id: 'banana-bread',     titulo: 'Banana Bread',         desc: 'Bizcocho húmedo de plátano maduro tostado al momento, con nueces pecanas y canela. Receta casera sin conservantes. Se sirve templado con un toque de mantequilla si lo deseas.',                                                                                 precio: 3.5, img: '/assets/images/banana_bread.png',       categoria: 'dulce'  },
  { id: 'muffin',           titulo: 'Muffin Arándanos',     desc: 'Muffin tierno y esponjoso repleto de arándanos frescos con un toque de vainilla natural. Horneado diariamente en el local. La merienda perfecta acompañado de un café.',                                                                                        precio: 3.0, img: '/assets/images/muffin_blueberries.png', categoria: 'dulce'  },
];

const IVA_FIJO = 10;

const estadoInicial = {
  ticket:       [],
  categoria:    'todos',
  paso:         0,
  tipoEntrega:  null,
  formulario:   {},
  ultimoPedido: null,
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
    case 'setTipoEntrega':
      if (action.payload === null) {
        return { ...state, tipoEntrega: null, formulario: {} };
      }
      return { ...state, tipoEntrega: action.payload, formulario: {} };
    case "setFormulario":
      return { ...state, formulario: { ...state.formulario, ...action.payload } };
    case 'confirmar': {
      const subtotalConfirm = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      const ivaConfirm = subtotalConfirm * (IVA_FIJO / 100);
      const totalConfirm = subtotalConfirm + ivaConfirm;
      return {
        ...estadoInicial,
        paso: 3,
        ultimoPedido: {
          ticket: [...state.ticket],
          tipoEntrega: state.tipoEntrega,
          formulario: { ...state.formulario },
          subtotal: subtotalConfirm,
          iva: ivaConfirm,
          total: totalConfirm,
        },
      };
    }
    default:
      return state;
  }
}

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
  const [state, dispatch] = useReducer(reducer, estadoInicial);
  const sectionRef = useRef(null);

  const subtotal = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = subtotal * (IVA_FIJO / 100);
  const total = subtotal + iva;

  const resumenProps = {
    ticket: state.ticket,
    subtotal,
    iva,
    total,
    dispatch,
    allowCollapse: state.paso === 0,
  };

  const cartCount = state.ticket.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [state.paso]);

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

            <div className="menu-grid">
              {items
                .filter(item => state.categoria === "todos" || item.categoria === state.categoria)
                .map(item => (
                  
                  <article key={item.id} className="menu-item">
                    <img src={item.img} alt={item.titulo} />
                    <div className="menu-item-info">
                      <h3>{item.titulo}</h3>
                      <TextExpander collapsedNumWords={8}>
                              {item.desc}
                              ;
                        </TextExpander>

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
              <ResumenTicket {...resumenProps} mostrarBotones={false} />
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
                  <span className="menu-cart-badge" aria-hidden>
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