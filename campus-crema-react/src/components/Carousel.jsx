// src/components/Carousel.jsx
import { useState, useEffect } from 'react';
import './Carousel.css';

function Carousel() {
  const [indice, setIndice] = useState(0);
  
  const imagenes = [
    '/campus_crema_espacio_1.png',
    '/campus_crema_espacio_2.png',

    '/FOTO1.jpg',
    '/FOTO2.jpg',
    '/FOTO3.jpg',
    '/FOTO4.jpg',
    '/FOTO5.jpg',
    '/FOTO6.jpg'   
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  const anterior = () => {
    setIndice((prev) => prev === 0 ? imagenes.length - 1 : prev - 1);
  };

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % imagenes.length);
  };

  return (
    <div className="carousel">
      <img src={imagenes[indice]} alt="carousel" />
      <button className="prev-button" onClick={anterior}>{'<'}</button>
      <button className="next-button" onClick={siguiente}>{'>'}</button>
      <p>{indice + 1} / {imagenes.length}</p>
    </div>
  );
}

export default Carousel;