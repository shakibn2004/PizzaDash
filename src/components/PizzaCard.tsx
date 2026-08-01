'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { Pizza } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

interface PizzaCardProps {
  pizza: Pizza;
}

export const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(pizza);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl bg-[#1C1917] border border-[#D4A373]/15 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#FF6B35]/10 hover:border-[#FF6B35]/40 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Card Image Container */}
        <div className="relative h-60 w-full overflow-hidden bg-[#26221F]">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent opacity-80" />

          {/* Badge Overlays */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
            {pizza.isBestseller && (
              <span className="px-3 py-1 rounded-full bg-[#FF6B35] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                ★ Bestseller
              </span>
            )}
            {pizza.isNew && (
              <span className="px-3 py-1 rounded-full bg-[#D4A373] text-stone-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                New
              </span>
            )}
          </div>

          {/* Quick View Floating Button */}
          <Link
            href={`/pizza/${pizza.id}`}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1C1917]/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF6B35] shadow-lg"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#D4A373] uppercase tracking-wider">
              {pizza.category}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#F5EBE0]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{pizza.rating}</span>
              <span className="text-[#A39B8B] font-normal">({pizza.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/pizza/${pizza.id}`} className="block">
            <h3 className="text-lg font-black text-[#F5EBE0] group-hover:text-[#FF6B35] transition-colors line-clamp-1">
              {pizza.name}
            </h3>
          </Link>

          <p className="text-xs text-[#A39B8B] font-normal line-clamp-2 leading-relaxed">
            {pizza.description}
          </p>

          {/* Ingredients Tag */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {pizza.ingredients.slice(0, 3).map((ing, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-full bg-[#26221F] text-[#D4A373]/90 text-[10px] font-medium border border-[#D4A373]/10"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Price & Add To Cart */}
      <div className="p-6 pt-0 flex items-center justify-between mt-2 border-t border-[#D4A373]/10 pt-4">
        <div>
          <span className="text-[10px] text-[#A39B8B] uppercase tracking-wider block font-semibold">Price</span>
          <span className="text-2xl font-black text-[#FF6B35]">${pizza.price.toFixed(2)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold shadow-lg transition-all active:scale-95 ${
            added
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-[#FF6B35] text-white hover:bg-[#E85A24] shadow-orange-500/25'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {added ? 'Added!' : 'Add to Order'}
        </button>
      </div>
    </motion.div>
  );
};
