import React, { useState } from 'react';
import './reservationForm.css';

function ReservationForm() {
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: 1,
    ocasion: 'ninguna',
    comentarios: ''
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
    <section className="reserva" id="contacto">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Reserva tu mesa</h2>
        <p className="reserva-subtitle">Elige fecha, hora y cuántas personas vendrán.</p>
        
        <label htmlFor="nombre">Nombre completo</label>
        <input 
          id="nombre"
          type="text" 
          name="nombre" 
          value={formData.nombre} 
          onChange={handleChange} 
          required 
          placeholder="Ej. Jose Manuel"
        />

        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          placeholder="correo@ejemplo.com"
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="+34 600 123 456"
          required
        />

        <div className="form-row">
          <div>
            <label htmlFor="fecha">Fecha</label>
            <input 
              id="fecha"
              type="date" 
              name="fecha" 
              value={formData.fecha} 
              onChange={handleChange}
              min={today}
              required 
            />
          </div>
          <div>
            <label htmlFor="hora">Hora</label>
            <input
              id="hora"
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label htmlFor="personas">Personas</label>
        <input 
          id="personas"
          type="number" 
          name="personas" 
          min="1" 
          max="12" 
          value={formData.personas} 
          onChange={handleChange}
          required
        />

        <label htmlFor="ocasion">Ocasión (opcional)</label>
        <select id="ocasion" name="ocasion" value={formData.ocasion} onChange={handleChange}>
          <option value="ninguna">Ninguna</option>
          <option value="cumpleanos">Cumpleaños</option>
          <option value="reunion">Reunión</option>
          <option value="aniversario">Aniversario</option>
        </select>

        <label htmlFor="comentarios">Comentarios (opcional)</label>
        <textarea
          id="comentarios"
          name="comentarios"
          rows="4"
          value={formData.comentarios}
          onChange={handleChange}
          placeholder="Alergias, mesa exterior, preferencias, etc."
        />

        <button type="submit">Solicitar reserva</button>
      </form>
    </section>
  );
}

export default ReservationForm;