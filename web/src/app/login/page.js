'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Popup from '@/components/Popup';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'error' });
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('pa_user');
    if (user) router.push('/chat');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    // check credentials
    const users = JSON.parse(localStorage.getItem('pa_users') || '[]');
    const hardcoded = { email: 'huzaifazaib69@gmail.com', password: '123456789' };

    const isHardcoded = email === hardcoded.email && password === hardcoded.password;
    const registeredUser = users.find((u) => u.email === email && u.password === password);

    if (isHardcoded || registeredUser) {
      const name = registeredUser?.name || 'Huzaifa';
      localStorage.setItem('pa_user', JSON.stringify({ email, name }));
      setPopup({ show: true, message: `Welcome back, ${name}! 🎉`, type: 'success' });
      setTimeout(() => router.push('/chat'), 1200);
    } else {
      setPopup({ show: true, message: 'Invalid email or password. Please try again.', type: 'error' });
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <Popup
        show={popup.show}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, show: false })}
      />

      <div className="auth-page">
        <div className="auth-bg">
          <div className="auth-orb auth-orb--1" />
          <div className="auth-orb auth-orb--2" />
        </div>

        <div className="auth-card glass-strong">
          <div className="auth-header">
            <div className="auth-icon">🔑</div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your personal assistant</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <span className="form-label-icon">📧</span> Email
              </label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="form-label-icon">🔒</span> Password
              </label>
              <div className="form-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="form-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary auth-submit"
              id="login-submit"
              disabled={loading}
            >
              <span>{loading ? '⏳ Signing in...' : '🚀 Sign In'}</span>
            </button>
          </form>

          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link href="/signup" className="auth-link">Sign Up</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .auth-bg {
          position: absolute;
          inset: 0;
        }

        .auth-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.25;
        }

        .auth-orb--1 {
          width: 400px;
          height: 400px;
          background: var(--accent-purple);
          top: 10%;
          right: 20%;
          animation: pulse 8s ease infinite;
        }

        .auth-orb--2 {
          width: 350px;
          height: 350px;
          background: var(--accent-blue);
          bottom: 10%;
          left: 20%;
          animation: pulse 7s ease infinite reverse;
        }

        .auth-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 440px;
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          animation: fadeInUp 0.6s ease;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          animation: bounce 2s ease-in-out infinite;
        }

        .auth-title {
          font-size: var(--font-size-2xl);
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .auth-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .form-label-icon {
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: all var(--transition-fast);
        }

        .form-input::placeholder {
          color: var(--text-muted);
        }

        .form-input:focus {
          border-color: var(--accent-purple);
          box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-input-wrapper {
          position: relative;
        }

        .form-input-wrapper .form-input {
          padding-right: 3rem;
        }

        .form-toggle-password {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          font-size: 1rem;
          padding: 0.25rem;
          transition: transform var(--transition-fast);
        }

        .form-toggle-password:hover {
          transform: translateY(-50%) scale(1.15);
        }

        .auth-submit {
          width: 100%;
          margin-top: 0.5rem;
          padding: 1rem !important;
          font-size: 1rem !important;
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-footer-text {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .auth-link {
          color: var(--accent-purple);
          font-weight: 600;
          transition: color var(--transition-fast);
        }

        .auth-link:hover {
          color: #8b5cf6;
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 1.75rem;
          }
        }
      `}</style>
    </>
  );
}
