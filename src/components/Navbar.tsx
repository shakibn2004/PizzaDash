'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { ShoppingBag, User, MapPin, Bot, LogOut, Shield, ChevronDown, ArrowUpRight, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { AskAiModal } from '@/components/AskAiModal';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/builder', label: 'Builder' },
  { href: '/dashboard', label: 'Dashboard' },
];

const ACCENT = '#E8482A';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

/* ---------- Brand ---------- */

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 shrink-0" aria-label="PizzaDash home">
      <motion.span
        whileHover={{ rotate: -12, scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 400, damping: 14 }}
        className="relative w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]"
      >
        <span className="absolute inset-[3px] rounded-full border border-dashed border-white/25 group-hover:rotate-180 transition-transform duration-[1200ms]" />
        <Flame className="w-[18px] h-[18px] text-[#FF8A5C]" />
      </motion.span>
      <span className="font-display text-[1.6rem] leading-none font-semibold tracking-[-0.02em] text-stone-900">
        Pizza<span className="italic" style={{ color: ACCENT }}>Dash</span>
      </span>
    </Link>
  );
}

/* ---------- Cart ---------- */

function CartButton({ count }: { count: number }) {
  const prev = useRef(count);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    if (count > prev.current) setBump((b) => b + 1);
    prev.current = count;
  }, [count]);

  return (
    <Link href="/cart" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
      <motion.span
        key={bump}
        animate={bump ? { rotate: [0, -14, 10, -6, 0], scale: [1, 1.15, 1] } : undefined}
        transition={{ duration: 0.55 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-11 h-11 rounded-full bg-white/80 backdrop-blur border border-white shadow-sm flex items-center justify-center text-stone-800 hover:text-stone-950"
      >
        <ShoppingBag className="w-[18px] h-[18px]" />
        <AnimatePresence>
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0, y: 4 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 600, damping: 18 }}
              className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full text-[10px] font-black text-white flex items-center justify-center ring-2 ring-[#F7F3EF]"
              style={{ background: ACCENT }}
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </Link>
  );
}

/* ---------- Account ---------- */

function AccountMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  if (!user) {
    return (
      <>
      <Link href="/auth/login" className="hidden lg:inline px-2 text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors">
        Log in
      </Link>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden sm:block">
        <Link
          href="/auth/register"
          className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_-8px_rgba(232,72,42,0.7)]"
          style={{ background: ACCENT }}
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
          Sign Up
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </Link>
      </motion.div>
      </>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/80 backdrop-blur border border-white shadow-sm text-sm font-bold text-stone-800 cursor-pointer"
        aria-expanded={open}
      >
        <span className="w-9 h-9 rounded-full text-white flex items-center justify-center text-xs font-black" style={{ background: ACCENT }}>
          {user.name.charAt(0).toUpperCase()}
        </span>
        <span className="hidden sm:inline max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="hidden sm:inline-flex">
          <ChevronDown className="w-4 h-4 text-stone-500" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            style={{ transformOrigin: 'top right' }}
            className="absolute right-0 mt-3 w-56 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-[0_24px_50px_-16px_rgba(0,0,0,0.25)] p-2 z-50"
          >
            <div className="px-3 py-2.5">
              <p className="text-sm font-bold text-stone-900 truncate">{user.name}</p>
              <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
            </div>
            <div className="h-px bg-stone-200/70 my-1" />
            {user.role === 'admin' && (
              <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100">
                <Shield className="w-4 h-4" style={{ color: ACCENT }} /> Admin dashboard
              </Link>
            )}
            <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-semibold text-stone-700 hover:bg-stone-100">
              <User className="w-4 h-4 text-stone-400" /> My profile
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Hamburger that morphs into an X ---------- */

function Burger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className="md:hidden relative w-11 h-11 rounded-full bg-stone-900 flex items-center justify-center cursor-pointer"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute w-[18px] h-[2px] rounded-full bg-white"
      />
      <motion.span
        animate={open ? { rotate: -45, y: 0, width: 18 } : { rotate: 0, y: 4, width: 12 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute h-[2px] rounded-full bg-white translate-x-[3px]"
        style={{ width: 12 }}
      />
    </button>
  );
}

/* ---------- Navbar ---------- */

export const Navbar = () => {
  const pathname = usePathname();
  const { totalItemCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 16);
    setHidden(y > prev && y > 260 && !mobileOpen);
  });

  // close the mobile sheet whenever the route changes (incl. browser back/forward)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  if (pathname.startsWith('/admin')) return null;

  const activeHref = LINKS.find((l) => isActive(pathname, l.href))?.href;
  const highlight = hovered ?? activeHref;

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        className="sticky top-0 z-50 h-20"
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? 'mt-3 h-16 max-w-6xl rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_18px_40px_-18px_rgba(60,40,20,0.35)] px-3 pl-5 mx-3 sm:mx-6 lg:mx-auto'
              : 'mt-0 h-20 max-w-7xl rounded-none bg-transparent border border-transparent px-4 sm:px-6 lg:px-8'
          }`}
        >
          <Logo />

          {/* Center pill nav */}
          <nav
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white/60 backdrop-blur border border-white shadow-sm"
            onMouseLeave={() => setHovered(null)}
          >
            {LINKS.map((link) => {
              const active = activeHref === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    highlight === link.href ? 'text-white' : active ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {highlight === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full shadow-[0_8px_18px_-8px_rgba(232,72,42,0.8)]"
                      style={{ background: ACCENT }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                  {active && highlight !== link.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -bottom-0.5 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: ACCENT }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden xl:flex items-center gap-1.5 pr-2 text-xs font-semibold text-stone-600">
              <MapPin className="w-3.5 h-3.5" style={{ color: ACCENT }} />
              <span className="max-w-[120px] truncate">{user?.address || 'Banani, Dhaka'}</span>
            </div>

            <motion.button
              type="button"
              onClick={() => setAiOpen(true)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Ask AI for a recommendation"
              className="hidden sm:flex group relative w-11 h-11 rounded-full bg-white/80 backdrop-blur border border-white shadow-sm items-center justify-center text-stone-800 cursor-pointer"
            >
              <Bot className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
              <span className="pointer-events-none absolute top-full mt-2 px-2 py-1 rounded-md bg-stone-900 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                Ask AI
              </span>
            </motion.button>

            <CartButton count={totalItemCount} />
            <AccountMenu />
            <Burger open={mobileOpen} onClick={() => setMobileOpen((o) => !o)} />
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-stone-900/30 backdrop-blur-sm"
            />
            <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              style={{ transformOrigin: 'top center' }}
              className="md:hidden fixed top-[88px] inset-x-3 z-50 rounded-[2rem] bg-[#FBF8F5]/95 backdrop-blur-xl border border-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] p-3"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
                className="space-y-1"
              >
                {LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <motion.li
                      key={link.href}
                      variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl font-display text-2xl font-semibold ${
                          active ? 'text-white' : 'text-stone-900 hover:bg-white'
                        }`}
                        style={active ? { background: ACCENT } : undefined}
                      >
                        {link.label}
                        <ArrowUpRight className={`w-5 h-5 ${active ? 'text-white' : 'text-stone-400'}`} />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-3 pt-3 border-t border-stone-200/70 grid grid-cols-2 gap-2"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setAiOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white border border-stone-200/80 text-sm font-bold text-stone-800"
                >
                  <Bot className="w-4 h-4" /> Ask AI
                </button>
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 border border-red-200 text-sm font-bold text-red-600"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                ) : (
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white"
                    style={{ background: ACCENT }}
                  >
                    Sign Up
                  </Link>
                )}
                <div className="col-span-2 flex items-center justify-center gap-1.5 pt-1 text-xs font-semibold text-stone-500">
                  <MapPin className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  Delivering to {user?.address || 'Banani, Dhaka'} · 15 min
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AskAiModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
};
