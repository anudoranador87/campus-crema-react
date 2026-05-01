import{useReducer} from"react"
import './SobreNosotros.css';

const estadoInicial = { abierto: null };
const faqs = [
  { id: 1, pregunta: "¿A qué hora abrís?", respuesta: "Abrimos de lunes a viernes de 7:30 a 20:00 y los fines de semana de 9:00 a 14:00." },
  { id: 2, pregunta: "¿Tenéis opciones sin gluten?", respuesta: "Sí, disponemos de bollería y opciones de desayuno sin gluten bajo petición." },
  { id: 3, pregunta: "¿Hacéis pedidos para llevar?", respuesta: "Sí, puedes pedir en mostrador y te lo preparamos en menos de 5 minutos." },
  { id: 4, pregunta: "¿Qué tipo de café usáis?", respuesta: "Trabajamos con granos de origen único tostados artesanalmente en Málaga." },
  { id: 5, pregunta: "¿Tenéis wifi?", respuesta: "Sí, wifi gratuito para todos nuestros clientes. Pide la contraseña en caja." }
];

function TextComponent() {

const[state,  dispatch] = useReducer(reducer, estadoInicial)  //estado inicial sera null



return (
  <section className="faq">
    <h2>Preguntas frecuentes</h2>
    <div className="faq-lista">
      {faqs.map((faq) => (
        <div key={faq.id} className="faq-item">
          <button
            className="faq-pregunta"
            onClick={() =>
              state.abierto === faq.id
                ? dispatch({ type: "cerrado" })
                : dispatch({ type: "abierto", payload: faq.id })
            }
          >
            {faq.pregunta}
            <span className={`faq-icono ${state.abierto === faq.id ? "abierto" : ""}`}>+</span>
          </button>
          {state.abierto === faq.id && (
            <p className="faq-respuesta">{faq.respuesta}</p>
          )}
        </div>
      ))}
    </div>
  </section>
);
}

//escribo la funcion completa

 function reducer(state, action){
      switch(action.type){
        case "abierto":
	  return { abierto: action.payload }  // guarda el id
       case "cerrado":
  	  return { abierto: null }
     default:
	return state
 
}

}

export default TextComponent;
