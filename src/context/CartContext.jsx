import React, { createContext, useContext, useReducer, useState, useEffect, useCallback } from 'react';
import {
  cartReducer,
  createInitialCartState,
  IVA_FIJO,
} from '../reducers/cartReducer';
import { calculateCartTotals, calculateCartCount } from '../utils/cartCalculations';
import { loadCart, saveCart } from '../utils/storage';
import { confirmOrder as persistOrder } from '../services/orderService';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    null,
    () => createInitialCartState(loadCart())
  );
  const [toasts, setToasts] = useState([]);

  // Persistir únicamente los datos necesarios para recuperar el checkout.
  useEffect(() => {
    saveCart({
      ticket: state.ticket,
      paso: state.paso,
      tipoEntrega: state.tipoEntrega,
      formulario: state.formulario,
      ultimoPedido: state.ultimoPedido,
      descuentoCode: state.descuentoCode,
      descuentoPorcentaje: state.descuentoPorcentaje,
    });
  }, [
    state.ticket,
    state.paso,
    state.tipoEntrega,
    state.formulario,
    state.ultimoPedido,
    state.descuentoCode,
    state.descuentoPorcentaje,
  ]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const totals = calculateCartTotals(
    state.ticket,
    state.descuentoPorcentaje
  );
  const cartCount = calculateCartCount(state.ticket);

  const confirmOrder = useCallback(() => {
    const order = persistOrder(state, totals);
    dispatch({ type: 'confirmar', payload: order });
    return order;
  }, [state, totals]);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        ...totals,
        cartCount,
        IVA_FIJO,
        confirmOrder,
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
