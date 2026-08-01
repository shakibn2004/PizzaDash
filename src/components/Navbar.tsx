'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Pizza, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const pathname = usePathname();
  const { totalItemCount } = useCart();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#1A1614]/90 backdrop-blur-xl border-b border-[#D4A373]/15 shadow-lg shadow-black/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 group-hover:bg-[#E85A24] transition-all">
            <Pizza className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#F5EBE0]">
              PIZZA<span className="text-[#FF6B35]">DASH</span>
            </span>
            <span className="hidden sm:block text-[10px] font-bold tracking-widest text-[#D4A373]/70 uppercase -mt-1">
              Wood-Fired Artisanal
            </span>
          </div>
        </Link>

        {/* Location Selector */}
        <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#26221F] border border-[#D4A373]/20 text-xs font-semibold text-[#F5EBE0]/90 hover:border-[#FF6B35]/50 hover:bg-[#2F2A26] transition-all cursor-pointer shrink-0">
          <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span className="whitespace-nowrap">Deliver to: <strong className="text-[#F5EBE0] font-bold">Downtown Seattle</strong></span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-[#FF6B35] text-white font-bold tracking-wide whitespace-nowrap">15m ETD</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#F5EBE0]/75 shrink-0">
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
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] font-bold text-xs hover:bg-[#FF6B35]/25 transition-all whitespace-nowrap ${
              pathname === '/builder' ? 'ring-2 ring-[#FF6B35]/40 bg-[#FF6B35]/25' : ''
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
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/menu" className="p-2.5 rounded-xl hover:bg-[#26221F] text-[#F5EBE0]/80 transition-colors md:hidden">
            <Search className="w-5 h-5" />
          </Link>

          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#F5EBE0] bg-[#26221F] hover:bg-[#2F2A26] border border-[#D4A373]/20 transition-all whitespace-nowrap"
          >
            <User className="w-4 h-4 text-[#D4A373]" />
            <span className="hidden sm:inline">Sign In</span>
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold shadow-md shadow-orange-500/25 hover:bg-[#E85A24] transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white text-[#FF6B35] text-[11px] font-extrabold shadow-xs">
                {totalItemCount}
              </span>
            )}
          </Link>

          <Link
            href="/admin"
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#26221F] border border-[#D4A373]/20 text-[#D4A373] text-[11px] font-bold hover:bg-[#FF6B35] hover:text-white hover:border-transparent transition-all whitespace-nowrap"
          >
            Admin UI
          </Link>
        </div>
      </div>
    </header>
  );
};
