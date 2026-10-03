'use client';

import { useState, useEffect } from 'react';

interface Note {
  id: number;
  content: string;
  createdAt: string;
}

export default function KeshaPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [waterCount, setWaterCount] = useState(0);

  useEffect(() => {
    const savedNotes = localStorage.getItem('kesha-notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    
    const savedWater = localStorage.getItem('kesha-water');
    if (savedWater) {
      const waterData = JSON.parse(savedWater);
      const today = new Date().toDateString();
      if (waterData.date === today) setWaterCount(waterData.count);
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) localStorage.setItem('kesha-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('kesha-water', JSON.stringify({ date: today, count: waterCount }));
  }, [waterCount]);

  const saveNote = () => {
    if (!newNote.trim()) return;
    const note: Note = { id: Date.now(), content: newNote, createdAt: new Date().toISOString() };
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    if (updatedNotes.length === 0) localStorage.removeItem('kesha-notes');
  };

  const addWater = () => {
    if (waterCount < 8) setWaterCount(waterCount + 1);
  };

  const resetWater = () => setWaterCount(0);

  const getCatMood = () => {
    if (waterCount === 0) return { emoji: '😿', text: 'Кеша хочет пить...' };
    if (waterCount < 3) return { emoji: '🐱', text: 'Кеша пьёт!' };
    if (waterCount < 6) return { emoji: '😺', text: 'Кеша доволен!' };
    if (waterCount < 8) return { emoji: '😸', text: 'Кеша счастлив!' };
    return { emoji: '😻', text: 'Кеша мурлычет от счастья!' };
  };

  const catMood = getCatMood();

  return (
    <div style={{ padding: '10px' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🐱</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#292524', margin: 0 }}>Кеша ждёт тебя!</h1>
      </header>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '8px' }}>💧 Кеша пьёт</h2>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>{catMood.emoji}</div>
        <p style={{ color: '#78716C', marginBottom: '16px', fontSize: '14px' }}>{catMood.text}</p>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          {Array.from({ length: 8 }, (_, i) => (
            <button key={i} onClick={addWater} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: i < waterCount ? '#60A5FA' : '#E5E7EB', cursor: 'pointer', fontSize: '20px', transition: 'all 0.2s' }}>💧</button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <span style={{ color: '#78716C', fontSize: '14px' }}>{waterCount} / 8 стаканов</span>
          {waterCount > 0 && <button onClick={resetWater} style={{ backgroundColor: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>Сбросить</button>}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>📝 Дневник Кеси</h2>
        <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Например: Сегодня съела авокадо и чувствую себя отлично! 🥑" style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '12px', border: '1px solid #E7E5E4', fontSize: '16px', fontFamily: 'inherit', color: '#44403C', resize: 'vertical', boxSizing: 'border-box' }} />
        <button onClick={saveNote} disabled={!newNote.trim()} style={{ width: '100%', marginTop: '12px', backgroundColor: !newNote.trim() ? '#D1D5DB' : '#4ade80', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: '600', cursor: !newNote.trim() ? 'not-allowed' : 'pointer', transition: 'background-color 0.2s' }}>Сохранить заметку 🐾</button>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>Мои записи ({notes.length})</h2>
        {notes.length === 0 ? (
          <p style={{ color: '#78716C', textAlign: 'center', padding: '20px' }}>Пока тут пусто. Напиши свою первую заметку!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid #4ade80' }}>
              <p style={{ color: '#44403C', margin: '0 0 8px 0', lineHeight: '1.5' }}>{note.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#A8A29E' }}>{new Date(note.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
                <button onClick={() => deleteNote(note.id)} style={{ backgroundColor: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>Удалить</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
