'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Star, Flame, Sparkles } from 'lucide-react';
import { MOCK_PIZZAS } from '@/data/mockData';
import { PizzaCard } from '@/components/PizzaCard';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [dietaryFilter, setDietaryFilter] = useState<string | null>(null);

  const categories = ['All', 'Classic', 'Specialty', 'Veggie', 'Spicy', "Chef's Special"];
  const dietaryTags = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free'];

  const filteredPizzas = MOCK_PIZZAS.filter((pizza) => {
    const matchesSearch = pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || pizza.category === activeCategory;
    const matchesDietary = !dietaryFilter || pizza.dietary.includes(dietaryFilter as any);

    return matchesSearch && matchesCategory && matchesDietary;
  });

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Our Gourmet Menu</h1>
          <p className="text-sm text-gray-500 mt-1">Handcrafted wood-fired pizzas made fresh to order.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pizza, ingredients..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 soft-shadow"
          />
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-gray-200/80">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF6B35] text-white shadow-md'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </span>
          {dietaryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setDietaryFilter(dietaryFilter === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dietaryFilter === tag
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Pizzas Card Grid */}
      {filteredPizzas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-panel rounded-3xl p-8 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B35] mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No pizzas found</h3>
          <p className="text-xs text-gray-500 mt-1">Try adjusting your search keyword or dietary filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); setDietaryFilter(null); }}
            className="mt-4 px-4 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
