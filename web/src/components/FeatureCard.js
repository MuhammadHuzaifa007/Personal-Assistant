'use client';

export default function FeatureCard({ icon, title, description, color, delay = 0 }) {
  return (
    <>
      <div
        className="feature-card"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="feature-card__icon-wrapper" style={{ background: `${color}15` }}>
          <span className="feature-card__icon">{icon}</span>
        </div>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__description">{description}</p>
        <div className="feature-card__glow" style={{ background: color }} />
      </div>

      <style jsx>{`
        .feature-card {
          position: relative;
          padding: 2rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          transition: all var(--transition-slow);
          overflow: hidden;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: var(--bg-card-hover);
          border-color: ${color}40;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${color}15;
        }

        .feature-card__icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          transition: transform var(--transition-spring);
        }

        .feature-card:hover .feature-card__icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-card__icon {
          font-size: 1.5rem;
        }

        .feature-card__title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .feature-card__description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .feature-card__glow {
          position: absolute;
          bottom: -50%;
          left: 50%;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0;
          transition: opacity var(--transition-slow);
          pointer-events: none;
          transform: translateX(-50%);
        }

        .feature-card:hover .feature-card__glow {
          opacity: 0.15;
        }
      `}</style>
    </>
  );
}
