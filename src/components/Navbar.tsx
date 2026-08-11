'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Pizza, MapPin, Sparkles, Bot, Menu as MenuIcon, X, LogOut, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AskAiModal } from '@/components/AskAiModal';

export const Navbar = () => {
  const pathname = usePathname();
  const { totalItemCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAdmin = pathname.startsWith('/admin');

  // Close profile dropdown when clicking outside window
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }

    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  if (isAdmin) return null;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-xl border-b border-[#D4A373]/25 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 group-hover:bg-[#E85A24] transition-all">
              <Pizza className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black tracking-tight text-stone-900">
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
            <span className="whitespace-nowrap">Deliver to: <strong className="text-stone-900 font-bold">{user?.address || 'Banani, Dhaka'}</strong></span>
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
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ml-2 sm:ml-6 lg:ml-10">
            
            {/* Ask AI Button */}
            <button 
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-orange-100/90 border border-orange-200/90 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap shadow-2xs group"
            >
              <Bot className="w-4 h-4 text-[#FF6B35] group-hover:text-white transition-colors shrink-0" />
              <span className="text-xs font-extrabold">Ask AI</span>
            </button>

            {/* User Auth Profile / Login */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-bold shadow-2xs hover:bg-stone-50 cursor-pointer transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF6B35] text-white flex items-center justify-center text-[10px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[90px] truncate">{user.name}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-stone-100 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900 truncate">{user.name}</p>
                      <p className="text-[10px] text-stone-500 truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-orange-100 text-[#FF6B35] text-[9px] font-black uppercase">
                          Admin
                        </span>
                      )}
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-[#FF6B35]"
                      >
                        <Shield className="w-3.5 h-3.5 text-[#FF6B35]" /> Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-orange-50 hover:text-[#FF6B35]"
                    >
                      <User className="w-3.5 h-3.5 text-stone-400" /> My Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200/90 transition-all whitespace-nowrap shadow-2xs"
              >
                <User className="w-4 h-4 text-stone-500" />
                <span>Sign In</span>
              </Link>
            )}

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
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-[#FF6B35] bg-orange-50/80 border border-orange-200/80"
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
            
            <div className="pt-2 border-t border-stone-200/60 flex flex-col gap-2">
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-200"
                >
                  <LogOut className="w-4 h-4" /> Sign Out ({user.name})
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-stone-800 bg-white border border-stone-200 shadow-2xs"
                >
                  <User className="w-4 h-4 text-stone-500" /> Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <AskAiModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};
