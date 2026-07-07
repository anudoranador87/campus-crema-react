import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const IVA_FIJO = 10;

const estadoInicial = {
  ticket: [],
  categoria: 'todos',
  paso: 0,
  tipoEntrega: null,
  formulario: {},
  ultimoPedido: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'añadir': {
      const existe = state.ticket.find(item => item.id === action.payload.id);
      if (existe) {
        return {
          ...state,
          ticket: state.ticket.map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          ticket: [...state.ticket, { ...action.payload, cantidad: 1 }],
        };
      }
    }
    case 'cambiarCantidad':
      return {
        ...state,
        ticket: state.ticket
          .map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + action.payload.cambio }
              : item
          )
          .filter(item => item.cantidad > 0),
      };
    case 'setCategoria':
      return { ...state, categoria: action.payload };
    case 'setPaso':
      return { ...state, paso: action.payload };
    case 'setTipoEntrega':
      if (action.payload === null) {
        return { ...state, tipoEntrega: null, formulario: {} };
      }
      return { ...state, tipoEntrega: action.payload, formulario: {} };
    case 'setFormulario':
      return { ...state, formulario: { ...state.formulario, ...action.payload } };
    case 'confirmar': {
      const subtotalConfirm = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      const ivaConfirm = subtotalConfirm * (IVA_FIJO / 100);
      const totalConfirm = subtotalConfirm + ivaConfirm;
      return {
        ...estadoInicial,
        paso: 3,
        ultimoPedido: {
          ticket: [...state.ticket],
          tipoEntrega: state.tipoEntrega,
          formulario: { ...state.formulario },
          subtotal: subtotalConfirm,
          iva: ivaConfirm,
          total: totalConfirm,
        },
      };
    }
    case 'reiniciar':
      return estadoInicial;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  const subtotal = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const iva = subtotal * (IVA_FIJO / 100);
  const total = subtotal + iva;
  const cartCount = state.ticket.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, subtotal, iva, total, cartCount, IVA_FIJO }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
