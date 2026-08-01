'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Flame, Clock, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { MOCK_PIZZAS } from '@/data/mockData';
import { PizzaCard } from '@/components/PizzaCard';

export default function LandingPage() {
  const [address, setAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Classic', 'Specialty', 'Veggie', 'Spicy', "Chef's Special"];

  const filteredPizzas = selectedCategory === 'All'
    ? MOCK_PIZZAS
    : MOCK_PIZZAS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* 1. Minimalist Premium Hero Section with Subtle Texture */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-subtle-pattern">
        {/* Soft Warm Ambient Accent Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/60 border border-orange-200/80 text-[#D94E1F] text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" /> Artisan Sourdough & Wood-Fired
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1]">
                Crafted with passion. <br />
                <span className="text-[#FF6B35]">Delivered with precision.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-lg">
                Slow-fermented sourdough, San Marzano tomatoes, and fresh burrata—baked in 90 seconds at 900°F.
              </p>

              {/* Minimal Search Bar */}
              <div className="p-1.5 rounded-2xl bg-white/90 backdrop-blur-xs border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-2 max-w-xl">
                <div className="flex items-center gap-3 px-4 py-3 w-full">
                  <Search className="w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter delivery address..."
                    className="w-full text-sm font-medium text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
                  />
                </div>
                <Link
                  href="/menu"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FF6B35] text-white text-sm font-bold shadow-md shadow-orange-500/20 hover:bg-[#E85A24] transition-all whitespace-nowrap text-center flex items-center justify-center gap-2 group"
                >
                  Order Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Minimal Stats */}
              <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="text-xl font-black text-stone-900">15 <span className="text-xs font-bold text-[#FF6B35]">min</span></div>
                  <div className="text-xs text-stone-500 mt-0.5 font-medium">Average delivery</div>
                </div>
                <div>
                  <div className="text-xl font-black text-stone-900">72 <span className="text-xs font-bold text-amber-500">hours</span></div>
                  <div className="text-xs text-stone-500 mt-0.5 font-medium">Dough ferment</div>
                </div>
                <div>
                  <div className="text-xl font-black text-stone-900">4.9 ★</div>
                  <div className="text-xs text-stone-500 mt-0.5 font-medium">15k+ reviews</div>
                </div>
              </div>
            </div>

            {/* Right Minimal Visual */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-stone-100">
                  <img
                    src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=85"
                    alt="Gourmet Wood-Fired Pepperoni Pizza"
                    className="w-full h-[460px] object-cover"
                  />
                  {/* Subtle Gradient & Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-[#FF6B35] text-[10px] font-bold uppercase tracking-widest text-white">Hot Seller</span>
                      <h3 className="text-lg font-bold mt-1">Truffle Pepperoni Supreme</h3>
                    </div>
                    <span className="text-xl font-black text-amber-300">$22.99</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Category Selector */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Explore Categories</h2>
            <Link href="/menu" className="text-xs font-bold text-[#FF6B35] flex items-center gap-1 hover:underline">
              View Full Menu <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#FF6B35] text-white shadow-md scale-105'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Pizzas Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Chef's Recommendations</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Our Signature Oven Pizzas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Custom Pizza Builder CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-[#FFB703] text-xs font-extrabold">
              <Sparkles className="w-4 h-4" /> Interactive Custom Builder
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Create Your Own Masterpiece.
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Select your custom crust, artisan sauce, gourmet cheese blend, and fresh toppings with our 5-step visual wizard.
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF6B35] text-white text-sm font-bold shadow-lg hover:bg-[#E85A24] transition-all hover:scale-105"
            >
              Launch Pizza Builder <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-40 mix-blend-overlay">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80" alt="Wood-fired oven" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 5. Special Offer Coupon */}
      <section className="py-12 bg-amber-500/10 border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FFB703] flex items-center justify-center text-gray-900 text-2xl font-black shadow-sm">
              %
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Get 50% Off Your First Gourmet Order</h3>
              <p className="text-xs text-gray-600">Use promo code <strong className="text-gray-900 px-2 py-0.5 bg-white rounded border border-gray-300 font-mono">PIZZADASH50</strong> at checkout.</p>
            </div>
          </div>
          <Link href="/menu" className="px-6 py-3 rounded-2xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition-colors">
            Claim Offer Now
          </Link>
        </div>
      </section>
    </div>
  );
}
