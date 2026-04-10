import React, { useState } from 'react';
import './reservationForm.css';

function ReservationForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    fecha: '',
    personas: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reserva:', formData);
    // Aquí iría el envío a servidor
  };

  return (
    <section className="reserva">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Reserva tu mesa</h2>
        
        <label>Nombre:</label>
        <input 
          type="text" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
          required 
        />

        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Fecha:</label>
        <input 
          type="date" 
          name="fecha" 
          value={formData.fecha} 
          onChange={handleChange} 
          required 
        />

        <label>Personas:</label>
        <input 
          type="number" 
          name="personas" 
          min="1" 
          max="10" 
          value={formData.personas} 
          onChange={handleChange} 
        />

        <button type="submit">Reservar</button>
      </form>
    </section>
  );
}

export default ReservationForm;