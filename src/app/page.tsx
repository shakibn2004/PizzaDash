'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Sparkles, Flame, Clock, ArrowRight, ShieldCheck, Star, Truck, Award, Zap, ChevronRight, CheckCircle2, Heart, ShoppingBag, Bot } from 'lucide-react';
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

  const marqueePizzas = [...MOCK_PIZZAS, ...MOCK_PIZZAS];

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 bg-subtle-pattern overflow-x-hidden">
      
      {/* 1. Ultra-Luxury Light Warm Hero Section */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
        {/* Ambient Soft Gold/Orange Radial Background Glows */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#FF6B35]/15 via-amber-200/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-[400px] h-[300px] bg-gradient-to-bl from-amber-300/20 via-orange-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Main Feature Banner (Left 8 cols) - Glassmorphic Luxury Container */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-8 relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-[#FFFDF9] to-orange-50/50 border border-orange-200/90 shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 group hover:shadow-orange-500/10 transition-all duration-500"
            >
              <div className="relative z-10 max-w-xl space-y-6 text-stone-900">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-100/90 to-amber-100/90 border border-orange-200 text-[#D94E1F] text-xs font-black tracking-wide shadow-2xs">
                  <Sparkles className="w-4 h-4 text-[#FF6B35] animate-pulse" /> 
                  <span>Artisanal 72-Hour Sourdough Ferment</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-stone-900">
                  Crafted Slow. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-[#E85A24] to-amber-600">
                    Baked at 900°F.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed">
                  Handcrafted wood-fired sourdough pizzas, 100% imported San Marzano DOP tomatoes, and fresh burrata delivered piping hot in 15 minutes.
                </p>

                {/* Integrated Search Bar with Clean Inline Ask AI Button */}
                <div className="p-1.5 rounded-2xl bg-white shadow-lg shadow-orange-950/5 flex items-center gap-2 max-w-md border border-orange-200/90 hover:border-[#FF6B35]/50 transition-all">
                  <div className="flex items-center gap-2.5 px-3 py-2 w-full">
                    <Search className="w-4 h-4 text-[#FF6B35] shrink-0" />
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter delivery address..."
                      className="w-full text-xs font-semibold text-stone-800 placeholder-stone-400 bg-transparent focus:outline-none"
                    />
                  </div>
                  
                  <button
                    type="button"
                    className="px-3.5 py-3 rounded-xl bg-orange-100/80 hover:bg-[#FF6B35] text-[#FF6B35] hover:text-white border border-orange-200 text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 group"
                  >
                    <Bot className="w-4 h-4 text-[#FF6B35] group-hover:text-white transition-colors" />
                    <span>Ask AI</span>
                  </button>

                  <Link
                    href="/menu"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#E85A24] text-white text-xs font-black hover:opacity-95 shadow-md shadow-orange-500/25 transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0 hover:scale-[1.02] active:scale-95"
                  >
                    Order Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Live Stats Badge */}
                <div className="pt-2 flex items-center gap-6 text-xs font-bold text-stone-700 border-t border-orange-100">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#FF6B35]" />
                    <span>90 Sec Fire Bake</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>15m Express ETD</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.9 Star Rated</span>
                  </div>
                </div>
              </div>

              {/* Framed Floating Pizza Showcase Card */}
              <div className="relative w-full lg:w-72 h-64 lg:h-84 rounded-2xl overflow-hidden shrink-0 border-2 border-orange-200/80 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=85"
                  alt="Wood-Fired Pizza Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-stone-900 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[10px] font-black text-[#FF6B35] uppercase tracking-wider block">Signature Item</span>
                    <h4 className="text-xs font-black text-stone-900">Truffle Pepperoni</h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FF6B35] text-white text-xs font-black">$18.99</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side Promo Cards (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 lg:gap-6">
              
              {/* Promo Card 1 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <Link href="/builder" className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-amber-50/40 border border-orange-200/80 shadow-lg h-[200px] sm:h-[228px] p-6 flex flex-col justify-between block hover:border-[#FF6B35] hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-black uppercase tracking-wider shadow-2xs">Interactive</span>
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all shadow-2xs">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl mb-1 block">👨‍🍳</span>
                    <h3 className="text-xl font-black text-stone-900 group-hover:text-[#FF6B35] transition-colors">Custom Pizza Builder</h3>
                    <p className="text-xs text-stone-500 font-medium mt-1">Mix artisan sourdough crust, sauces & fresh toppings</p>
                  </div>
                </Link>
              </motion.div>

              {/* Promo Card 2 */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Link href="/menu" className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-orange-50/40 border border-orange-200/80 shadow-lg h-[200px] sm:h-[228px] p-6 flex flex-col justify-between block hover:border-[#FF6B35] hover:shadow-xl transition-all">
                  <div className="flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-[#FF6B35] border border-orange-200 text-[10px] font-black uppercase tracking-wider shadow-2xs">Fast Delivery</span>
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all shadow-2xs">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-2xl mb-1 block">🚀</span>
                    <h3 className="text-xl font-black text-stone-900 group-hover:text-[#FF6B35] transition-colors">15-20 Min Guarantee</h3>
                    <p className="text-xs text-stone-500 font-medium mt-1">Wood-fired perfection delivered piping hot to your door</p>
                  </div>
                </Link>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Framer Motion Infinite Horizontal Scrolling Showcase (Light Warm Theme) */}
      <section className="py-6 bg-white border-y border-orange-200/60 shadow-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] animate-ping" />
            <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Live Trending Oven Showcase</h3>
          </div>
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Continuous 360° Rotational Bake</span>
        </div>

        {/* Infinite Marquee Track */}
        <div className="relative flex overflow-hidden select-none py-1">
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
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-orange-50/40 border border-orange-200/60 hover:border-[#FF6B35] hover:bg-white hover:shadow-md transition-all shrink-0 group"
              >
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-12 h-12 rounded-xl object-cover border border-orange-200/80 group-hover:scale-105 transition-transform"
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

      {/* 3. Value Proposition Bar */}
      <section className="py-6 bg-[#FFFDF9] border-b border-orange-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-orange-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF6B35] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">15-Min Express</h4>
                <p className="text-[11px] text-stone-500">Piping hot delivery</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-orange-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">100% Organic</h4>
                <p className="text-[11px] text-stone-500">San Marzano tomatoes</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-orange-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">900°F Wood-Fired</h4>
                <p className="text-[11px] text-stone-500">Baked in 90 seconds</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-orange-200/60 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
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

      {/* 4. Grid Category Showcase */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">Browse by Category</h2>
              <p className="text-xs text-stone-500 mt-1">Explore our handcrafted gourmet pizza collections</p>
            </div>
            <Link href="/menu" className="text-xs font-bold text-[#FF6B35] flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex flex-col items-center justify-center p-5 rounded-3xl border text-center transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-white border-[#FF6B35] shadow-lg ring-2 ring-[#FF6B35]/20 scale-102'
                    : 'bg-white/80 border-orange-200/60 hover:border-orange-300 hover:shadow-xs'
                }`}
              >
                <span className="text-3xl mb-2.5">{categoryIcons[cat] || '🍕'}</span>
                <span className="text-xs font-black text-stone-900">{cat}</span>
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
          <div className="flex items-center justify-between mb-8 border-b border-orange-200/60 pb-4">
            <div>
              <span className="text-xs font-extrabold text-[#FF6B35] uppercase tracking-wider">Recommended For You</span>
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

      {/* 6. Webild Coffee-Shop Lengthy Section: Quality Ingredients */}
      <section className="py-16 bg-white border-y border-orange-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-widest">Quality Ingredients</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Why Our Pizzas Taste Exceptional
            </h2>
            <p className="text-sm text-stone-500 font-normal">
              We never compromise on authentic Italian sourdough baking traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-orange-50/30 border border-orange-200/60 text-center space-y-4 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center mx-auto text-2xl font-black">
                🌾
              </div>
              <h3 className="text-lg font-black text-stone-900">72-Hour Fermented Dough</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Made using organic Type 00 Italian flour, slow-fermented for 3 days for maximum flavor digestability and air pockets.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-orange-50/30 border border-orange-200/60 text-center space-y-4 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl font-black">
                🍅
              </div>
              <h3 className="text-lg font-black text-stone-900">San Marzano DOP Tomatoes</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Imported directly from the volcanic soil of Mount Vesuvius in Naples, providing a naturally sweet acidity.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-orange-50/30 border border-orange-200/60 text-center space-y-4 hover:shadow-xl transition-all">
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

      {/* 7. Webild Coffee-Shop Lengthy Section: Customer Testimonials */}
      <section className="py-16 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-widest">Verified Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Loved by 15,000+ Pizza Lovers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-orange-200/60 space-y-4 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "The Truffle Pepperoni is hands down the best wood-fired pizza in Seattle! The sourdough crust is crisp and airy."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <div className="w-9 h-9 rounded-full bg-[#FF6B35] font-bold text-xs flex items-center justify-center text-white">
                  MS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Marcus Sterling</h4>
                  <p className="text-[10px] text-stone-400">Verified Buyer • 2 days ago</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-orange-200/60 space-y-4 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "15 minute delivery guarantee was actually real! Arrived piping hot with melted burrata right at my doorstep."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <div className="w-9 h-9 rounded-full bg-amber-500 font-bold text-xs flex items-center justify-center text-white">
                  EK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Elena Rostova</h4>
                  <p className="text-[10px] text-stone-400">Verified Buyer • Yesterday</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-orange-200/60 space-y-4 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                ★★★★★
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "The custom pizza builder is so smooth to use. You can literally select dough, sauces and watch your price dynamically calculate."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <div className="w-9 h-9 rounded-full bg-emerald-600 font-bold text-xs flex items-center justify-center text-white">
                  DR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">David Reed</h4>
                  <p className="text-[10px] text-stone-400">Verified Buyer • 4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ultra-Premium Polish: Interactive Custom Pizza Builder Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#FFFDF9] to-orange-50/60 border border-orange-200/90 p-8 sm:p-14 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
          
          {/* Decorative Warm Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/30 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-[#FF6B35] text-xs font-black tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" /> Interactive Custom Builder
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 leading-[1.15]">
                Create Your Own <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] via-[#E85A24] to-amber-600">
                  Gourmet Masterpiece.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed max-w-lg">
                Mix and match 72-hour artisan sourdough crusts, signature San Marzano tomato sauces, imported cheeses, and 20+ gourmet toppings with real-time price estimation.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1 max-w-md">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-700 bg-white/80 p-2.5 rounded-xl border border-orange-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" /> Real-time Price Calculator
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-stone-700 bg-white/80 p-2.5 rounded-xl border border-orange-100">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" /> 20+ Artisanal Toppings
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FF6B35] text-white text-xs font-black shadow-lg shadow-orange-500/25 hover:bg-[#E85A24] transition-all hover:scale-102 active:scale-95"
                >
                  Launch Interactive Builder <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side Framed Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-orange-200/80 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85"
                  alt="Chef Crafting Pizza"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                
                {/* Floating Chef Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-stone-900 flex items-center gap-3 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B35] text-white font-black flex items-center justify-center text-lg shrink-0">
                    👨‍🍳
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900">Crafted by Master Pizzaiolo</h4>
                    <p className="text-[11px] text-stone-500 font-medium">Handcrafted with precision & passion</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
