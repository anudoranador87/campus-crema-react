function ReservationForm() {
  return (
    <section>
      <div className="container">
        <h3>Reserva</h3>
        <form>
          <input type="text" placeholder="Nombre" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}

export default ReservationForm;
