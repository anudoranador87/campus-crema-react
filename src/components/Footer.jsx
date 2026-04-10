import React from 'react';
import './Footer.css';

function Footer() {
  const copyAddress = () => {
    navigator.clipboard.writeText('Blvr. Louis Pasteur, 35, Málaga');
    alert('Dirección copiada');
  };

  return (
    <footer className="main-footer">
      <div className="mapa-panel">
        <h3>Encuéntranos en Teatinos</h3>
        <p>Blvr. Louis Pasteur, 35, 29010 Málaga</p>

        <div className="mapa-acciones">
          <button className="map-btn" onClick={copyAddress}>Copiar dirección</button>
          <a
            className="map-link"
            href="https://maps.google.com/?q=Blvr.+Louis+Pasteur,+35,+29010+Málaga"
            target="_blank"
            rel="noreferrer"
          >
            Google Maps
          </a>
        </div>
        
        <iframe 
          src="https://www.google.com/maps/embed?..." 
          width="100%" 
          height="200" 
          loading="lazy"
        />
      </div>

      <div className="footer-content">
        <div>
          <h4>Contacto</h4>
          <p>info@campuscrema.com</p>
          <p>+34 123 456 789</p>
        </div>
        <div>
          <h4>Horarios</h4>
          <p>Lun-Vie: 07:30-21:00</p>
          <p>Sáb-Dom: 09:00-15:00</p>
        </div>
      </div>

      <p className="footer-copy">© 2026 Campus & Crema</p>
    </footer>
  );
}

export default Footer;