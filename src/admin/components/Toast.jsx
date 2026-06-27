import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: { border: '1px solid rgba(34,197,94,0.5)', background: 'rgba(34,197,94,0.1)', color: '#4ade80' },
    error: { border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.1)', color: '#f87171' },
    info: { border: '1px solid rgba(145,94,255,0.5)', background: 'rgba(145,94,255,0.1)', color: '#915eff' },
  };

  return (
    <div
      className="fixed z-[9999] flex items-center rounded-xl backdrop-blur-md shadow-2xl"
      style={{
        bottom: '1.5rem', right: '1.5rem',
        padding: '0.75rem 1.25rem',
        gap: '0.75rem',
        ...styles[type],
      }}
    >
      <span style={{ fontSize: '1.125rem' }}>{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 cursor-pointer" style={{ marginLeft: '0.5rem' }}>×</button>
    </div>
  );
};

export default Toast;
