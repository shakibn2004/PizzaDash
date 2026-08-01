'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Pizza, MapPin, Sparkles, Bot, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const pathname = usePathname();
  const { totalItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-[#D4A373]/25 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 group-hover:bg-[#E85A24] transition-all">
            <Pizza className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
              PIZZA<span className="text-[#FF6B35]">DASH</span>
            </span>
            <span className="hidden sm:block text-[10px] font-bold tracking-widest text-stone-400 uppercase -mt-1">
              Wood-Fired Artisanal
            </span>
          </div>
        </Link>

        {/* Location Selector */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-stone-200/90 text-xs font-semibold text-stone-700 hover:border-[#FF6B35]/40 hover:bg-orange-50/50 transition-all cursor-pointer shrink-0 shadow-2xs">
          <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span className="whitespace-nowrap">Deliver to: <strong className="text-stone-900 font-bold">Downtown Seattle</strong></span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35] text-white font-bold tracking-wide whitespace-nowrap">15m ETD</span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-stone-600 shrink-0">
          <Link
            href="/menu"
            className={`hover:text-[#FF6B35] transition-colors relative py-1 whitespace-nowrap ${
              pathname === '/menu' ? 'text-[#FF6B35] font-bold' : ''
            }`}
          >
            Menu
            {pathname === '/menu' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35] rounded-full" />
            )}
          </Link>

          <Link
            href="/builder"
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-100/70 border border-orange-200/80 text-[#FF6B35] font-bold text-xs hover:bg-orange-100 transition-all whitespace-nowrap ${
              pathname === '/builder' ? 'ring-2 ring-[#FF6B35]/30 bg-orange-100' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            Custom Builder
          </Link>

          <Link
            href="/dashboard"
            className={`hover:text-[#FF6B35] transition-colors relative py-1 whitespace-nowrap ${
              pathname === '/dashboard' ? 'text-[#FF6B35] font-bold' : ''
            }`}
          >
            Dashboard
            {pathname === '/dashboard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35] rounded-full" />
            )}
          </Link>

          <Link
            href="/tracking/ORD-94821"
            className={`hover:text-[#FF6B35] transition-colors relative py-1 whitespace-nowrap ${
              pathname.startsWith('/tracking') ? 'text-[#FF6B35] font-bold' : ''
            }`}
          >
            Track Order
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Ask AI Button (Styled for all screens) */}
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-orange-100/90 border border-orange-200/90 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs group"
          >
            <Bot className="w-4 h-4 text-[#FF6B35] group-hover:text-white transition-colors shrink-0" />
            <span className="text-xs font-extrabold">Ask AI</span>
          </button>

          <Link
            href="/auth/login"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200/90 transition-all whitespace-nowrap shadow-2xs"
          >
            <User className="w-4 h-4 text-stone-500" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:bg-[#E85A24] transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-white text-[#FF6B35] text-[11px] font-extrabold shadow-xs">
                {totalItemCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin"
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-100/80 border border-orange-200/80 text-[#FF6B35] text-[11px] font-bold hover:bg-[#FF6B35] hover:text-white transition-all whitespace-nowrap shadow-2xs"
          >
            Admin UI
          </Link>

          {/* Mobile Hamburger Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-stone-200/80 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-300">
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-stone-800 hover:bg-orange-50 hover:text-[#FF6B35]"
          >
            Menu
          </Link>
          <Link
            href="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-[#FF6B35] bg-orange-50/80 border border-orange-200/80"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Custom Builder
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35] text-white">Hot</span>
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-stone-800 hover:bg-orange-50 hover:text-[#FF6B35]"
          >
            Dashboard
          </Link>
          <Link
            href="/tracking/ORD-94821"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-bold text-stone-800 hover:bg-orange-50 hover:text-[#FF6B35]"
          >
            Track Order
          </Link>
          
          <div className="pt-2 border-t border-stone-200/60 flex items-center gap-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-stone-800 bg-white border border-stone-200 shadow-2xs"
            >
              <User className="w-4 h-4 text-stone-500" /> Sign In
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#FF6B35] bg-orange-100/80 border border-orange-200/80"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
