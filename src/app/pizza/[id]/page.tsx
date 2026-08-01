'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Clock, Check, Plus, Minus, Flame, Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import { MOCK_PIZZAS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { PizzaCard } from '@/components/PizzaCard';

export default function PizzaDetailsPage() {
  const params = useParams();
  const { addToCart } = useCart();
  
  const pizzaId = params?.id as string || 'pizza-1';
  const pizza = MOCK_PIZZAS.find(p => p.id === pizzaId) || MOCK_PIZZAS[0];

  const [selectedSize, setSelectedSize] = useState<'Small (10")' | 'Medium (12")' | 'Large (14")' | 'Extra Large (16")'>('Large (14")');
  const [selectedCrust, setSelectedCrust] = useState('Classic Hand-Tossed');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const sizes = [
    { name: 'Small (10")', multiplier: 0.8 },
    { name: 'Medium (12")', multiplier: 0.9 },
    { name: 'Large (14")', multiplier: 1.0 },
    { name: 'Extra Large (16")', multiplier: 1.2 }
  ];

  const crusts = [
    'Classic Hand-Tossed',
    'Thick Pan Crust (+$2.50)',
    'Ultra-Thin Crispy (+$1.00)',
    'Mozzarella Stuffed Crust (+$3.50)'
  ];

  const handleAddToCart = () => {
    addToCart(pizza, selectedSize, selectedCrust);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link href="/menu" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#FF6B35] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Full Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: HD Image Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative w-full h-[450px] rounded-3xl overflow-hidden soft-shadow bg-gray-50 border border-gray-100">
            <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover" />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF6B35] text-white text-xs font-black uppercase">
                {pizza.category}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Options & Add to Cart */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-amber-500 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{pizza.rating}</span>
                <span className="text-gray-400 font-normal">({pizza.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#FF6B35]" /> {pizza.prepTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{pizza.name}</h1>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{pizza.description}</p>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block">1. Choose Size</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedSize(s.name as any)}
                  className={`py-3 px-2 rounded-2xl border text-xs font-bold text-center transition-all ${
                    selectedSize === s.name
                      ? 'border-[#FF6B35] bg-orange-50/60 text-[#FF6B35] ring-2 ring-[#FF6B35]/20'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Crust Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block">2. Choose Crust</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {crusts.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCrust(c)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                    selectedCrust === c
                      ? 'border-[#FF6B35] bg-orange-50/60 text-[#FF6B35] ring-2 ring-[#FF6B35]/20'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Ingredients list */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-extrabold text-gray-900 uppercase tracking-wider block">Included Ingredients</label>
            <div className="flex flex-wrap gap-2">
              {pizza.ingredients.map((ing) => (
                <span key={ing} className="px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-500" /> {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="pt-6 border-t border-gray-200/80 flex items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-gray-100 border border-gray-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 font-bold"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-extrabold w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-2xl text-sm font-extrabold text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                added ? 'bg-emerald-500' : 'bg-[#FF6B35] hover:bg-[#E85A24]'
              }`}
            >
              {added ? 'Added to Cart!' : `Add to Order • $${(pizza.price * quantity).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
