'use client';

import { useEffect, useState } from 'react';

export default function Popup({ message, type = 'success', show, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 400);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show && !visible) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️',
  };

  const colors = {
    success: 'var(--accent-green)',
    error: 'var(--accent-red)',
    info: 'var(--accent-blue)',
    warning: 'var(--accent-orange)',
  };

  return (
    <>
      <div className={`popup ${visible ? 'popup--visible' : 'popup--hidden'}`}>
        <div className="popup__icon">{icons[type]}</div>
        <p className="popup__message">{message}</p>
        <button className="popup__close" onClick={() => { setVisible(false); setTimeout(onClose, 400); }}>✕</button>
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          top: 2rem;
          right: 2rem;
          z-index: 2000;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: rgba(15, 15, 42, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid ${colors[type]}40;
          border-left: 4px solid ${colors[type]};
          border-radius: var(--radius-md);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${colors[type]}20;
          max-width: 400px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .popup--visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .popup--hidden {
          opacity: 0;
          transform: translateX(30px) scale(0.95);
          pointer-events: none;
        }

        .popup__icon {
          font-size: 1.25rem;
          flex-shrink: 0;
          animation: popIn 0.5s ease;
        }

        .popup__message {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.4;
        }

        .popup__close {
          background: transparent;
          color: var(--text-muted);
          font-size: 0.85rem;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .popup__close:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 480px) {
          .popup {
            left: 1rem;
            right: 1rem;
            top: 1rem;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
}
