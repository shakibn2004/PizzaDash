'use client';

import React, { useEffect, useState } from 'react';

const LOADING_PIZZAS = [
  {
    name: 'Truffle Pepperoni',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Margherita Burrata',
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Fiery BBQ Chicken',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Wild Mushroom Truffle',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=85',
  },
  {
    name: 'Quattro Formaggi',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=85',
  },
];

interface PremiumSpinnerProps {
  durationMs?: number;
}

export function PremiumSpinner({ durationMs = 3000 }: PremiumSpinnerProps) {
  const [visible, setVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [activePizzaIndex, setActivePizzaIndex] = useState(0);

  useEffect(() => {
    // Pizza switcher interval
    const pizzaInterval = setInterval(() => {
      setActivePizzaIndex((prev) => (prev + 1) % LOADING_PIZZAS.length);
    }, 1100);

    // Minimum display time before fade out
    const timer = setTimeout(() => {
      setIsFading(true);
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 700);
      return () => clearTimeout(removeTimer);
    }, durationMs);

    return () => {
      clearInterval(pizzaInterval);
      clearTimeout(timer);
    };
  }, [durationMs]);

  if (!visible) return null;

  const currentPizza = LOADING_PIZZAS[activePizzaIndex];

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-subtle-pattern backdrop-blur-md transition-all duration-700 ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Soft Light Ambient Glow Background */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-400/10 via-orange-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/70 border border-stone-200/80 shadow-xl backdrop-blur-xl max-w-sm w-full mx-4">
        
        {/* Outer Minimal Rotating Ring */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Subtle Outer Spinner Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-stone-200 border-t-[#FF6B35] animate-spin [animation-duration:3s]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-stone-300 animate-spin [animation-duration:10s] [animation-direction:reverse]" />

          {/* Orbiting Satellite Small Pizza Badges */}
          <div className="absolute inset-0 animate-spin [animation-duration:9s]">
            {LOADING_PIZZAS.map((p, idx) => {
              const angle = (idx * 360) / LOADING_PIZZAS.length;
              const radius = 82;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              return (
                <div
                  key={idx}
                  className="absolute w-7 h-7 rounded-full border-2 border-white shadow-md overflow-hidden transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 bg-white"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover animate-spin [animation-duration:9s] [animation-direction:reverse]"
                  />
                </div>
              );
            })}
          </div>

          {/* Center Main Spinning Pizza Card */}
          <div className="relative w-34 h-34 rounded-full p-1.5 bg-white shadow-lg flex items-center justify-center overflow-hidden border border-stone-200">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {LOADING_PIZZAS.map((pizza, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === activePizzaIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover animate-spin [animation-duration:12s]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand & Loading Status */}
        <div className="mt-6 text-center space-y-1.5">
          <div className="flex items-center justify-center space-x-1.5">
            <span className="text-xl font-extrabold tracking-tight text-stone-900">PIZZA</span>
            <span className="text-xl font-extrabold tracking-tight text-[#FF6B35]">DASH</span>
          </div>

          <div className="h-5 overflow-hidden relative w-56">
            {LOADING_PIZZAS.map((pizza, index) => (
              <p
                key={index}
                className={`absolute inset-x-0 text-xs font-semibold text-stone-600 transition-all duration-500 tracking-wide ${
                  index === activePizzaIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-3 pointer-events-none'
                }`}
              >
                Baking <span className="font-bold text-[#FF6B35]">{pizza.name}</span>...
              </p>
            ))}
          </div>

          {/* Minimal Progress Bar */}
          <div className="w-40 h-1 bg-stone-100 rounded-full mx-auto overflow-hidden mt-3">
            <div className="h-full bg-gradient-to-r from-[#FF6B35] to-amber-500 rounded-full animate-[loadingProgress_3s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
