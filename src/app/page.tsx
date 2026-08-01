'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Flame, Clock, ArrowRight, ShieldCheck, Star, Truck, Award, Zap, ChevronRight } from 'lucide-react';
import { MOCK_PIZZAS } from '@/data/mockData';
import { PizzaCard } from '@/components/PizzaCard';

export default function LandingPage() {
  const [address, setAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Classic', 'Specialty', 'Veggie', 'Spicy', "Chef's Special"];

  const categoryIcons: Record<string, string> = {
    'All': '🍕',
    'Classic': '🧀',
    'Specialty': '🌟',
    'Veggie': '🌱',
    'Spicy': '🌶️',
    "Chef's Special": '👨‍🍳',
  };

  const filteredPizzas = selectedCategory === 'All'
    ? MOCK_PIZZAS
    : MOCK_PIZZAS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-subtle-pattern">
      
      {/* 1. CameraBazar-Style Split Grid Hero Section */}
      <section className="pt-6 pb-10 sm:pt-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Main Big Feature Banner (Left / Top 8 cols) */}
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-md group min-h-[380px] sm:min-h-[440px] flex items-center">
              <img
                src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1600&q=85"
                alt="Wood-Fired Pizza Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl space-y-5 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B35] text-white text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" /> 72-Hour Sourdough Fermentation
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
                  Authentic Italian <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-[#FF6B35]">
                    Wood-Fired Pizzas
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed line-clamp-2">
                  Handcrafted with imported San Marzano tomatoes, fresh burrata, and baked at 900°F in 90 seconds.
                </p>

                {/* Integrated Search bar inside Banner */}
                <div className="p-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex items-center gap-2 max-w-md">
                  <div className="flex items-center gap-2.5 px-3 py-2 w-full">
                    <Search className="w-4 h-4 text-stone-400 shrink-0" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter delivery address..."
                      className="w-full text-xs font-semibold text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
                    />
                  </div>
                  <Link
                    href="/menu"
                    className="px-5 py-2.5 rounded-lg bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85A24] transition-all whitespace-nowrap flex items-center gap-1 shrink-0"
                  >
                    Order <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side Promo Cards (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              
              {/* Promo Card 1: Custom Builder */}
              <Link href="/builder" className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-md h-[185px] sm:h-[210px] block">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                  alt="Custom Pizza Builder"
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-[10px] font-extrabold uppercase tracking-wider">Create Your Own</span>
                    <h3 className="text-base font-black mt-1 group-hover:text-amber-300 transition-colors">Custom Pizza Builder</h3>
                    <p className="text-[11px] text-stone-300">Choose crust, sauce & toppings</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Promo Card 2: 15-Min Express Delivery */}
              <Link href="/menu" className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-md h-[185px] sm:h-[210px] block">
                <img
                  src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80"
                  alt="Express Delivery"
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-end justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#FF6B35] text-[10px] font-extrabold uppercase tracking-wider">Fast Delivery</span>
                    <h3 className="text-base font-black mt-1 group-hover:text-amber-300 transition-colors">15-20 Min Express Guarantee</h3>
                    <p className="text-[11px] text-stone-300">Delivered piping hot</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* 2. CameraBazar-Style Value Proposition Bar */}
      <section className="py-4 bg-white/80 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-[#FF6B35] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">15-Min Express</h4>
                <p className="text-[11px] text-stone-500">Piping hot delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">100% Organic</h4>
                <p className="text-[11px] text-stone-500">San Marzano tomatoes</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">900°F Wood-Fired</h4>
                <p className="text-[11px] text-stone-500">Baked in 90 seconds</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">Hygiene Certified</h4>
                <p className="text-[11px] text-stone-500">100% Sealed delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CameraBazar-Style Grid Category Showcase */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">Browse by Category</h2>
              <p className="text-xs text-stone-500 mt-0.5">Explore our handcrafted gourmet pizza collections</p>
            </div>
            <Link href="/menu" className="text-xs font-bold text-[#FF6B35] flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-white border-[#FF6B35] shadow-md ring-2 ring-[#FF6B35]/20 scale-102'
                    : 'bg-white/80 border-stone-200/80 hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <span className="text-2xl mb-2">{categoryIcons[cat] || '🍕'}</span>
                <span className="text-xs font-bold text-stone-800">{cat}</span>
                <span className="text-[10px] font-semibold text-stone-400 mt-0.5">
                  {cat === 'All' ? MOCK_PIZZAS.length : MOCK_PIZZAS.filter(p => p.category === cat).length} items
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Pizzas Product Grid */}
      <section className="pb-16 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 border-b border-stone-200/80 pb-4">
            <div>
              <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Recommended For You</span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-0.5">
                Signature Wood-Fired Pizzas
              </h2>
            </div>
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
              Showing {filteredPizzas.length} gourmet pizzas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Custom Pizza Builder Banner */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-stone-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-stone-800">
          <img
            src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80"
            alt="Chef Crafting Pizza"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 max-w-xl space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-amber-400 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Custom Builder
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Create Your Own Gourmet Masterpiece.
            </h2>
            <p className="text-sm text-stone-300 font-normal leading-relaxed">
              Mix and match artisan sourdough crusts, signature sauces, gourmet cheeses, and premium toppings with real-time price estimation.
            </p>
            <div className="pt-2">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold shadow-lg hover:bg-[#E85A24] transition-all hover:scale-102 active:scale-95"
              >
                Launch Builder <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
