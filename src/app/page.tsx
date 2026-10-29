'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal, Stagger, StaggerItem, CountUp, TiltCard, EASE_OUT } from '@/components/motion/Motion';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, Zap, CheckCircle2 } from 'lucide-react';
import { MOCK_PIZZAS } from '@/data/mockData';
import { PizzaCard } from '@/components/PizzaCard';
import { AskAiModal } from '@/components/AskAiModal';
import { PremiumHero } from '@/components/home/PremiumHero';
import { SignatureCarousel } from '@/components/home/SignatureCarousel';

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#FFFDF9] text-stone-800 bg-subtle-pattern overflow-x-hidden">

      {/* 1. Premium hero + 2. Signature carousel */}
      <PremiumHero />
      <SignatureCarousel />

      {/* 3. Value Proposition Bar */}
      <section className="py-6 bg-[#FFFDF9] border-b border-orange-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
            {[
              { icon: Truck, title: '15-Min Express', sub: 'Piping hot delivery', tone: 'bg-orange-100 text-[#FF6B35]' },
              { icon: Award, title: '100% Organic', sub: 'San Marzano tomatoes', tone: 'bg-amber-100 text-amber-600' },
              { icon: Zap, title: '900°F Wood-Fired', sub: 'Baked in 90 seconds', tone: 'bg-emerald-100 text-emerald-600' },
              { icon: ShieldCheck, title: 'Hygiene Certified', sub: '100% Sealed delivery', tone: 'bg-purple-100 text-purple-600' },
            ].map(({ icon: Icon, title, sub, tone }) => (
              <StaggerItem key={title} hoverLift className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-orange-200/60 shadow-2xs hover:shadow-md hover:border-orange-300 transition-[box-shadow,border-color]">
                <motion.div
                  whileHover={{ rotate: [0, -12, 12, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone}`}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{title}</h4>
                  <p className="text-[11px] text-stone-500">{sub}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 4. Grid Category Showcase */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight">Browse by Category</h2>
              <p className="text-xs text-stone-500 mt-1">Explore our handcrafted gourmet pizza collections</p>
            </div>
            <Link href="/menu" className="group text-xs font-bold text-[#FF6B35] flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <StaggerItem key={cat}>
                  <motion.button
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-full flex flex-col items-center justify-center p-5 rounded-3xl border text-center transition-colors duration-300 cursor-pointer ${
                      active
                        ? 'bg-white border-[#FF6B35] shadow-lg'
                        : 'bg-white/80 border-orange-200/60 hover:border-orange-300 hover:shadow-xs'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="category-ring"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-3xl ring-2 ring-[#FF6B35]/30 bg-orange-50/60 -z-0"
                      />
                    )}
                    <motion.span
                      animate={active ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative text-3xl mb-2.5"
                    >
                      {categoryIcons[cat] || '🍕'}
                    </motion.span>
                    <span className="relative text-xs font-black text-stone-900">{cat}</span>
                    <span className="relative text-[10px] font-semibold text-stone-400 mt-0.5">
                      {cat === 'All' ? MOCK_PIZZAS.length : MOCK_PIZZAS.filter(p => p.category === cat).length} items
                    </span>
                  </motion.button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 5. Featured Pizzas Product Grid */}
      <section className="pb-16 pt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-between mb-8 border-b border-orange-200/60 pb-4">
            <div>
              <span className="text-xs font-extrabold text-[#FF6B35] uppercase tracking-wider">Recommended For You</span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-stone-900 tracking-tight mt-0.5">
                Signature Wood-Fired Pizzas
              </h2>
            </div>
            <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
              Showing{' '}
              <motion.span
                key={filteredPizzas.length}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block font-black text-[#FF6B35]"
              >
                {filteredPizzas.length}
              </motion.span>{' '}
              gourmet pizzas
            </span>
          </Reveal>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPizzas.map((pizza, i) => (
                <motion.div
                  key={pizza.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: EASE_OUT }}
                >
                  <PizzaCard pizza={pizza} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 6. Webild Coffee-Shop Lengthy Section: Quality Ingredients */}
      <section className="py-16 bg-white border-y border-orange-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-widest">Quality Ingredients</span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
              Why Our Pizzas Taste Exceptional
            </h2>
            <p className="text-sm text-stone-500 font-normal">
              We never compromise on authentic Italian sourdough baking traditions.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem hoverLift className="group p-8 rounded-3xl bg-orange-50/30 border border-orange-200/60 text-center space-y-4 hover:shadow-xl hover:bg-white transition-[box-shadow,background-color]">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                🌾
              </div>
              <h3 className="text-lg font-black text-stone-900">72-Hour Fermented Dough</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Made using organic Type 00 Italian flour, slow-fermented for 3 days for maximum flavor digestability and air pockets.
              </p>
            </StaggerItem>

            <StaggerItem hoverLift className="group p-8 rounded-3xl bg-orange-50/30 border border-orange-200/60 text-center space-y-4 hover:shadow-xl hover:bg-white transition-[box-shadow,background-color]">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                🍅
              </div>
              <h3 className="text-lg font-black text-stone-900">San Marzano DOP Tomatoes</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Imported directly from the volcanic soil of Mount Vesuvius in Naples, providing a naturally sweet acidity.
              </p>
            </StaggerItem>

            <StaggerItem hoverLift className="group p-8 rounded-3xl bg-orange-50/30 border border-orange-200/60 text-center space-y-4 hover:shadow-xl hover:bg-white transition-[box-shadow,background-color]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-black group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                🔥
              </div>
              <h3 className="text-lg font-black text-stone-900">900°F Oak Wood Oven</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Flash baked in under 90 seconds in authentic Valoriani brick ovens for perfect leoparding and crispy crust.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* 7. Webild Coffee-Shop Lengthy Section: Customer Testimonials */}
      <section className="py-16 bg-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-widest">Verified Customer Reviews</span>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
              Loved by <span className="text-[#FF6B35]"><CountUp to={15000} suffix="+" /></span> Pizza Lovers
            </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem hoverLift className="p-6 rounded-3xl bg-white border border-orange-200/60 space-y-4 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[0, 1, 2, 3, 4].map((n) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.3 + n * 0.07 }}
                  >
                    ★
                  </motion.span>
                ))}
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
            </StaggerItem>

            <StaggerItem hoverLift className="p-6 rounded-3xl bg-white border border-orange-200/60 space-y-4 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[0, 1, 2, 3, 4].map((n) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.3 + n * 0.07 }}
                  >
                    ★
                  </motion.span>
                ))}
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
            </StaggerItem>

            <StaggerItem hoverLift className="p-6 rounded-3xl bg-white border border-orange-200/60 space-y-4 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                {[0, 1, 2, 3, 4].map((n) => (
                  <motion.span
                    key={n}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.3 + n * 0.07 }}
                  >
                    ★
                  </motion.span>
                ))}
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
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* 8. Ultra-Premium Polish: Interactive Custom Pizza Builder Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal y={40}>
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#FFFDF9] to-orange-50/60 border border-orange-200/90 p-8 sm:p-14 overflow-hidden shadow-xl hover:shadow-2xl transition-all group">

          {/* Decorative Warm Ambient Glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/30 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-[#FF6B35] text-xs font-black tracking-wide shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" /> Interactive Custom Builder
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.1]">
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
                  className="group/cta inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FF6B35] text-white text-xs font-black shadow-lg shadow-orange-500/25 hover:bg-[#E85A24] transition-all hover:scale-102 active:scale-95"
                >
                  Launch Interactive Builder <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Side Framed Visual Card */}
            <div className="lg:col-span-5 relative">
              <TiltCard max={6} className="relative rounded-2xl overflow-hidden border-2 border-orange-200/80 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85"
                  alt="Chef Crafting Pizza"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

                {/* Floating Chef Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 text-stone-900 flex items-center gap-3 shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                    className="w-10 h-10 rounded-xl bg-[#FF6B35] text-white font-black flex items-center justify-center text-lg shrink-0"
                  >
                    👨‍🍳
                  </motion.div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900">Crafted by Master Pizzaiolo</h4>
                    <p className="text-[11px] text-stone-500 font-medium">Handcrafted with precision & passion</p>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>
        </Reveal>
      </section>

      {/* Ultra-Luxury Ask AI Modal */}
      <AskAiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

    </div>
  );
}
