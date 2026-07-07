import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartCount, dispatch } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    setIsMenuOpen(false);
    dispatch({ type: 'setPaso', payload: 1 });
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
      <nav id="main-nav" className={`nav ${isMenuOpen ? 'active' : ''}`} aria-label="Navegación principal">
        <Link to="/" onClick={() => { setIsMenuOpen(false); dispatch({ type: 'setPaso', payload: 0 }); }}>Inicio</Link>
        <a href="/#carta" onClick={() => { setIsMenuOpen(false); dispatch({ type: 'setPaso', payload: 0 }); }}>Carta</a>
        <Link to="/nosotros" onClick={() => setIsMenuOpen(false)}>NOSOTROS</Link>
        <a href="/#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
      </nav>

      {/* Acciones de la barra de navegación (Modo oscuro y carrito) */}
      <div className="navbar-actions">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle-btn" 
          aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <a 
          href="/#carta" 
          onClick={handleCartClick}
          className="navbar-cart-btn"
          aria-label={`Ver carrito, ${cartCount} artículos`}
        >
          🛒
          {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
        </a>
      </div>

      {/* Botón hamburguesa */}
      <button 
        className="hamburger" 
        onClick={toggleMenu} 
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="main-nav"
      >
        <span style={{ display: isMenuOpen ? 'none' : 'inline' }}>☰</span>
        <span style={{ display: isMenuOpen ? 'inline' : 'none' }}>✕</span>
      </button>
    </header>
  );
}

export default Navbar;