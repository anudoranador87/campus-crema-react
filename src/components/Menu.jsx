import React from 'react';
import './Menu.css';

const items = [
  { titulo: 'Espresso', desc: 'Café intenso y concentrado', precio: '2.50€', img: '/ESPRESSO DOBLE.png' },
  { titulo: 'Flat White', desc: 'Espresso con leche vaporizada', precio: '3.50€', img: '/FLAT WHITE.png' },
  { titulo: 'Croissant', desc: 'Mantequilla francesa artesanal', precio: '2.80€', img: '/Croissant.png' },
  { titulo: 'Cappuccino', desc: 'Espresso con espuma cremosa', precio: '3.20€', img: '/Capuccino.png' },
  { titulo: 'Latte', desc: 'Café suave con leche al vapor', precio: '3.40€', img: '/Latte.png' },
  { titulo: 'Cortado', desc: 'Espresso con un toque de leche', precio: '2.80€', img: '/Cortado.png' },
  { titulo: 'Salmon cream', desc: 'Pan artesano con Salmon y queso crema', precio: '2.50€', img: '/SALMON CREAM.png' },
  { titulo: 'Cookie', desc: 'Chocolate negro con nueces', precio: '3.20€', img: '/COOKIE LABORATORIO.png' },
  { titulo: 'Cheesecake', desc: 'Tarta de queso estilo vasco', precio: '4.00€', img: '/CHEESECAKE ARTESANA.png' },
  { titulo: 'Granola bowl', desc: 'Avena, frutas y miel', precio: '4.50€', img: '/ENERGY BOWL.png' },
  { titulo: 'Tostada con aguacate', desc: 'Rodaja de pan cateto con aguacate', precio: '2.80€', img: '/campus_crema_sourdough.png' },
  { titulo: 'Serrano Premium', desc: 'Pan con Jamon Serrano iberico', precio: '3.80€', img: '/SERRANO PREMIUM.png' }
];
function Menu() {
  return (
    <section className="menu">
      <h2>Nuestra Carta</h2>
      
      <div className="menu-grid">
        {items.map((item, index) => (
          <article key={index} className="menu-item">
            <img src={item.img} alt={item.titulo} />
            <div className="menu-item-info">
              <h3>{item.titulo}</h3>
              <p>{item.desc}</p>
              <span className="precio">{item.precio}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Menu;