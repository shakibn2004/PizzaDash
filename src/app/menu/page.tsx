'use client';

import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { PizzaCard } from '@/components/PizzaCard';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'popular', 'classic', 'spicy', 'vegetarian', 'gourmet'];

  useEffect(() => {
    async function fetchPizzas() {
      try {
        setLoading(true);
        const res = await fetch('/api/pizzas');
        const data = await res.json();
        if (data.success && data.pizzas) {
          // Map DB pizza structure to PizzaCard expectations
          const formatted = data.pizzas.map((p: any) => ({
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            rating: p.rating || 4.8,
            reviewsCount: 150,
            category: p.category,
            image: p.image,
            calories: 950,
            prepTime: '15-20 min',
            isBestseller: p.badge === 'BESTSELLER' || p.badge === 'POPULAR',
            isNew: p.badge === 'NEW',
            ingredients: p.ingredients || [],
            dietary: p.category === 'vegetarian' ? ['Vegetarian'] : []
          }));
          setPizzas(formatted);
        }
      } catch (err) {
        console.error('Failed to load pizzas from MongoDB:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPizzas();
  }, []);

  const filteredPizzas = pizzas.filter((pizza) => {
    const matchesSearch =
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pizza.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || pizza.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Our Gourmet Menu</h1>
          <p className="text-sm text-gray-500 mt-1">Live fresh wood-fired pizzas served directly from MongoDB database.</p>
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
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold capitalize whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF6B35] text-white shadow-md'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pizzas Card Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
          <p className="text-xs font-bold text-gray-500">Connecting to MongoDB & fetching live menu...</p>
        </div>
      ) : filteredPizzas.length > 0 ? (
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
          <p className="text-xs text-gray-500 mt-1">Try adjusting your search keyword or active category.</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-4 px-4 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
