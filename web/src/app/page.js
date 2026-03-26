'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';

const FEATURES = [
  {
    icon: '🔍',
    title: 'Web Search',
    description: 'Get real-time answers from the web. Ask any question and get instant, accurate responses powered by Google Search.',
    color: '#2563eb',
  },
  {
    icon: '📅',
    title: 'Calendar Management',
    description: 'Create events, check your schedule, and manage meetings all through natural conversation.',
    color: '#7c3aed',
  },
  {
    icon: '📧',
    title: 'Email Assistant',
    description: 'Read, summarize, and reply to emails. Your AI handles Gmail so you can focus on what matters.',
    color: '#ec4899',
  },
  {
    icon: '✅',
    title: 'Task Manager',
    description: 'Create, track, and complete tasks effortlessly. Stay organized with Google Tasks integration.',
    color: '#10b981',
  },
  {
    icon: '📝',
    title: 'Smart Notes',
    description: 'Capture ideas and create documents on the fly. Your notes are safely stored in Google Docs.',
    color: '#f59e0b',
  },
  {
    icon: '💰',
    title: 'Expense Tracker',
    description: 'Log expenses, track spending, and get budget summaries. Finance management made simple.',
    color: '#06b6d4',
  },
];

const STEPS = [
  { num: '01', icon: '🚀', title: 'Sign Up', description: 'Create your account in seconds and get instant access.' },
  { num: '02', icon: '💬', title: 'Chat', description: 'Talk to your assistant naturally just like messaging a friend.' },
  { num: '03', icon: '✨', title: 'Get Things Done', description: 'Your assistant handles tasks, emails, events, and more.' },
];

const FLOATING_ICONS = [
  { emoji: '📅', top: '15%', left: '8%', size: 36, delay: 0 },
  { emoji: '📧', top: '25%', right: '10%', size: 32, delay: 0.5 },
  { emoji: '✅', top: '60%', left: '5%', size: 28, delay: 1 },
  { emoji: '💰', top: '70%', right: '7%', size: 30, delay: 1.5 },
  { emoji: '📝', top: '40%', left: '12%', size: 26, delay: 2 },
  { emoji: '🔍', top: '50%', right: '12%', size: 34, delay: 0.8 },
];

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('pa_user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="hero">
        <div className="hero__bg">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
          <div className="hero__orb hero__orb--3" />
        </div>

        {/* Floating icons */}
        {FLOATING_ICONS.map((icon, i) => (
          <div
            key={i}
            className="hero__floating-icon"
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              fontSize: `${icon.size}px`,
              animationDelay: `${icon.delay}s`,
            }}
          >
            {icon.emoji}
          </div>
        ))}

        <div className="hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            AI-Powered Productivity
          </div>
          <h1 className="hero__title">
            Your Intelligent<br />
            <span className="gradient-text">Personal Assistant</span>
          </h1>
          <p className="hero__subtitle">
            Manage your calendar, emails, tasks, notes, and expenses — all through
            natural conversation. Powered by advanced AI.
          </p>
          <div className="hero__actions">
            {isLoggedIn ? (
              <Link href="/chat" className="btn-primary btn-lg">
                <span>💬 Open Chat</span>
              </Link>
            ) : (
              <Link href="/signup" className="btn-primary btn-lg">
                <span>Get Started Free →</span>
              </Link>
            )}
            <a href="#features" className="btn-secondary btn-lg">
              Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">6+</span>
              <span className="hero__stat-label">Integrations</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">24/7</span>
              <span className="hero__stat-label">Available</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-num">AI</span>
              <span className="hero__stat-label">Powered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="features section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">✨ Capabilities</span>
            <h2 className="section-title">
              Everything You Need,<br />
              <span className="gradient-text">One Assistant</span>
            </h2>
            <p className="section-subtitle">
              Seamlessly integrated with Google services to manage every aspect of your daily productivity.
            </p>
          </div>

          <div className="features__grid">
            {FEATURES.map((feature, i) => (
              <FeatureCard
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="how-it-works section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🔄 Simple Process</span>
            <h2 className="section-title">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="section-subtitle">
              Get started in three simple steps
            </p>
          </div>

          <div className="steps">
            {STEPS.map((step, i) => (
              <div key={i} className="step" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="step__number">{step.num}</div>
                <div className="step__icon">{step.icon}</div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__description">{step.description}</p>
                {i < STEPS.length - 1 && <div className="step__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="cta section">
        <div className="container">
          <div className="cta__card glass-strong">
            <h2 className="cta__title">
              Ready to Transform Your <span className="gradient-text">Productivity?</span>
            </h2>
            <p className="cta__subtitle">
              Join and let AI handle the busywork so you can focus on what matters.
            </p>
            {isLoggedIn ? (
              <Link href="/chat" className="btn-primary btn-lg">
                <span>💬 Open Chat Now</span>
              </Link>
            ) : (
              <Link href="/signup" className="btn-primary btn-lg">
                <span>Start for Free →</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="footer__logo">🤖 Personal<span className="gradient-text">AI</span></span>
              <p className="footer__tagline">Your AI-powered personal assistant.</p>
            </div>
            <div className="footer__links">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
          </div>
          <div className="footer__bottom">
            <p>© 2026 PersonalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* ===== HERO ===== */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6rem 2rem 4rem;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          background: var(--gradient-hero);
        }

        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
        }
        .hero__orb--1 {
          width: 500px;
          height: 500px;
          background: var(--accent-purple);
          top: -10%;
          right: -5%;
          animation: pulse 8s ease-in-out infinite;
        }
        .hero__orb--2 {
          width: 400px;
          height: 400px;
          background: var(--accent-blue);
          bottom: -10%;
          left: -5%;
          animation: pulse 6s ease-in-out infinite reverse;
        }
        .hero__orb--3 {
          width: 300px;
          height: 300px;
          background: var(--accent-cyan);
          top: 40%;
          left: 50%;
          transform: translateX(-50%);
          animation: pulse 10s ease-in-out infinite;
        }

        .hero__floating-icon {
          position: absolute;
          animation: orbitFloat 5s ease-in-out infinite;
          opacity: 0.25;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        .hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
          animation: fadeInUp 0.8s ease;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .hero__badge-dot {
          width: 8px;
          height: 8px;
          background: var(--accent-green);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .hero__title {
          font-size: var(--font-size-6xl);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }

        .hero__subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 2.5rem;
        }

        .hero__actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .btn-lg {
          padding: 1rem 2.5rem !important;
          font-size: 1.05rem !important;
        }

        .hero__stats {
          display: inline-flex;
          align-items: center;
          gap: 2rem;
          padding: 1.25rem 2rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(10px);
        }

        .hero__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero__stat-num {
          font-size: 1.5rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .hero__stat-divider {
          width: 1px;
          height: 30px;
          background: var(--border-glass);
        }

        /* ===== SECTION HEADER ===== */
        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .section-tag {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: var(--font-size-4xl);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          max-width: 500px;
          margin: 0 auto;
        }

        /* ===== FEATURES ===== */
        .features {
          background: var(--bg-secondary);
        }

        .features__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* ===== HOW IT WORKS ===== */
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .step {
          position: relative;
          text-align: center;
          padding: 2rem 1.5rem;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .step__number {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-purple);
          background: rgba(124, 58, 237, 0.1);
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          margin-bottom: 1rem;
          letter-spacing: 0.05em;
        }

        .step__icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          animation: bounce 2s ease-in-out infinite;
        }

        .step__title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .step__description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .step__connector {
          display: none;
        }

        /* ===== CTA ===== */
        .cta__card {
          text-align: center;
          padding: 4rem 2rem;
          border-radius: var(--radius-xl);
          background: var(--gradient-card);
          position: relative;
          overflow: hidden;
        }

        .cta__card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--gradient-primary);
          opacity: 0.05;
        }

        .cta__title {
          font-size: var(--font-size-3xl);
          font-weight: 800;
          margin-bottom: 1rem;
          position: relative;
        }

        .cta__subtitle {
          font-size: var(--font-size-lg);
          color: var(--text-secondary);
          margin-bottom: 2rem;
          position: relative;
        }

        /* ===== FOOTER ===== */
        .footer {
          padding: 3rem 0 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .footer__inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .footer__logo {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .footer__tagline {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
        }

        .footer__links {
          display: flex;
          gap: 2rem;
        }

        .footer__links a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .footer__links a:hover {
          color: var(--text-primary);
        }

        .footer__bottom {
          text-align: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .features__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 5rem 1rem 3rem;
          }

          .hero__title {
            font-size: var(--font-size-4xl);
          }

          .hero__floating-icon {
            display: none;
          }

          .features__grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .steps {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .footer__inner {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .footer__links {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }

          .hero__stats {
            flex-direction: row;
            gap: 1.5rem;
            padding: 1rem 1.5rem;
          }

          .hero__stat-divider {
            width: 1px;
            height: 24px;
          }
        }

        @media (max-width: 480px) {
          .hero__actions {
            flex-direction: column;
            align-items: center;
          }

          .cta__card {
            padding: 3rem 1.5rem;
          }

          .hero__stats {
            gap: 1rem;
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
