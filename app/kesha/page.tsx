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

  // Загружаем заметки и воду из localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('kesha-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
    
    const savedWater = localStorage.getItem('kesha-water');
    if (savedWater) {
      const waterData = JSON.parse(savedWater);
      const today = new Date().toDateString();
      if (waterData.date === today) {
        setWaterCount(waterData.count);
      }
    }
  }, []);

  // Сохраняем заметки
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('kesha-notes', JSON.stringify(notes));
    }
  }, [notes]);

  // Сохраняем воду
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem('kesha-water', JSON.stringify({ date: today, count: waterCount }));
  }, [waterCount]);

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

  const addWater = () => {
    if (waterCount < 8) {
      setWaterCount(waterCount + 1);
    }
  };

  const resetWater = () => {
    setWaterCount(0);
  };

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
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#292524', margin: 0 }}>
          Кеша ждёт тебя!
        </h1>
      </header>

      {/* Трекер воды */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '8px' }}>
          💧 Кеша пьёт
        </h2>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>{catMood.emoji}</div>
        <p style={{ color: '#78716C', marginBottom: '16px', fontSize: '14px' }}>
          {catMood.text}
        </p>
        
        <div
