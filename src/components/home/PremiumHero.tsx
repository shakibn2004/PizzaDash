'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, BadgePercent, Flame, Star, Timer } from 'lucide-react';
import { EASE_OUT } from '@/components/motion/Motion';

const HERO_PIZZA =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=85';

/* ---------- Illustrated garnish (pure SVG, no image assets) ---------- */

function BasilLeaf({ className, id }: { className?: string; id: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden>
      <defs>
        <linearGradient id={`leaf-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6FBF3B" />
          <stop offset="55%" stopColor="#3E8E22" />
          <stop offset="100%" stopColor="#245A14" />
        </linearGradient>
      </defs>
      <path
        d="M50 4 C82 18 98 58 74 98 C64 114 54 124 50 126 C46 124 36 114 26 98 C2 58 18 18 50 4 Z"
        fill={`url(#leaf-${id})`}
      />
      <path d="M50 10 C49 50 50 90 50 124" stroke="#1F4D10" strokeOpacity="0.45" strokeWidth="2.2" fill="none" />
      {[32, 52, 72, 92].map((y, i) => (
        <g key={y} stroke="#1F4D10" strokeOpacity="0.3" strokeWidth="1.6" fill="none">
          <path d={`M50 ${y} C${38 - i} ${y - 6} ${30 - i} ${y - 2} ${24 + i * 2} ${y + 6}`} />
          <path d={`M50 ${y} C${62 + i} ${y - 6} ${70 + i} ${y - 2} ${76 - i * 2} ${y + 6}`} />
        </g>
      ))}
      <ellipse cx="38" cy="40" rx="8" ry="18" fill="#fff" opacity="0.14" transform="rotate(-20 38 40)" />
    </svg>
  );
}

function Tomato({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <radialGradient id="tomato-body" cx="0.38" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#FF7A5C" />
          <stop offset="45%" stopColor="#E5322B" />
          <stop offset="100%" stopColor="#9E1712" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="64" rx="52" ry="48" fill="url(#tomato-body)" />
      <ellipse cx="42" cy="44" rx="14" ry="8" fill="#fff" opacity="0.35" transform="rotate(-25 42 44)" />
      <path
        d="M60 22 L66 34 L80 30 L70 40 L82 48 L66 46 L60 58 L54 46 L38 48 L50 40 L40 30 L54 34 Z"
        fill="#3D7A1F"
      />
      <path d="M60 24 C61 16 64 10 70 6" stroke="#3D7A1F" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ChiliPepper({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 60" className={className} aria-hidden>
      <defs>
        <linearGradient id="chili" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF5A3C" />
          <stop offset="100%" stopColor="#B3160F" />
        </linearGradient>
      </defs>
      <path d="M22 26 C50 8 96 10 130 44 C100 36 60 42 26 40 C16 39 14 30 22 26 Z" fill="url(#chili)" />
      <path d="M40 22 C62 16 88 18 110 30" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M22 28 C14 24 10 18 6 10" stroke="#3D7A1F" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* ---------- Pointer parallax ---------- */

function Parallax({
  mx,
  my,
  depth,
  className,
  children,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

/** Garnish that flies in from outside, then drifts and sways forever. */
function Garnish({
  children,
  from,
  delay,
  sway = 8,
  bob = 10,
  duration = 6,
}: {
  children: React.ReactNode;
  from: { x: number; y: number; rotate: number };
  delay: number;
  sway?: number;
  bob?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from.x, y: from.y, rotate: from.rotate, scale: 0.4 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 14, delay }}
    >
      <motion.div
        animate={{ y: [0, -bob, 0], rotate: [-sway, sway, -sway] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Headline ---------- */

const LINES: { text: string; accent?: boolean }[] = [
  { text: 'Not just pizza,' },
  { text: "it's a slow-fired" },
  { text: 'ritual.', accent: true },
];

function Headline() {
  let wordIndex = 0;
  return (
    <h1
      className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem] font-semibold tracking-[-0.03em] text-stone-900"
      aria-label={LINES.map((l) => l.text).join(' ')}
    >
      {LINES.map((line) => (
        <span key={line.text} className="block" aria-hidden>
          {line.text.split(' ').map((word) => {
            const i = wordIndex++;
            return (
              <span key={word + i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.22em]">
                <motion.span
                  className={`inline-block ${line.accent ? 'italic text-[#E8482A]' : ''}`}
                  initial={{ y: '115%', rotate: 6 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ duration: 0.95, delay: 0.2 + i * 0.07, ease: EASE_OUT }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
          {line.accent && (
            <motion.svg
              viewBox="0 0 220 24"
              className="inline-block w-[0.9em] sm:w-[1.1em] h-auto -ml-[0.1em] align-baseline text-[#E8482A]"
              aria-hidden
            >
              <motion.path
                d="M4 16 C60 4 150 4 216 14"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 1.1, ease: 'easeInOut' }}
              />
            </motion.svg>
          )}
        </span>
      ))}
    </h1>
  );
}

/* ---------- Social proof ---------- */

const REVIEWERS = [
  { initials: 'MS', from: '#FF8A5C', to: '#E8482A' },
  { initials: 'ER', from: '#F6C453', to: '#E39B1B' },
  { initials: 'DR', from: '#7CC66B', to: '#3E8E22' },
];

function Reviews() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.25, ease: EASE_OUT }}
      className="flex items-center gap-4"
    >
      <div className="flex -space-x-3">
        {REVIEWERS.map((r, i) => (
          <motion.div
            key={r.initials}
            initial={{ scale: 0, x: -10 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 1.35 + i * 0.08 }}
            whileHover={{ y: -4, zIndex: 10 }}
            className="relative w-11 h-11 rounded-full ring-[3px] ring-[#F4F0EC] flex items-center justify-center text-[11px] font-black text-white shadow-md"
            style={{ background: `linear-gradient(135deg, ${r.from}, ${r.to})` }}
          >
            {r.initials}
          </motion.div>
        ))}
        <motion.div
          initial={{ scale: 0, x: -10 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 1.6 }}
          className="relative w-11 h-11 rounded-full ring-[3px] ring-[#F4F0EC] bg-stone-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md"
        >
          15k+
        </motion.div>
      </div>
      <div>
        <div className="flex items-center gap-0.5">
          {[0, 1, 2, 3, 4].map((n) => (
            <motion.span
              key={n}
              initial={{ opacity: 0, scale: 0, rotate: -120 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 14, delay: 1.7 + n * 0.07 }}
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </motion.span>
          ))}
          <span className="ml-1.5 text-sm font-bold text-stone-900">4.9</span>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">Loved by 15,000+ pizza lovers</p>
      </div>
    </motion.div>
  );
}

/* ---------- The plate ---------- */

function Plate({ scrollSpin }: { scrollSpin: MotionValue<number> }) {
  return (
    <motion.div
      initial={{ scale: 0.55, opacity: 0, rotate: -120 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 45, damping: 14, delay: 0.25 }}
      className="relative aspect-square w-full"
    >
      {/* soft contact shadow */}
      <div className="absolute inset-[6%] translate-y-[7%] rounded-full bg-stone-900/25 blur-3xl" />
      {/* plate rim */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B9C3CC] via-[#8C99A6] to-[#6E7B88] shadow-[inset_0_8px_24px_rgba(255,255,255,0.35),inset_0_-12px_30px_rgba(0,0,0,0.25)]" />
      <div className="absolute inset-[3.5%] rounded-full bg-gradient-to-br from-[#9EA9B4] to-[#7D8A97] shadow-[inset_0_6px_18px_rgba(0,0,0,0.25)]" />
      {/* pizza: slow constant spin + extra spin tied to scroll */}
      <motion.div style={{ rotate: scrollSpin }} className="absolute inset-[7%]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        >
          <img
            src={HERO_PIZZA}
            alt="Wood-fired margherita pizza seen from above"
            className="w-full h-full object-cover scale-[1.18]"
            fetchPriority="high"
          />
        </motion.div>
      </motion.div>
      {/* glossy highlight that does not rotate */}
      <div className="pointer-events-none absolute inset-[7%] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.28),transparent_45%)]" />
    </motion.div>
  );
}

/* ---------- Hero ---------- */

export function PremiumHero() {
  const ref = useRef<HTMLElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 70, damping: 18 });
  const my = useSpring(rawY, { stiffness: 70, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollSpin = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
      className="relative -mt-20 pt-20 overflow-hidden bg-[radial-gradient(120%_90%_at_70%_30%,#FBF8F5_0%,#F2EDE8_55%,#E9E3DD_100%)]"
    >
      {/* edge garnish that sits partly off-canvas, like the reference */}
      <Parallax mx={mx} my={my} depth={-50} className="absolute -left-10 top-[58%] w-28 sm:w-36 blur-[2px] opacity-90 pointer-events-none">
        <Garnish from={{ x: -160, y: 40, rotate: -80 }} delay={0.9} sway={10} duration={7}>
          <BasilLeaf id="edge-l" className="w-full rotate-[-35deg] drop-shadow-xl" />
        </Garnish>
      </Parallax>
      <Parallax mx={mx} my={my} depth={-30} className="absolute right-[4%] -top-6 w-16 sm:w-20 blur-[1.5px] pointer-events-none">
        <Garnish from={{ x: 80, y: -140, rotate: 90 }} delay={1} sway={12} duration={8}>
          <BasilLeaf id="edge-tr" className="w-full rotate-[160deg] drop-shadow-lg" />
        </Garnish>
      </Parallax>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Copy */}
          <motion.div style={{ y: copyY }} className="lg:col-span-6 relative z-10 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              className="inline-flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full bg-white/70 backdrop-blur border border-white shadow-sm text-xs font-bold text-stone-700"
            >
              <span className="w-6 h-6 rounded-full bg-[#E8482A] flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-white" />
              </span>
              72-hour sourdough, 900°F oak oven
            </motion.div>

            <Headline />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE_OUT }}
              className="max-w-md text-base sm:text-lg leading-relaxed text-stone-600"
            >
              San Marzano tomatoes, hand-torn burrata and a crust that crackles. Out of the fire and at your door in 15 minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: EASE_OUT }}
              className="flex flex-wrap items-center gap-3"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/menu"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#E8482A] pl-7 pr-2 py-2 text-sm font-bold text-white shadow-[0_12px_30px_-8px_rgba(232,72,42,0.65)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  View Menu
                  <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#E8482A] transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
                  </span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  href="/builder"
                  className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-7 py-4 text-sm font-bold text-stone-800 border border-white shadow-sm hover:bg-white transition-colors"
                >
                  Build Your Own
                </Link>
              </motion.div>
            </motion.div>

            <Reviews />
          </motion.div>

          {/* Visual */}
          <motion.div style={{ y: plateY }} className="lg:col-span-6 relative">
            <div className="relative mx-auto w-[86%] sm:w-[72%] lg:w-[92%] max-w-[560px]">
              <Parallax mx={mx} my={my} depth={18}>
                <Plate scrollSpin={scrollSpin} />
              </Parallax>

              {/* Tomato tucked behind the right rim */}
              <Parallax mx={mx} my={my} depth={42} className="absolute -right-[9%] top-[30%] w-[22%] -z-0">
                <Garnish from={{ x: 160, y: 0, rotate: 120 }} delay={0.75} sway={6} bob={8} duration={6.5}>
                  <Tomato className="w-full drop-shadow-[0_18px_20px_rgba(120,20,10,0.35)]" />
                </Garnish>
              </Parallax>

              {/* Leaves around the plate, different depths */}
              <Parallax mx={mx} my={my} depth={55} className="absolute -left-[8%] top-[40%] w-[15%]">
                <Garnish from={{ x: -140, y: 30, rotate: -90 }} delay={0.85}>
                  <BasilLeaf id="l1" className="w-full rotate-[-40deg] drop-shadow-xl" />
                </Garnish>
              </Parallax>
              <Parallax mx={mx} my={my} depth={35} className="absolute left-[8%] bottom-[2%] w-[9%]">
                <Garnish from={{ x: -60, y: 120, rotate: 60 }} delay={0.95} sway={14} bob={6}>
                  <BasilLeaf id="l2" className="w-full rotate-[25deg] drop-shadow-lg" />
                </Garnish>
              </Parallax>
              <Parallax mx={mx} my={my} depth={65} className="absolute right-[2%] -bottom-[4%] w-[17%]">
                <Garnish from={{ x: 120, y: 140, rotate: -60 }} delay={1.05} sway={9} duration={7.5}>
                  <ChiliPepper className="w-full rotate-[20deg] drop-shadow-[0_14px_14px_rgba(120,20,10,0.3)]" />
                </Garnish>
              </Parallax>

              {/* Glass discount card */}
              <Parallax mx={mx} my={my} depth={28} className="absolute -left-[4%] sm:-left-[10%] top-[4%]">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 1.25 }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="relative rounded-2xl bg-white/75 backdrop-blur-xl border border-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] px-4 py-3 pr-10"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                      className="absolute -top-4 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center"
                    >
                      <BadgePercent className="w-5 h-5 text-[#E8482A]" />
                    </motion.span>
                    <div className="font-display text-2xl font-semibold text-stone-900 leading-none">15%</div>
                    <div className="text-[11px] text-stone-500 mt-1">
                      <span className="font-bold text-[#E8482A]">Off</span> your first 2 orders
                    </div>
                  </motion.div>
                </motion.div>
              </Parallax>

              {/* ETA chip */}
              <Parallax mx={mx} my={my} depth={22} className="absolute right-[6%] sm:right-[-2%] top-[2%]">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 1.45 }}
                  className="flex items-center gap-2 rounded-full bg-stone-900 text-white pl-1.5 pr-4 py-1.5 shadow-xl"
                >
                  <span className="relative w-7 h-7 rounded-full bg-[#E8482A] flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[#E8482A] animate-ping opacity-60" />
                    <Timer className="relative w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold">Hot in 15 min</span>
                </motion.div>
              </Parallax>
            </div>
          </motion.div>
        </div>
      </div>

      {/* fade into the rest of the page */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-[#F2EDE8] pointer-events-none" />
    </section>
  );
}
