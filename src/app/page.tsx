'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, Flame, Clock, ArrowRight, ShieldCheck, Star, Truck, Award, Zap, ChevronRight, CheckCircle2, Heart, ShoppingBag } from 'lucide-react';
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

  // Double the list to ensure seamless infinite loop
  const marqueePizzas = [...MOCK_PIZZAS, ...MOCK_PIZZAS];

  return (
    <div className="min-h-screen bg-subtle-pattern overflow-x-hidden">
      
      {/* 1. CameraBazar-Style Split Grid Hero Section */}
      <section className="pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Main Big Feature Banner (Left / Top 8 cols) */}
            <div className="md:col-span-8 relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-xl group min-h-[400px] sm:min-h-[460px] flex items-center">
              <img
                src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1600&q=85"
                alt="Wood-Fired Pizza Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-transparent" />
              
              <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl space-y-6 text-white">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 72-Hour Sourdough Fermentation
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                  Authentic Italian <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-[#FF6B35]">
                    Wood-Fired Pizzas
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-stone-200 font-normal leading-relaxed line-clamp-2">
                  Handcrafted with imported San Marzano tomatoes, fresh burrata, and baked at 900°F in 90 seconds.
                </p>

                {/* Integrated Search bar inside Banner */}
                <div className="p-1.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl flex items-center gap-2 max-w-md border border-white/40">
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
                    className="px-6 py-3 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85A24] shadow-md shadow-orange-500/20 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0"
                  >
                    Order Now <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Slide indicator dots like CameraBazar */}
                <div className="pt-2 flex items-center gap-2">
                  <span className="w-7 h-1.5 rounded-full bg-[#FF6B35]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
              </div>
            </div>

            {/* Right Side Promo Cards (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 lg:gap-6">
              
              {/* Promo Card 1: Custom Builder */}
              <Link href="/builder" className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-lg h-[195px] sm:h-[220px] block">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
                  alt="Custom Pizza Builder"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-[10px] font-extrabold uppercase tracking-wider text-stone-950">Interactive</span>
                    <h3 className="text-lg font-black mt-1 group-hover:text-amber-300 transition-colors">Custom Pizza Builder</h3>
                    <p className="text-xs text-stone-300">Choose crust, sauce & toppings</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-all shadow-md">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>

              {/* Promo Card 2: 15-Min Express Delivery */}
              <Link href="/menu" className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-200/80 shadow-lg h-[195px] sm:h-[220px] block">
                <img
                  src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&w=800&q=80"
                  alt="Express Delivery"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#FF6B35] text-[10px] font-extrabold uppercase tracking-wider">Fast Delivery</span>
                    <h3 className="text-lg font-black mt-1 group-hover:text-amber-300 transition-colors">15-20 Min Guarantee</h3>
                    <p className="text-xs text-stone-300">Delivered piping hot</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#FF6B35] transition-all shadow-md">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Framer Motion Infinite Horizontal Scrolling Showcase (White Premium Aesthetic) */}
      <section className="py-6 bg-white border-y border-stone-200/80 shadow-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-ping" />
            <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Live Trending Oven Showcase</h3>
          </div>
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Continuous 360° Rotational Bake</span>
        </div>

        {/* Infinite Marquee Track */}
        <div className="relative flex overflow-hidden select-none py-1">
          {/* Subtle Side Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex items-center gap-5 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              ease: 'linear',
              duration: 28,
              repeat: Infinity,
            }}
          >
            {marqueePizzas.map((pizza, index) => (
              <Link
                key={`${pizza.id}-${index}`}
                href={`/pizza/${pizza.id}`}
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 hover:border-[#FF6B35] hover:bg-white hover:shadow-md transition-all shrink-0 group"
              >
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="text-xs font-black text-stone-900 group-hover:text-[#FF6B35] transition-colors">{pizza.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                    <span className="font-extrabold text-[#FF6B35]">${pizza.price}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">★ {pizza.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. CameraBazar-Style Value Proposition Bar */}
      <section className="py-4 bg-white/80 border-b border-stone-200/60">
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

      {/* 4. CameraBazar-Style Grid Category Showcase */}
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

      {/* 5. Featured Pizzas Product Grid */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CameraBazar Lengthy Section: Artisan Ingredients Showcase */}
      <section className="py-16 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-widest">Quality Ingredients</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Why Our Pizza Taste Exceptional
            </h2>
            <p className="text-sm text-stone-500 font-normal">
              We never compromise on authentic Italian sourdough baking traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/80 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center mx-auto text-2xl font-black">
                🌾
              </div>
              <h3 className="text-lg font-black text-stone-900">72-Hour Fermented Dough</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Made using organic Type 00 Italian flour, slow-fermented for 3 days for maximum flavor digestability and air pockets.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/80 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl font-black">
                🍅
              </div>
              <h3 className="text-lg font-black text-stone-900">San Marzano DOP Tomatoes</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Imported directly from the volcanic soil of Mount Vesuvius in Naples, providing a naturally sweet acidity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-stone-50 border border-stone-200/80 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black">
                🔥
              </div>
              <h3 className="text-lg font-black text-stone-900">900°F Oak Wood Oven</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Flash baked in under 90 seconds in authentic Valoriani brick ovens for perfect leoparding and crispy crust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CameraBazar Lengthy Section: Customer Testimonial Slider */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Verified Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Loved by 15,000+ Pizza Lovers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                "The Truffle Pepperoni is hands down the best wood-fired pizza in Seattle! The sourdough crust is crisp and airy."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-700/60">
                <div className="w-9 h-9 rounded-full bg-[#FF6B35] font-bold text-xs flex items-center justify-center">
                  MS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Marcus Sterling</h4>
                  <p className="text-[10px] text-stone-400">Verified Buyer • 2 days ago</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                "15 minute delivery guarantee was actually real! Arrived piping hot with melted burrata right at my doorstep."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-700/60">
                <div className="w-9 h-9 rounded-full bg-amber-500 font-bold text-xs flex items-center justify-center">
                  EK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Elena Rostova</h4>
                  <p className="text-[10px] text-stone-400">Verified Buyer • Yesterday</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-stone-300 leading-relaxed italic">
                "The custom pizza builder is so smooth to use. You can literally select dough, sauces and watch your price dynamically calculate."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-700/60">
                <div className="w-9 h-9 rounded-full bg-emerald-600 font-bold text-xs flex items-center justify-center">
                  DR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">David Reed</h4>
                  <p className="text-[10px] text-stone-400">Verified Buyer • 4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Custom Pizza Builder Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-stone-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-stone-800">
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
