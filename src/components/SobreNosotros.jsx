import React from 'react';
import './SobreNosotros.css';

function SobreNosotros() {
  return (
    <main className="sobre-page" id="nosotros">
      <section id="banner-historia">
        <div className="banner-overlay">
          <h1>De la biblioteca a la barra</h1>
          <p>Donde las ideas se tuestan y el talento se extrae gota a gota.</p>
        </div>
        <img src="/4.png" alt="Cafe y libros" />
      </section>

      <section className="laboratorio-sabor">
        <div className="contenido-laboratorio">
          <h2>Nuestra Filosofia</h2>
          <p>
            Campus & Crema no nacio en un plan de negocios, nacio en una noche de entrega final.
            Entendemos que el cafe no es solo una bebida, es el <strong>combustible</strong> necesario
            para cambiar el mundo (o al menos para aprobar ese examen de las 8:00 AM).
          </p>

          <div className="cards-laboratorio">
            <article className="card-laboratorio">
              <h3>El Origen</h3>
              <p>
                Fundado en Malaga por estudiantes que buscaban algo mas que cafe de maquina.
                Queriamo un lugar con Wi-Fi rapido, enchufes de sobra y granos con trazabilidad.
              </p>
            </article>
            <article className="card-laboratorio">
              <h3>El Compromiso</h3>
              <p>
                Trabajamos con tostadores locales. Creemos en el comercio justo y en la precision
                tecnica: cada espresso se pesa y cada leche se textura a la temperatura exacta.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="contenedor-cards">
        <article className="tarjeta-historia">
          <h2>Los Alquimistas</h2>
          <img src="/1.png" alt="Barista principal" />
          <h3>Nico - Head Barista</h3>
          <p>Capaz de hacer latte art mientras recita las leyes de la termodinamica.</p>
        </article>
        <article className="tarjeta-historia">
          <h2>La Ciencia del Sabor</h2>
          <img src="/3.png" alt="Especialista en cafe" />
          <h3>Marta - Coffee Scientist</h3>
          <p>
            Tiene un termometro en el bolsillo y un cuaderno de catas en la mochila.
            Si el agua no esta a 93C, lo sabe.
          </p>
        </article>
        <article className="tarjeta-historia">
          <h2>Gestion Creativa</h2>
          <img src="/2.png" alt="Fundadora" />
          <h3>Elena - Fundadora</h3>
          <p>
            La mente detras del concepto. Convirtio su obsesion por el cafe en un refugio
            para mentes inquietas.
          </p>
        </article>
      </section>

      <section className="origen-cafe">
        <h2>Nuestro cafe y su origen</h2>
        <p>
          Trabajamos cafes de origen con tueste local para asegurar frescura y trazabilidad
          en cada taza.
        </p>
        <div className="origen-grid">
          <article className="origen-item">
            <h3>Colombia - Huila</h3>
            <p>Notas de cacao, panela y frutos rojos. Ideal para espresso equilibrado.</p>
          </article>
          <article className="origen-item">
            <h3>Etiopia - Yirgacheffe</h3>
            <p>Perfil floral y citrico, perfecto para filtrados y experiencias aromaticas.</p>
          </article>
          <article className="origen-item">
            <h3>Brasil - Cerrado</h3>
            <p>Cuerpo cremoso con matices a nuez y chocolate. Base excelente para bebidas con leche.</p>
          </article>
        </div>
      </section>

      <section className="valores-panel">
        <h2>Nuestros valores</h2>
        <div className="valores-grid">
          <article className="valor-item">
            <h3>Calidad real</h3>
            <p>Cada receta esta calibrada para mantener consistencia de sabor durante todo el dia.</p>
          </article>
          <article className="valor-item">
            <h3>Cercania</h3>
            <p>Queremos que cada visita se sienta como tu segunda casa: cafe, estudio y comunidad.</p>
          </article>
          <article className="valor-item">
            <h3>Sostenibilidad</h3>
            <p>Priorizamos proveedores responsables y reducimos residuos con decisiones concretas.</p>
          </article>
        </div>
      </section>

      <section className="timeline-panel">
        <h2>Nuestra historia en pasos</h2>
        <ol className="timeline-list">
          <li><strong>2023:</strong> Nace la idea entre apuntes, examenes y muchas tazas de cafe.</li>
          <li><strong>2024:</strong> Definimos concepto, carta y alianzas con tostadores locales.</li>
          <li><strong>2025:</strong> Abrimos Campus & Crema en Teatinos para la comunidad universitaria.</li>
          <li><strong>2026:</strong> Lanzamos pedidos digitales y experiencias personalizadas.</li>
        </ol>
      </section>

      <section className="alergenos-panel">
        <h2>Ingredientes y alergenos</h2>
        <p>
          Disponemos de opciones de leche vegetal y alternativas adaptadas. Si tienes alergias
          o intolerancias, avisanos y te ayudamos a elegir una opcion segura para ti.
        </p>
      </section>

      <section className="resenas-panel">
        <h2>Lo que dice nuestra comunidad</h2>
        <div className="resenas-grid">
          <article className="resena-item">
            <p>"El mejor sitio para estudiar en Teatinos. Cafe top y ambiente tranquilo."</p>
            <h4>- Lucia, Ingenieria</h4>
          </article>
          <article className="resena-item">
            <p>"El flat white es increible y siempre encuentro enchufe. 10/10."</p>
            <h4>- Pablo, Arquitectura</h4>
          </article>
          <article className="resena-item">
            <p>"Me encanta el trato del equipo y la carta de brunch."</p>
            <h4>- Sara, Medicina</h4>
          </article>
        </div>
      </section>

      <section className="cta-nosotros">
        <h2>Convencido?</h2>
        <p>El cafe esta listo. La mesa, tambien.</p>
        <div className="cta-buttons">
          <a href="/#carta" className="btn-cta-primary">Ver nuestra carta</a>
          <a href="/#contacto" className="btn-cta-secondary">Reserva tu mesa</a>
        </div>
      </section>
    </main>
  );
}

export default SobreNosotros;
