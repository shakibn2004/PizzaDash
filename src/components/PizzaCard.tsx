'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Clock, Plus, Flame, Sparkles } from 'lucide-react';
import { Pizza } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

export const PizzaCard: React.FC<{ pizza: Pizza }> = ({ pizza }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(pizza);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-3xl p-4 border border-gray-100 soft-shadow hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
          {pizza.isBestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3 h-3" /> Bestseller
            </span>
          )}
          {pizza.isNew && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black tracking-wider uppercase shadow-xs">
              <Flame className="w-3 h-3" /> New
            </span>
          )}
        </div>

        {/* Pizza Image Container */}
        <Link href={`/pizza/${pizza.id}`} className="block relative w-full h-52 rounded-2xl overflow-hidden bg-gray-50 mb-4">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full glass-panel text-[11px] font-bold text-gray-700 flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#FF6B35]" />
            {pizza.prepTime}
          </div>
        </Link>

        {/* Rating & Dietary Tags */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{pizza.rating}</span>
            <span className="text-gray-400 font-normal">({pizza.reviewsCount})</span>
          </div>
          <div className="flex gap-1">
            {pizza.dietary.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/pizza/${pizza.id}`} className="block">
          <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-[#FF6B35] transition-colors line-clamp-1">
            {pizza.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 mb-4 leading-relaxed">
            {pizza.description}
          </p>
        </Link>
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Starting at</span>
          <span className="text-xl font-black text-gray-900">${pizza.price.toFixed(2)}</span>
        </div>

        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all active:scale-95 shadow-sm ${
            added
              ? 'bg-emerald-500 text-white'
              : 'bg-[#FF6B35] text-white hover:bg-[#E85A24] hover:shadow-md'
          }`}
        >
          <Plus className="w-4 h-4" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
