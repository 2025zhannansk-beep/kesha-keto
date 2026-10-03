export const metadata = {
  title: "КотоКеша",
  description: "Персонализированное кето-питание",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#FDFBF7', color: '#44403C' }}>
        {children}
      </body>
    </html>
  );
}
