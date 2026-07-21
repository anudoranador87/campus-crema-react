import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

const CartContext = createContext();

const IVA_FIJO = 10;

const getEstadoInicial = () => {
  try {
    const savedCart = localStorage.getItem('cc_cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      return {
        ticket: parsed.ticket || [],
        categoria: 'todos',
        paso: parsed.paso || 0,
        tipoEntrega: parsed.tipoEntrega || null,
        formulario: parsed.formulario || {},
        ultimoPedido: parsed.ultimoPedido || null,
        descuentoCode: parsed.descuentoCode || '',
        descuentoPorcentaje: parsed.descuentoPorcentaje || 0,
      };
    }
  } catch (e) {
    console.error('Error cargando carrito de localStorage', e);
  }
  return {
    ticket: [],
    categoria: 'todos',
    paso: 0,
    tipoEntrega: null,
    formulario: {},
    ultimoPedido: null,
    descuentoCode: '',
    descuentoPorcentaje: 0,
  };
};

function reducer(state, action) {
  switch (action.type) {
    case 'añadir': {
      const existe = state.ticket.find(item => item.id === action.payload.id);
      let nuevoTicket;
      if (existe) {
        nuevoTicket = state.ticket.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        nuevoTicket = [...state.ticket, { ...action.payload, cantidad: 1 }];
      }
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
      if (action.payload === null) {
        return { ...state, tipoEntrega: null, formulario: {} };
      }
      return { ...state, tipoEntrega: action.payload, formulario: {} };
    case 'setFormulario':
      return { ...state, formulario: { ...state.formulario, ...action.payload } };
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
    case 'confirmar': {
      const subtotalConfirm = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      const descuentoConfirm = subtotalConfirm * (state.descuentoPorcentaje / 100);
      const subtotalConDescuento = subtotalConfirm - descuentoConfirm;
      const ivaConfirm = subtotalConDescuento * (IVA_FIJO / 100);
      const totalConfirm = subtotalConDescuento + ivaConfirm;
      
      const nuevoPedido = {
        id: 'CC-' + Math.floor(100000 + Math.random() * 900000),
        fecha: new Date().toISOString(),
        ticket: [...state.ticket],
        tipoEntrega: state.tipoEntrega,
        formulario: { ...state.formulario },
        subtotal: subtotalConfirm,
        descuentoCode: state.descuentoCode,
        descuentoPorcentaje: state.descuentoPorcentaje,
        descuentoImporte: descuentoConfirm,
        iva: ivaConfirm,
        total: totalConfirm,
        estado: 'recibido', // recibido -> preparando -> en reparto/listo -> entregado
      };

      try {
        const historial = JSON.parse(localStorage.getItem('cc_orders') || '[]');
        historial.unshift(nuevoPedido);
        localStorage.setItem('cc_orders', JSON.stringify(historial));
      } catch (e) {
        console.error('Error guardando en historial', e);
      }

      return {
        ticket: [],
        categoria: 'todos',
        paso: 3,
        tipoEntrega: null,
        formulario: {},
        descuentoCode: '',
        descuentoPorcentaje: 0,
        ultimoPedido: nuevoPedido,
      };
    }
    case 'reiniciar':
      return {
        ticket: [],
        categoria: 'todos',
        paso: 0,
        tipoEntrega: null,
        formulario: {},
        descuentoCode: '',
        descuentoPorcentaje: 0,
        ultimoPedido: null,
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getEstadoInicial);
  const [toasts, setToasts] = useState([]);

  // Guardar en localStorage cuando cambien los datos clave del carrito
  useEffect(() => {
    localStorage.setItem(
      'cc_cart',
      JSON.stringify({
        ticket: state.ticket,
        paso: state.paso,
        tipoEntrega: state.tipoEntrega,
        formulario: state.formulario,
        ultimoPedido: state.ultimoPedido,
        descuentoCode: state.descuentoCode,
        descuentoPorcentaje: state.descuentoPorcentaje,
      })
    );
  }, [
    state.ticket,
    state.paso,
    state.tipoEntrega,
    state.formulario,
    state.ultimoPedido,
    state.descuentoCode,
    state.descuentoPorcentaje,
  ]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const subtotal = state.ticket.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const descuentoImporte = subtotal * ((state.descuentoPorcentaje || 0) / 100);
  const subtotalConDescuento = subtotal - descuentoImporte;
  const iva = subtotalConDescuento * (IVA_FIJO / 100);
  const total = subtotalConDescuento + iva;
  const cartCount = state.ticket.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        subtotal,
        descuentoImporte,
        subtotalConDescuento,
        iva,
        total,
        cartCount,
        IVA_FIJO,
        toasts,
        addToast,
        removeToast,
      }}
    >
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
