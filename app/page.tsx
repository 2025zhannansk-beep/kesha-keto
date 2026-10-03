export default function Home() {
  return (
    <div>
      <header style={{ textAlign: 'center', padding: '40px 0 20px 0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#292524', margin: 0 }}>
          Мрр-привет! 🐾
        </h1>
        <p style={{ color: '#78716C', marginTop: '8px' }}>
          Добро пожаловать в КотоКеша
        </p>
      </header>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '8px' }}>
          Твои анализы
        </h2>
        <p style={{ color: '#78716C', marginBottom: '16px' }}>
          Здесь будут индикаторы твоих биомаркеров.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{
            backgroundColor: '#DCFCE7',
            color: '#22c55e',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Глюкоза
          </span>
          <span style={{
            backgroundColor: '#FFEDD5',
            color: '#FB923C',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Ферритин
          </span>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '8px' }}>
          Последний замер
        </h2>
        <p style={{ color: '#78716C' }}>
          Вес и объемы пока не введены.
        </p>
      </div>

      <button style={{
        width: '100%',
        backgroundColor: '#4ade80',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '14px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(74, 222, 128, 0.3)'
      }}>
        Начать путь
      </button>
    </div>
  );
}
