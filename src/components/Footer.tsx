'use client';

import React from 'react';
import Link from 'next/link';
import { Pizza, ShieldCheck, Heart, Clock, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#FF6B35]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Lightning 15-Min Delivery</h4>
              <p className="text-xs text-gray-400">Guaranteed piping hot to your door</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-[#FFB703]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Artisan Ingredients</h4>
              <p className="text-xs text-gray-400">100% organic Italian import</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-[#2EC4B6]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Zero Contact Delivery</h4>
              <p className="text-xs text-gray-400">Sealed box & contact-free handover</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Loved by 50,000+ Foodies</h4>
              <p className="text-xs text-[#A39B8B]">4.9/5 stars over 12,000 reviews</p>
            </div>
          </div>
        </div>

        {/* Footer Links Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-lg shadow-orange-500/25">
                <Pizza className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#F5EBE0]">
                PIZZA<span className="text-[#FF6B35]">DASH</span>
              </span>
            </div>
            <p className="text-xs text-[#A39B8B] leading-relaxed max-w-sm">
              Artisanal wood-fired sourdough pizzas baked at 900°F and delivered piping hot in 15 minutes. Pure Italian ingredients crafted with passion.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-400">Kitchen Open • Accepting Orders Now</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="/menu" className="hover:text-white transition-colors">Our Full Menu</Link></li>
              <li><Link href="/builder" className="hover:text-white transition-colors">Custom Pizza Builder</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
              <li><Link href="/tracking/ORD-94821" className="hover:text-white transition-colors">Live Order Tracker</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="/menu?cat=Specialty" className="hover:text-white transition-colors">Specialty Truffle Pizzas</Link></li>
              <li><Link href="/menu?cat=Classic" className="hover:text-white transition-colors">Classic Neapolitan</Link></li>
              <li><Link href="/menu?cat=Veggie" className="hover:text-white transition-colors">Vegan & Vegetarian</Link></li>
              <li><Link href="/menu?cat=Spicy" className="hover:text-white transition-colors">Spicy BBQ & Hot Honey</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Admin & Legal</h4>
            <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
              <li><Link href="/admin" className="text-[#FF6B35] font-bold hover:underline">Admin Analytics UI</Link></li>
              <li><Link href="/admin/orders" className="hover:text-white transition-colors">Live Orders Queue</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center text-xs text-gray-500">
          <p>© 2026 PizzaDash Inc. Premium UI/UX Showcase designed for SaaS portfolios.</p>
          <div className="mt-4 md:mt-0 flex justify-center gap-6">
            <span>Designed with ❤️ by DeepMind AI Pair</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
