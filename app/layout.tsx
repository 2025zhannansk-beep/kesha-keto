import "./globals.css";

export const metadata = {
  title: "КотоКеша",
  description: "Персонализированное кето-питание",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#4ade80",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body style={{ 
        fontFamily: 'sans-serif', 
        padding: '20px', 
        backgroundColor: '#FDFBF7', 
        color: '#44403C',
        minHeight: '100vh',
        margin: 0
      }}>
        <main style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '100px' }}>
          {children}
        </main>
        
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #E7E5E4',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-around',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
        }}>
          <a href="/" style={{ textAlign: 'center', color: '#78716C', textDecoration: 'none', fontSize: '12px' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🏠</div>
            Главная
          </a>
          <a href="/progress" style={{ textAlign: 'center', color: '#78716C', textDecoration: 'none', fontSize: '12px' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>📊</div>
            Прогресс
          </a>
          <a href="/pantry" style={{ textAlign: 'center', color: '#78716C', textDecoration: 'none', fontSize: '12px' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🥑</div>
            Кладовая
          </a>
          <a href="/kesha" style={{ textAlign: 'center', color: '#78716C', textDecoration: 'none', fontSize: '12px' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🐱</div>
            Кеша
          </a>
          <a href="/profile" style={{ textAlign: 'center', color: '#78716C', textDecoration: 'none', fontSize: '12px' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>👤</div>
            Профиль
          </a>
        </nav>
      </body>
    </html>
  );
}
