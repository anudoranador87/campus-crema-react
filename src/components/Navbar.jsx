import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      {/* Logo y título - SIEMPRE visible */}
      <div className="brand">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 10 L177.94 55 V145 L100 190 L22.06 145 V55 Z" fill="#2d5a3f" />
          <path d="M130 70 A40 40 0 1 0 130 130" fill="none" stroke="#fdf5e6" strokeWidth="12" strokeLinecap="round" />
          <path d="M110 50 L90 100 L115 100 L95 150" fill="none" stroke="#fdf5e6" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M95 25 Q100 15 105 25" fill="none" stroke="#fdf5e6" strokeWidth="3" strokeLinecap="round" />
        </svg>

        <div className="titulo">
          <h1>Campus & Crema</h1>
          <h2>Café de especialidad en el corazón universitario</h2>
        </div>
      </div>

      {/* Navegación - FUERA del logo-container */}
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`} aria-label="Navegación principal">
        <a href="#espacio" onClick={() => setIsMenuOpen(false)}>Inicio</a> 
        <a href="carta.html" onClick={() => setIsMenuOpen(false)}>Carta</a>
        <a href="nosotros.html" onClick={() => setIsMenuOpen(false)}>NOSOTROS</a>
        <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
      </nav>

      {/* Botón hamburguesa */}
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
        <span style={{ display: isMenuOpen ? 'none' : 'inline' }}>☰</span>
        <span style={{ display: isMenuOpen ? 'inline' : 'none' }}>✕</span>
      </button>
    </header>
  );
}

export default Navbar;