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

  // Загружаем заметки из localStorage при открытии страницы
  useEffect(() => {
    const savedNotes = localStorage.getItem('kesha-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Сохраняем заметки в localStorage при изменении
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('kesha-notes', JSON.stringify(notes));
    }
  }, [notes]);

  const saveNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now(),
      content: newNote,
      createdAt: new Date().toISOString()
    };
    
    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    if (updatedNotes.length === 0) {
      localStorage.removeItem('kesha-notes');
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🐱</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#292524', margin: 0 }}>
          Дневник Кеси
        </h1>
        <p style={{ color: '#78716C', marginTop: '8px' }}>
          Мрр-р! Запиши сюда свои мысли, самочувствие или планы на день.
        </p>
      </header>

      {/* Форма для новой заметки */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Например: Сегодня съела авокадо и чувствую себя отлично! 🥑"
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid #E7E5E4',
            fontSize: '16px',
            fontFamily: 'inherit',
            color: '#44403C',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={saveNote}
          disabled={!newNote.trim()}
          style={{
            width: '100%',
            marginTop: '12px',
            backgroundColor: !newNote.trim() ? '#D1D5DB' : '#4ade80',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: !newNote.trim() ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Сохранить заметку 🐾
        </button>
      </div>

      {/* Список сохранённых заметок */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>
          Мои записи ({notes.length})
        </h2>
        
        {notes.length === 0 ? (
          <p style={{ color: '#78716C', textAlign: 'center', padding: '20px' }}>
            Пока тут пусто. Напиши свою первую заметку!
          </p>
        ) : (
          notes.map((note) => (
            <div key={note.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #4ade80',
              position: 'relative'
            }}>
               <p style={{ color: '#44403C', margin: '0 0 8px 0', lineHeight: '1.5' }}>
                {note.content}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#A8A29E' }}>
                  {new Date(note.createdAt).toLocaleDateString('ru-RU', {
                    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                  })}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#EF4444',
                    cursor: 'pointer',
                    fontSize: '14px',
                    padding: '4px 8px'
                  }}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
