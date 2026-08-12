export const IVA_FIJO = 10;

export const INITIAL_CART_STATE = {
  ticket: [],
  categoria: 'todos',
  paso: 0,
  tipoEntrega: null,
  formulario: {},
  ultimoPedido: null,
  descuentoCode: '',
  descuentoPorcentaje: 0,
};

export function createInitialCartState(savedCart = {}) {
  return {
    ...INITIAL_CART_STATE,
    ticket: savedCart.ticket || [],
    paso: savedCart.paso || 0,
    tipoEntrega: savedCart.tipoEntrega || null,
    formulario: savedCart.formulario || {},
    ultimoPedido: savedCart.ultimoPedido || null,
    descuentoCode: savedCart.descuentoCode || '',
    descuentoPorcentaje: savedCart.descuentoPorcentaje || 0,
  };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'añadir': {
      const existe = state.ticket.find(item => item.id === action.payload.id);

      const nuevoTicket = existe
        ? state.ticket.map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...state.ticket, { ...action.payload, cantidad: 1 }];

      return { ...state, ticket: nuevoTicket };
    }

    case 'cambiarCantidad': {
      const nuevoTicket = state.ticket
        .map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + action.payload.cambio }
            : item
        )
        .filter(item => item.cantidad > 0);

      return { ...state, ticket: nuevoTicket };
    }

    case 'setCategoria':
      return { ...state, categoria: action.payload };

    case 'setPaso':
      return { ...state, paso: action.payload };

    case 'setTipoEntrega':
      return {
        ...state,
        tipoEntrega: action.payload,
        formulario: {},
      };

    case 'setFormulario':
      return {
        ...state,
        formulario: { ...state.formulario, ...action.payload },
      };

    case 'aplicarDescuento':
      return {
        ...state,
        descuentoCode: action.payload.code,
        descuentoPorcentaje: action.payload.porcentaje,
      };

    case 'quitarDescuento':
      return {
        ...state,
        descuentoCode: '',
        descuentoPorcentaje: 0,
      };

    case 'confirmar':
      return {
        ...INITIAL_CART_STATE,
        paso: 3,
        ultimoPedido: action.payload,
      };

    case 'reiniciar':
      return { ...INITIAL_CART_STATE };

    default:
      return state;
  }
}
