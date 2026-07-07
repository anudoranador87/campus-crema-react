import React from 'react';

function LoadingSpinner() {
  return (
    <div style={containerStyle} className="loading-spinner-container">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
      <div style={spinnerStyle}></div>
      <p style={textStyle}>Cargando experiencia...</p>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem 1rem',
  minHeight: '200px',
  width: '100%',
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '4px solid rgba(197, 160, 89, 0.1)',
  borderTop: '4px solid #2d5a3f',
  borderRight: '4px solid #c5a059',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const textStyle = {
  marginTop: '1.2rem',
  fontSize: '1rem',
  fontWeight: '600',
  color: '#c5a059',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  animation: 'pulse 1.5s ease-in-out infinite',
};

export default LoadingSpinner;
