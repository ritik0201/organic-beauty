import React from 'react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast-container ${toast.type || 'info'}`}>
      <div className="toast-content">
        <span className="toast-icon">
          {toast.type === 'success' ? '✓' : toast.type === 'error' ? '!' : '✦'}
        </span>
        <div className="toast-text">
          <strong>{toast.title}</strong>
          {toast.message && <p>{toast.message}</p>}
        </div>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">×</button>
    </div>
  );
}
