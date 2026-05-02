
import './Menu.css';
import { useReducer } from 'react';

const items = [  //componente fijo, fuera del componente
  { id: 'espresso', titulo: 'Espresso', desc: 'Café intenso y concentrado', precio: 2.5, img: '/assets/images/ESPRESSO DOBLE.png', categoria: 'cafe' },
  { id: 'flat-white', titulo: 'Flat White', desc: 'Espresso con leche vaporizada', precio: 3.5, img: '/assets/images/FLAT WHITE.png', categoria: 'cafe' },
  { id: 'cappuccino', titulo: 'Cappuccino', desc: 'Espresso con espuma cremosa', precio: 3.2, img: '/assets/images/Capuccino.png', categoria: 'cafe' },
  { id: 'latte', titulo: 'Latte', desc: 'Café suave con leche al vapor', precio: 3.4, img: '/assets/images/Latte.png', categoria: 'cafe' },
  { id: 'cortado', titulo: 'Cortado', desc: 'Espresso con un toque de leche', precio: 2.8, img: '/assets/images/Cortado.png', categoria: 'cafe' },
  { id: 'salmon-cream', titulo: 'Salmon cream', desc: 'Pan artesano con Salmon y queso crema', precio: 2.5, img: '/assets/images/SALMON CREAM.png', categoria: 'salado' },
  { id: 'tostada-aguacate', titulo: 'Tostada con aguacate', desc: 'Rodaja de pan cateto con aguacate', precio: 2.8, img: '/assets/images/TOASTES SOURDOUGH.png', categoria: 'salado' },
  { id: 'serrano-premium', titulo: 'Serrano Premium', desc: 'Pan con Jamon Serrano iberico', precio: 3.8, img: '/assets/images/serrano.png', categoria: 'salado' },
  { id: 'croissant', titulo: 'Croissant', desc: 'Mantequilla francesa artesanal', precio: 2.8, img: '/assets/images/Croissant.png', categoria: 'dulce' },
  { id: 'cookie', titulo: 'Cookie', desc: 'Chocolate negro con nueces', precio: 3.2, img: '/assets/images/COOKIE LABORATORIO.png', categoria: 'dulce' },
  { id: 'cheesecake', titulo: 'Cheesecake', desc: 'Tarta de queso estilo vasco', precio: 4, img: '/assets/images/cheesecake.png', categoria: 'dulce' },
  { id: 'granola-bowl', titulo: 'Granola bowl', desc: 'Avena, frutas y miel', precio: 4.5, img: '/assets/images/ENERGY BOWL.png', categoria: 'dulce' },
];

 
const estadoInicial = {   // va fuera del componente
  ticket: [],
  categoria: "todos",
  paso: 0,          // 0=carta, 1=resumen, 2=datos, 3=confirmación
  tipoEntrega: null, // "recoger" o "domicilio"
  formulario: {}
}
  const IVA_FIJO = 10; // componente fijo, fuera del componente

function Menu() {   //Componente principal
  const [state, dispatch] = useReducer(reducer, estadoInicial)

  function renderPasos(){
           switch(state.paso) {
            case 0: 
            return (
  <div>
    <button onClick={()=> dispatch({ type: "setCategoria", payload: "todos" })}>Todos</button>
    <button onClick={()=> dispatch({ type: "setCategoria", payload: "cafe" })}>Café</button>
    <button onClick={()=> dispatch({ type: "setCategoria", payload: "salado" })}>Salado</button>
    <button onClick={()=> dispatch({ type: "setCategoria", payload: "dulce" })}>Dulce</button>
    {items.filter(item => state.categoria === "todos" || item.categoria === state.categoria).map(item => (
      <div key={item.id}>
        <h3>{item.titulo}</h3>
        <img src={item.img} alt={item.titulo} />
        <p>{item.desc}</p>
        <p>{item.precio}€</p>
        <button onClick={() => dispatch({ type: "añadir", payload: item })}>
          Añadir
        </button>
      </div>
    ))}
    <button onClick={() => dispatch({ type: "setPaso", payload: 1 })} disabled={state.ticket.length === 0}> // si esta vacio, no puedes avanzar
      Ver Resumen
    </button>
  </div>
)

            case 1: return <Resumen />
            case 2: return <Formulario />
            case 3: return <Confirmacion />
  }

  }

  
  return ( // mostrara los pasos de 0 al 3
<div>
  {renderPasos}


</div>

  )




}

export default Menu;




//la funcion reducer, fuera del componente, y tiene varios casos


function reducer(state, action) {
    switch(action.type) {
    case "añadir":
      
        const existe = state.ticket.find(item => item.id === action.payload.id ) //buscamos si el item ya existe en el ticket, devuelve el item o undefined
              //tenemos que poner una condicion
          if (existe) { // si este existe, tenemos que devolver un nuevo array con la cantidad aumentada en 1, si no es el item que buscamos, lo dejamos igual
            return {
             ...state, // esto devuelve el estado actual, pero con el ticket modificado
               ticket: state.ticket.map(item =>  // recorre el ticket, si el item es el que buscamos, devuelve una copia del item con la cantidad aumentada en 1, si no es el item que buscamos, lo dejamos igual
               item.id === action.payload.id //
                ? { ...item, cantidad: item.cantidad + 1 } // si el item es el que buscamos, devuelve una copia del item con la cantidad aumentada en 1
               : item
             )
          }
      } else {
   // devuelvenuevo array, añadimos cantidad : 1, no habia ninguno.
      return { ...state, ticket: [...state.ticket, { ...action.payload, cantidad: 1 }] } // esto devuelve el estado actual, pero con el ticket modificado, añadimos el nuevo item al ticket, con cantidad 1
      }
      




    case "cambiarCantidad":
      return {
        ...state,
        ticket: state.ticket.map(item => // muy parecido al caso anterior, pero cambiamos la cantidad a la que viene en el payload, no sumamos 1
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + action.payload.cambio } // ¿porque cambio? porque el payload tiene que decir si queremos sumar o restar, si queremos sumar 1, el cambio es +1, si queremos restar 1, el cambio es -1
            : item
        )
           .filter(item => item.cantidad > 0)// si la cantidad es 0, no lo mostramos en el ticket, por eso filtramos los items que tienen cantidad mayor a 0
      }
   
    case "setCategoria":
      return{
        ...state, categoria: action.payload } // payload es la categoria , segun la que elijamos  
      
    case "setPaso":
      return {  
      ...state, paso: action.payload }// igual que setCageroria, pero para el paso, segun el paso que elijamos, se muestra una cosa u otra en el componente principal
    case "setTipoEntrega":
     return{
       ...state, tipoEntrega: action.payload    
     }

    case "setFormulario":
      return{
     ...state, formulario: { ...state.formulario, ...action.payload }  //?porque? , devuelve estado actual, formulario modificado, con los datos que vienen en el payload
      }

    case "confirmar":
      return{
        ...estadoInicial, // al confirmar, volvemos al estado inicial, vaciamos el ticket, reseteamos el formulario.
         paso: 3  // esta sera la ultima pantalla, de confirmacion de todo OK

      }
    
    default:
      return state;
  }




}
