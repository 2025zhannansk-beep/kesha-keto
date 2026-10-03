'use client';

import { useState, useEffect } from 'react';

interface FoodItem {
  id: number;
  name: string;
  weight: number;
  protein: number;
  fat: number;
  carbs: number;
}

const KETO_PRODUCTS = [
  { name: 'Авокадо', protein: 2, fat: 15, carbs: 9 },
  { name: 'Яйцо (1 шт)', protein: 6, fat: 5, carbs: 0.6 },
  { name: 'Лосось', protein: 20, fat: 13, carbs: 0 },
  { name: 'Оливковое масло (1 ст.л.)', protein: 0, fat: 14, carbs: 0 },
  { name: 'Сыр чеддер (30г)', protein: 7, fat: 9, carbs: 0.4 },
  { name: 'Говядина (100г)', protein: 26, fat: 15, carbs: 0 },
  { name: 'Шпинат (100г)', protein: 3, fat: 0.4, carbs: 3.6 },
  { name: 'Миндаль (30г)', protein: 6, fat: 14, carbs: 6 },
];

export default function PantryPage() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [weight, setWeight] = useState(100);

  useEffect(() => {
    const savedFoods = localStorage.getItem('kesha-foods');
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }
  }, []);

  useEffect(() => {
    if (foods.length > 0) {
      localStorage.setItem('kesha-foods', JSON.stringify(foods));
    }
  }, [foods]);

  const addFood = () => {
    if (!selectedProduct) return;
    
    const product = KETO_PRODUCTS.find(p => p.name === selectedProduct);
    if (!product) return;

    const multiplier = weight / 100;
    const newFood: FoodItem = {
      id: Date.now(),
      name: product.name,
      weight,
      protein: Math.round(product.protein * multiplier * 10) / 10,
      fat: Math.round(product.fat * multiplier * 10) / 10,
      carbs: Math.round(product.carbs * multiplier * 10) / 10,
    };

    setFoods([newFood, ...foods]);
    setSelectedProduct('');
    setWeight(100);
  };

  const removeFood = (id: number) => {
    const updatedFoods = foods.filter(f => f.id !== id);
    setFoods(updatedFoods);
    if (updatedFoods.length === 0) {
      localStorage.removeItem('kesha-foods');
    }
  };

  const totals = foods.reduce(
    (acc, food) => ({
      protein: acc.protein + food.protein,
      fat: acc.fat + food.fat,
      carbs: acc.carbs + food.carbs,
    }),
    { protein: 0, fat: 0, carbs: 0 }
  );

  const totalCalories = totals.protein * 4 + totals.fat * 9 + totals.carbs * 4;
  const fatPercent = totalCalories > 0 ? Math.round((totals.fat * 9 / totalCalories) * 100) : 0;
  const proteinPercent = totalCalories > 0 ? Math.round((totals.protein * 4 / totalCalories) * 100) : 0;
  const carbsPercent = totalCalories > 0 ? Math.round((totals.carbs * 4 / totalCalories) * 100) : 0;

  const isKeto = totals.carbs <= 50 && fatPercent >= 70;

  return (
    <div style={{ padding: '10px' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>🥑</div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#292524', margin: 0 }}>
          Кладовая Кеси
        </h1>
        <p style={{ color: '#78716C', marginTop: '8px' }}>
          Считай свои кето-макросы!
        </p>
      </header>

      {/* Калькулятор */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>
          Добавить продукт
        </h2>
        
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid #E7E5E4',
            fontSize: '16px',
            marginBottom: '12px',
            backgroundColor: 'white',
            color: '#44403C'
          }}
        >
          <option value="">Выберите продукт...</option>
          {KETO_PRODUCTS.map((product) => (
            <option key={product.name} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', color: '#78716C', fontSize: '14px', marginBottom: '4px' }}>
            Вес (граммы)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            min="1"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              border: '1px solid #E7E5E4',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={addFood}
          disabled={!selectedProduct}
          style={{
            width: '100%',
            backgroundColor: !selectedProduct ? '#D1D5DB' : '#4ade80',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '14px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: !selectedProduct ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Добавить 🐾
        </button>
      </div>

      {/* Итоги дня */}
      <div style={{
        backgroundColor: isKeto ? '#DCFCE7' : 'white',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: isKeto ? '2px solid #4ade80' : 'none'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>
          Итоги дня {isKeto && '✅ В кетозе!'}
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#78716C', fontSize: '14px' }}>Белки</span>
            <span style={{ color: '#44403C', fontWeight: '600' }}>{Math.round(totals.protein)}г ({proteinPercent}%)</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: '#60A5FA', width: `${Math.min(proteinPercent, 100)}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#78716C', fontSize: '14px' }}>Жиры</span>
            <span style={{ color: '#44403C', fontWeight: '600' }}>{Math.round(totals.fat)}г ({fatPercent}%)</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: '#FCD34D', width: `${Math.min(fatPercent, 100)}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ color: '#78716C', fontSize: '14px' }}>Углеводы</span>
            <span style={{ color: '#44403C', fontWeight: '600' }}>{Math.round(totals.carbs)}г ({carbsPercent}%)</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: '#F87171', width: `${Math.min(carbsPercent, 100)}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '12px', backgroundColor: '#F5F5F4', borderRadius: '12px' }}>
          <span style={{ color: '#78716C', fontSize: '14px' }}>Всего калорий: </span>
          <span style={{ color: '#44403C', fontWeight: '600', fontSize: '18px' }}>{Math.round(totalCalories)} ккал</span>
        </div>
      </div>

      {/* Список продуктов */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#292524', marginBottom: '16px' }}>
          Съедено сегодня ({foods.length})
        </h2>
        
        {foods.length === 0 ? (
          <p style={{ color: '#78716C', textAlign: 'center', padding: '20px' }}>
            Пока тут пусто. Добавьте свой первый продукт!
          </p>
        ) : (
          foods.map((food) => (
            <div key={food.id} style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #4ade80'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                <div>
                  <p style={{ color
