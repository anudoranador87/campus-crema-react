import React from 'react';
import { useCart } from '../hooks/useCart';
import './Toast.css';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-card--${toast.type}`}>
          <span className="toast-icon" aria-hidden="true">
            {toast.type === 'success' ? '☕' : toast.type === 'error' ? '❌' : '✨'}
          </span>
          <div className="toast-message">{toast.message}</div>
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => removeToast(toast.id)}
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
