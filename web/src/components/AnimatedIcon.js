'use client';

export default function AnimatedIcon({ emoji, size = 48, delay = 0, duration = 4, className = '' }) {
  return (
    <>
      <div
        className={`animated-icon ${className}`}
        style={{
          fontSize: `${size}px`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        {emoji}
      </div>

      <style jsx>{`
        .animated-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          animation: orbitFloat var(--duration, 4s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
          user-select: none;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
