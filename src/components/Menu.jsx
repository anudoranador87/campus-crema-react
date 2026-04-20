import React, { useMemo, useState } from 'react';
import './Menu.css';

const items = [
  { id: 'espresso', titulo: 'Espresso', desc: 'Café intenso y concentrado', precio: 2.5, img: '/ESPRESSO DOBLE.png', categoria: 'cafe' },
  { id: 'flat-white', titulo: 'Flat White', desc: 'Espresso con leche vaporizada', precio: 3.5, img: '/FLAT WHITE.png', categoria: 'cafe' },
  { id: 'cappuccino', titulo: 'Cappuccino', desc: 'Espresso con espuma cremosa', precio: 3.2, img: '/Capuccino.png', categoria: 'cafe' },
  { id: 'latte', titulo: 'Latte', desc: 'Café suave con leche al vapor', precio: 3.4, img: '/Latte.png', categoria: 'cafe' },
  { id: 'cortado', titulo: 'Cortado', desc: 'Espresso con un toque de leche', precio: 2.8, img: '/Cortado.png', categoria: 'cafe' },
  { id: 'salmon-cream', titulo: 'Salmon cream', desc: 'Pan artesano con Salmon y queso crema', precio: 2.5, img: '/SALMON CREAM.png', categoria: 'salado' },
  { id: 'tostada-aguacate', titulo: 'Tostada con aguacate', desc: 'Rodaja de pan cateto con aguacate', precio: 2.8, img: '/campus_crema_sourdough.png', categoria: 'salado' },
  { id: 'serrano-premium', titulo: 'Serrano Premium', desc: 'Pan con Jamon Serrano iberico', precio: 3.8, img: '/SERRANO PREMIUM.png', categoria: 'salado' },
  { id: 'croissant', titulo: 'Croissant', desc: 'Mantequilla francesa artesanal', precio: 2.8, img: '/Croissant.png', categoria: 'dulce' },
  { id: 'cookie', titulo: 'Cookie', desc: 'Chocolate negro con nueces', precio: 3.2, img: '/COOKIE LABORATORIO.png', categoria: 'dulce' },
  { id: 'cheesecake', titulo: 'Cheesecake', desc: 'Tarta de queso estilo vasco', precio: 4, img: '/CHEESECAKE ARTESANA.png', categoria: 'dulce' },
  { id: 'granola-bowl', titulo: 'Granola bowl', desc: 'Avena, frutas y miel', precio: 4.5, img: '/ENERGY BOWL.png', categoria: 'dulce' },
];
const IVA_FIJO = 10;

function Menu() {
  const [ticket, setTicket] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  function anadirAlTicket(plato) {
    setTicket((prev) => {
      const next = [...prev];
      const existe = next.find((item) => item.id === plato.id);
      if (existe) {
        existe.cantidad += 1;
      } else {
        next.push({ ...plato, cantidad: 1 });
      }
      return next;
    });
    setModalOpen(true);
  }

  function cambiarCantidad(id, delta) {
    setTicket((prev) => {
      const next = [...prev];
      const resultado = next.find((item) => item.id === id);
      if (!resultado) return prev;
      resultado.cantidad += delta;
      if (resultado.cantidad <= 0) {
        const idx = next.findIndex((item) => item.id === id);
        if (idx !== -1) next.splice(idx, 1);
      }
      return next;
    });
  }

  const { subtotal, ivaEuros, total } = useMemo(() => {
    const sub = ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const iva = sub * (IVA_FIJO / 100);
    return { subtotal: sub, ivaEuros: iva, total: sub + iva };
  }, [ticket]);

  function checkoutPedido() {
    if (ticket.length === 0) return;
    const idComanda = Date.now();
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const resumen = ticket.map((item) => `${item.cantidad}x ${item.titulo}`).join(', ');
    setHistorial((prev) => [`#${idComanda} | ${hora} | CHECKOUT | ${resumen}`, ...prev]);
    setTicket([]);
  }

  function pedirADomicilio() {
    if (ticket.length === 0) return;
    const idComanda = Date.now();
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const resumen = ticket.map((item) => `${item.cantidad}x ${item.titulo}`).join(', ');
    setHistorial((prev) => [`#${idComanda} | ${hora} | DOMICILIO | ${resumen}`, ...prev]);
    setTicket([]);
  }

  return (
    <section className="menu" id="carta">
      <h2>Nuestra Carta</h2>
  <div className="categorias">
    <button className={categoriaSeleccionada === "todos" ? "activo" : ""} onClick={() => setCategoriaSeleccionada("todos")}>Todos</button>
    <button className={categoriaSeleccionada === "cafe" ? "activo" : ""} onClick={() => setCategoriaSeleccionada("cafe")}>Cafes</button>
    <button className={categoriaSeleccionada === "salado" ? "activo" : ""} onClick={() => setCategoriaSeleccionada("salado")}>Salados</button>
    <button className={categoriaSeleccionada === "dulce" ? "activo" : ""} onClick={() => setCategoriaSeleccionada("dulce")}>Dulces</button>
</div>

      <div className="menu-grid">
{items
    .filter((item) => {
     if (categoriaSeleccionada === 'todos') return true;
      return item.categoria === categoriaSeleccionada;
      })



    .map((item, index) => (
          <article key={index} className="menu-item">
            <img src={item.img} alt={item.titulo} />
            <div className="menu-item-info">
              <h3>{item.titulo}</h3>
              <p>{item.desc}</p>
              <span className="precio">{item.precio.toFixed(2)}€</span>
              <button className="item-add-btn" type="button" onClick={() => anadirAlTicket(item)}>
                Añadir
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="menu-order-container">
        <button className="menu-order-btn" type="button" onClick={() => setModalOpen(true)}>
          Añadir pedido
        </button>
      </div>

      {modalOpen && (
        <div className="pedido-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="pedido-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pedido-close" type="button" onClick={() => setModalOpen(false)}>
              ✕
            </button>
            <h3>Tu pedido</h3>

            <div className="pedido-grid">
              <div className="pedido-carta">
                <h4>Agregar productos</h4>
                <ul>
                  {items.map((prod) => (
                    <li key={`pedido-${prod.id}`}>
                      <span>{prod.titulo}</span>
                      <button type="button" onClick={() => anadirAlTicket(prod)}>+</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pedido-ticket">
                <h4>Ticket</h4>
                {ticket.length === 0 ? (
                  <p className="ticket-vacio">Ticket vacío</p>
                ) : (
                  <ul>
                    {ticket.map((item) => (
                      <li key={`ticket-${item.id}`}>
                        <span>{item.titulo}</span>
                        <span>{item.cantidad}</span>
                        <span>{item.precio.toFixed(2)}€</span>
                        <button type="button" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                        <button type="button" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="totales">
                  <p>Subtotal: <strong>{subtotal.toFixed(2)}€</strong></p>
                  <p>IVA ({IVA_FIJO}%): <strong>{ivaEuros.toFixed(2)}€</strong></p>
                  <p>Total: <strong>{total.toFixed(2)}€</strong></p>
                </div>

              </div>
            </div>

            {historial.length > 0 && (
              <div className="historial">
                <h4>Historial de comandas</h4>
                <ul>
                  {historial.slice(0, 5).map((linea) => (
                    <li key={linea}>{linea}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pedido-modal-actions">
              <button
                className="btn-checkout"
                type="button"
                onClick={checkoutPedido}
                disabled={ticket.length === 0}
              >
                Checkout
              </button>
              <button
                className="btn-domicilio"
                type="button"
                onClick={pedirADomicilio}
                disabled={ticket.length === 0}
              >
                Pedir a domicilio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Menu;