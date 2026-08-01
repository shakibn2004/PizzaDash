'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pizza, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer className="bg-[#FAF8F5] border-t border-stone-200/80 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Pizza className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-stone-900">
                PIZZA<span className="text-[#FF6B35]">DASH</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm">
              Artisanal wood-fired sourdough pizzas baked at 900°F and delivered piping hot in 15 minutes. Pure Italian ingredients crafted with passion.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-stone-800">Seattle Oven Active • Kitchen Open</span>
            </div>
          </div>

          {/* Menu Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">Menu Specialties</h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-600">
              <li><Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Truffle Pepperoni</Link></li>
              <li><Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Margherita Burrata Gold</Link></li>
              <li><Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Fiery Calabrian BBQ</Link></li>
              <li><Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Garden Harvest Vegan</Link></li>
              <li><Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Quattro Formaggi</Link></li>
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold text-stone-600">
              <li><Link href="/builder" className="hover:text-[#FF6B35] transition-colors">Custom Pizza Builder</Link></li>
              <li><Link href="/menu" className="hover:text-[#FF6B35] transition-colors">Full Food Menu</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#FF6B35] transition-colors">Customer Dashboard</Link></li>
              <li><Link href="/tracking/ORD-94821" className="hover:text-[#FF6B35] transition-colors">Live Order Tracking</Link></li>
              <li><Link href="/admin" className="hover:text-[#FF6B35] transition-colors flex items-center gap-1">Admin Panel <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Store Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-stone-900">Oven Hours & Address</h4>
            <div className="space-y-2 text-xs text-stone-600">
              <p><strong className="text-stone-800">Mon - Sun:</strong> 11:00 AM - 11:00 PM</p>
              <p><strong className="text-stone-800">Address:</strong> 1000 2nd Ave, Downtown Seattle, WA 98104</p>
              <p><strong className="text-stone-800">Hotline:</strong> (555) 234-PIZZA</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} PizzaDash Gourmet Co. All rights reserved.</p>
          <div className="flex items-center gap-6 font-semibold">
            <Link href="#" className="hover:text-stone-800 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-stone-800 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-stone-800 transition-colors">Hygiene Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
