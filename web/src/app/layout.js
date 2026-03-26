import './globals.css';

export const metadata = {
  title: 'Personal Assistant | AI-Powered Productivity',
  description: 'Your intelligent personal assistant powered by AI. Manage calendar, emails, tasks, notes, and expenses all through natural conversation.',
  keywords: 'personal assistant, AI, productivity, calendar, email, tasks',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
