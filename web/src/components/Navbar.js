'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const user = localStorage.getItem('pa_user');
    setIsLoggedIn(!!user);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('pa_user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  // Hide navbar on chat page
  if (pathname === '/chat') return null;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo">
            <span className="navbar__logo-icon">🤖</span>
            <span className="navbar__logo-text">
              Personal<span className="gradient-text">AI</span>
            </span>
          </Link>

          <div className="navbar__links">
            <Link href="/" className={`navbar__link ${pathname === '/' ? 'navbar__link--active' : ''}`}>
              Home
            </Link>
            <a href="/#features" className="navbar__link">Features</a>
            <a href="/#how-it-works" className="navbar__link">How It Works</a>
            {isLoggedIn ? (
              <>
                <Link href="/chat" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  <span>💬 Open Chat</span>
                </Link>
                <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.6rem 1.25rem' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className={`navbar__link ${pathname === '/login' ? 'navbar__link--active' : ''}`}>
                  Login
                </Link>
                <Link href="/signup" className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  <span>Get Started</span>
                </Link>
              </>
            )}
          </div>

          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="navbar-hamburger"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__content">
          <Link href="/" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            🏠 Home
          </Link>
          <a href="/#features" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            ✨ Features
          </a>
          <a href="/#how-it-works" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            🔄 How It Works
          </a>
          <div className="mobile-menu__divider" />
          {isLoggedIn ? (
            <>
              <Link href="/chat" className="btn-primary mobile-menu__btn" onClick={() => setMenuOpen(false)}>
                <span>💬 Open Chat</span>
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-secondary mobile-menu__btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
                🔑 Login
              </Link>
              <Link href="/signup" className="btn-primary mobile-menu__btn" onClick={() => setMenuOpen(false)}>
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1rem 0;
          transition: all var(--transition-base);
          background: transparent;
        }

        .navbar--scrolled {
          background: rgba(10, 10, 26, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.75rem 0;
        }

        .navbar__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .navbar__logo-icon {
          font-size: 1.6rem;
          animation: float 4s ease-in-out infinite;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar__link {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          position: relative;
        }

        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          border-radius: 1px;
          transition: width var(--transition-base);
        }

        .navbar__link:hover {
          color: var(--text-primary);
        }

        .navbar__link:hover::after,
        .navbar__link--active::after {
          width: 100%;
        }

        .navbar__link--active {
          color: var(--text-primary);
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
          background: transparent;
          z-index: 1001;
        }

        .navbar__hamburger span {
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all var(--transition-base);
        }

        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10, 10, 26, 0.97);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-slow);
        }

        .mobile-menu--open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-menu__link {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition-base);
          padding: 0.5rem 1rem;
        }

        .mobile-menu__link:hover {
          color: var(--text-primary);
          transform: scale(1.05);
        }

        .mobile-menu__divider {
          width: 60px;
          height: 1px;
          background: var(--border-glass);
          margin: 0.5rem 0;
        }

        .mobile-menu__btn {
          width: 200px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .navbar__links {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
          .navbar__inner {
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}
