import horarios from "../Data/Horarios";
import "./Horarios.css";
import { useState } from "react";

const Horarios = () => {

    const [filtro, setFiltro] = useState("todos");
  return (
    <section className="horarios-section">
      <div className="horarios-header">
        
        <p className="horarios-eyebrow">Visítanos</p>
        <h2 className="horarios-title">Horarios</h2>
      </div>
      <div className="horarios-botones">
  <div className="horarios-botones">
  <button className={filtro === "todos" ? "activo" : ""} onClick={() => setFiltro("todos")}>Todos</button>
  <button className={filtro === "semana" ? "activo" : ""} onClick={() => setFiltro("semana")}>Semana</button>
  <button className={filtro === "finde" ? "activo" : ""} onClick={() => setFiltro("finde")}>Fin de semana</button>
</div>
</div>
      <div className="horarios-grid">
        {horarios.filter((horario) => {
          if (filtro === "todos") return true;
          if (filtro === "semana") return !horario.weekend;
          if (filtro === "finde") return horario.weekend;
          return false;
        }).map((horario) => (
          <div
            key={horario.id}
            className={`horario-card ${horario.weekend ? "weekend" : ""}`}
          >
            <p className="dia">{horario.dia}</p>
            <div className="horario-divider"></div>
            <p className="horas">{horario.apertura}<br />{horario.cierre}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Horarios;