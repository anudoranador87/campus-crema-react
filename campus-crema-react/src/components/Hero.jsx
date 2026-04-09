import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <>
      {/* Ancla para navegación */}
      <section id="espacio"></section>
      
      {/* Banner principal */}
      <section id="banner">
        <picture className="banner-picture">
          <source srcSet="/banner-campus.avif" type="image/avif" />
          <source srcSet="/banner-campus.png" type="image/png" />
          <img className="banner-image" src="/banner-campus.png" alt="Banner de Campus & Crema" />
        </picture>
        <div className="banner-overlay">
          <h1>Bienvenido a Campus & Crema</h1>
          <p>El café que potencia tu creatividad y concentración</p>
          
          <div className="hero-cta">
            <a href="carta.html" className="btn-cta-primary">Ver carta</a>
            <a href="#contacto" className="btn-cta-secondary">Reservar mesa</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;