'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Popup from '@/components/Popup';

const QUICK_ACTIONS = [
  { icon: '🔍', label: 'Search the web', prompt: 'Search the web for ' },
  { icon: '📅', label: 'Check calendar', prompt: "What's on my calendar today?" },
  { icon: '📧', label: 'Read emails', prompt: 'Show me my recent emails' },
  { icon: '✅', label: 'View tasks', prompt: 'Show me my current tasks' },
  { icon: '📝', label: 'Take a note', prompt: 'Create a new note: ' },
  { icon: '💰', label: 'View expenses', prompt: 'Show me my recent expenses' },
];

const WEBHOOK_URL = 'https://alwaysbehappy.app.n8n.cloud/webhook-test/70dd6b91-f571-430e-bdc6-b15f82d13886';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: '', type: 'info' });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('pa_user');
    if (!stored) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(stored));

    const savedMessages = localStorage.getItem('pa_chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('pa_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMessage = { role: 'user', content: text.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const responseText = await response.text();
      if (!responseText.trim()) {
        throw new Error('Empty response from assistant');
      }

      const data = JSON.parse(responseText);
      let aiText;

      if (Array.isArray(data) && data.length > 0) {
        aiText = data[0]?.output || 'No response from AI.';
      } else if (typeof data === 'object') {
        aiText = data?.output || 'No response from AI.';
      } else {
        aiText = 'Unexpected response format.';
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: aiText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ Error: ${error.message}. Please check your n8n workflow.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickAction = (action) => {
    setInput(action.prompt);
    setSidebarOpen(false);
    inputRef.current?.focus();
  };

  const handleLogout = () => {
    localStorage.removeItem('pa_user');
    router.push('/');
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('pa_chat_messages');
    setPopup({ show: true, message: 'Chat history cleared! 🧹', type: 'info' });
  };

  if (!user) return null;

  return (
    <>
      <Popup
        show={popup.show}
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ ...popup, show: false })}
      />

      <div className="chat-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
          <div className="sidebar__header">
            <Link href="/" className="sidebar__logo">
              🤖 <span>Personal<span className="gradient-text">AI</span></span>
            </Link>
            <button className="sidebar__close" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>

          <div className="sidebar__user">
            <div className="sidebar__avatar">{user.name?.[0]?.toUpperCase() || '?'}</div>
            <div>
              <p className="sidebar__name">{user.name}</p>
              <p className="sidebar__email">{user.email}</p>
            </div>
          </div>

          <div className="sidebar__section">
            <p className="sidebar__section-title">Quick Actions</p>
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                className="sidebar__action"
                onClick={() => handleQuickAction(action)}
              >
                <span className="sidebar__action-icon">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>

          <div className="sidebar__bottom">
            <button className="sidebar__btn" onClick={clearChat}>
              🗑️ Clear Chat
            </button>
            <button className="sidebar__btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Chat Area */}
        <main className="chat-main">
          {/* Chat Header */}
          <header className="chat-header glass">
            <button
              className="chat-header__menu"
              onClick={() => setSidebarOpen(true)}
              id="chat-menu-toggle"
            >
              ☰
            </button>
            <div className="chat-header__info">
              <h2 className="chat-header__title">💬 Personal Assistant</h2>
              <span className="chat-header__status">
                <span className="chat-header__status-dot" />
                Online
              </span>
            </div>
          </header>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-empty">
                <div className="chat-empty__icon">🤖</div>
                <h3 className="chat-empty__title">Hello, {user.name}!</h3>
                <p className="chat-empty__subtitle">
                  I'm your personal assistant. Ask me anything or use the quick actions!
                </p>
                <div className="chat-empty__suggestions">
                  {QUICK_ACTIONS.slice(0, 4).map((action, i) => (
                    <button
                      key={i}
                      className="chat-empty__suggestion"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble--user' : 'chat-bubble--ai'} ${msg.isError ? 'chat-bubble--error' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="chat-bubble__avatar">🤖</div>
                )}
                <div className="chat-bubble__content">
                  <p className="chat-bubble__text">{msg.content}</p>
                  <span className="chat-bubble__time">{msg.time}</span>
                </div>
                {msg.role === 'user' && (
                  <div className="chat-bubble__avatar chat-bubble__avatar--user">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble chat-bubble--ai">
                <div className="chat-bubble__avatar">🤖</div>
                <div className="chat-bubble__content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form className="chat-input-bar glass" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              id="chat-input"
            />
            <button
              type="submit"
              className="chat-send"
              disabled={!input.trim() || loading}
              id="chat-send"
            >
              {loading ? '⏳' : '🚀'}
            </button>
          </form>
        </main>
      </div>

      <style jsx>{`
        .chat-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 280px;
          background: var(--bg-secondary);
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          transition: transform var(--transition-slow);
        }

        .sidebar__header {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }

        .sidebar__logo {
          font-size: 1.15rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sidebar__close {
          display: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 1.2rem;
          padding: 0.25rem;
        }

        .sidebar__user {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .sidebar__avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--gradient-button);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .sidebar__name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .sidebar__email {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .sidebar__section {
          padding: 1rem;
          flex: 1;
          overflow-y: auto;
        }

        .sidebar__section-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }

        .sidebar__action {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          text-align: left;
          margin-bottom: 0.25rem;
        }

        .sidebar__action:hover {
          background: var(--bg-glass);
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .sidebar__action-icon {
          font-size: 1rem;
        }

        .sidebar__bottom {
          padding: 1rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar__btn {
          width: 100%;
          padding: 0.6rem 0.75rem;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          text-align: left;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .sidebar__btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--accent-red);
        }

        .sidebar-overlay {
          display: none;
        }

        /* ===== MAIN CHAT ===== */
        .chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          flex-shrink: 0;
        }

        .chat-header__menu {
          display: none;
          background: transparent;
          color: var(--text-primary);
          font-size: 1.4rem;
          padding: 0.25rem;
        }

        .chat-header__info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .chat-header__title {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .chat-header__status {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--accent-green);
          font-weight: 500;
        }

        .chat-header__status-dot {
          width: 7px;
          height: 7px;
          background: var(--accent-green);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        /* ===== MESSAGES ===== */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          animation: fadeIn 0.5s ease;
        }

        .chat-empty__icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: bounce 2s ease-in-out infinite;
        }

        .chat-empty__title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .chat-empty__subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 2rem;
          max-width: 400px;
        }

        .chat-empty__suggestions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          max-width: 400px;
          width: 100%;
        }

        .chat-empty__suggestion {
          padding: 0.75rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 500;
          transition: all var(--transition-fast);
          text-align: left;
        }

        .chat-empty__suggestion:hover {
          background: var(--bg-card-hover);
          border-color: var(--accent-purple);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        /* ===== CHAT BUBBLES ===== */
        .chat-bubble {
          display: flex;
          gap: 0.75rem;
          max-width: 80%;
          animation: fadeInUp 0.3s ease;
        }

        .chat-bubble--user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .chat-bubble--ai {
          align-self: flex-start;
        }

        .chat-bubble__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
        }

        .chat-bubble__avatar--user {
          background: var(--gradient-button);
          border: none;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
        }

        .chat-bubble__content {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          position: relative;
        }

        .chat-bubble--user .chat-bubble__content {
          background: var(--gradient-button);
          border-radius: var(--radius-md) var(--radius-md) 4px var(--radius-md);
        }

        .chat-bubble--ai .chat-bubble__content {
          background: var(--bg-glass-strong);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md) var(--radius-md) var(--radius-md) 4px;
        }

        .chat-bubble--error .chat-bubble__content {
          border-color: rgba(239, 68, 68, 0.3);
          background: rgba(239, 68, 68, 0.1);
        }

        .chat-bubble__text {
          font-size: 0.9rem;
          line-height: 1.6;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .chat-bubble__time {
          display: block;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 0.35rem;
          text-align: right;
        }

        .chat-bubble--ai .chat-bubble__time {
          text-align: left;
        }

        /* ===== TYPING INDICATOR ===== */
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: typing 1.4s ease-in-out infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* ===== INPUT BAR ===== */
        .chat-input-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          margin: 0.75rem 1.5rem 1rem;
          border-radius: var(--radius-lg);
          flex-shrink: 0;
        }

        .chat-input {
          flex: 1;
          padding: 0.6rem 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .chat-input::placeholder {
          color: var(--text-muted);
        }

        .chat-input:disabled {
          opacity: 0.5;
        }

        .chat-send {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--gradient-button);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all var(--transition-base);
          flex-shrink: 0;
        }

        .chat-send:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
        }

        .chat-send:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            z-index: 1001;
            transform: translateX(-100%);
          }

          .sidebar--open {
            transform: translateX(0);
          }

          .sidebar__close {
            display: block;
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.3s ease;
          }

          .chat-header__menu {
            display: block;
          }

          .chat-input-bar {
            margin: 0.5rem 0.75rem 0.75rem;
          }

          .chat-messages {
            padding: 1rem;
          }

          .chat-bubble {
            max-width: 90%;
          }

          .chat-empty__suggestions {
            grid-template-columns: 1fr;
          }

          .chat-header {
            padding: 0.75rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .chat-bubble {
            max-width: 95%;
          }

          .chat-bubble__avatar {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
          }

          .chat-bubble__content {
            padding: 0.6rem 0.85rem;
          }
        }
      `}</style>
    </>
  );
}
