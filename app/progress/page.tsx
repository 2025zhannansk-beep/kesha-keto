'use client';

import { useState, useEffect } from 'react';

interface MoodEntry {
  id: number;
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  hunger: number;
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [mood, setMood] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [hunger, setHunger] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('kesha-mood');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('kesha-mood', JSON.stringify(entries));
    }
  }, [entries]);

  const saveEntry = () => {
    if (mood === 0 || energy === 0 || sleep === 0 || hunger === 0) return;
    const newEntry: MoodEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('ru-RU'),
      mood,
      energy,
      sleep,
      hunger,
    };
    setEntries([newEntry, ...entries]);
    setMood(0);
    setEnergy(0);
    setSleep(0);
    setHunger(0);
  };

  const deleteEntry = (id: number) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    if (updated.length === 0) localStorage.removeItem('kesha-mood');
  };

  const renderStars = (value: number, setValue: (n: number) => void) => {
    return (
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setValue(star)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: star <= value ? '#FCD34D' : '#E5E7EB',
              transition: 'color 0.2s'
            }}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '10px' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>📊</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#292524', margin: 0 }}>Прогресс</h1>
        <p style={{ color: '#78716C', marginTop: '8px' }}>Отслеживай своё самочувствие каждый день</p>
      </header>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>Как ты себя чувствуешь?</h2>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>😊</span>
            <span style={{ color: '#44403C', fontWeight: '500' }}>Настроение</span>
          </div>
          {renderStars(mood, setMood)}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <span style={{ color: '#44403C', fontWeight: '500' }}>Энергия</span>
          </div>
          {renderStars(energy, setEnergy)}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>😴</span>
            <span style={{ color: '#44403C', fontWeight: '500' }}>Сон</span>
          </div>
          {renderStars(sleep, setSleep)}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🍽️</span>
            <span style={{ color: '#44403C', fontWeight: '500' }}>Насыщение</span>
          </div>
          {renderStars(hunger, setHunger)}
        </div>

        <button
          onClick={saveEntry}
          disabled={mood === 0 || energy === 0 || sleep === 0 || hunger === 0}
          style={{
            width: '100%',
            backgroundColor: (mood === 0 || energy === 0 || sleep === 0 || hunger === 0) ? '#D1D5DB' : '#4ade80',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: (mood === 0 || energy === 0 || sleep === 0 || hunger === 0) ? 'not-allowed' : 'pointer'
          }}
        >
          Сохранить оценку 🐾
        </button>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>История ({entries.length})</h2>
        {entries.length === 0 ? (
          <p style={{ color: '#78716C', textAlign: 'center', padding: '20px' }}>Пока тут пусто. Оцени своё самочувствие!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #4ade80' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <span style={{ color: '#78716C', fontSize: '14px' }}>{entry.date}</span>
                <button onClick={() => deleteEntry(entry.id)} style={{ backgroundColor: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>Удалить</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px' }}>
                <span>😊 Настроение: {entry.mood}/5</span>
                <span>⚡ Энергия: {entry.energy}/5</span>
                <span>😴 Сон: {entry.sleep}/5</span>
                <span>🍽️ Насыщение: {entry.hunger}/5</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
