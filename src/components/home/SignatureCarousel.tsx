'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Star } from 'lucide-react';
import { MOCK_PIZZAS, type Pizza } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { EASE_OUT } from '@/components/motion/Motion';

function DishCard({ pizza, index }: { pizza: Pizza; index: number }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const subtitle = `With ${pizza.ingredients.slice(1, 3).join(' & ').toLowerCase()}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: EASE_OUT }}
      className="group snap-start shrink-0 w-[78%] sm:w-[46%] lg:w-[calc(25%-18px)] pt-24"
    >
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="relative h-full rounded-[2rem] bg-gradient-to-b from-white/90 to-[#ECE6E0] border border-white shadow-[0_18px_36px_-20px_rgba(60,40,20,0.35)] px-6 pb-6 pt-28"
        variants={{ rest: { y: 0 }, hover: { y: -10 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Circular dish, breaking out of the card top */}
        <Link
          href={`/pizza/${pizza.id}`}
          className="absolute left-1/2 -top-20 -translate-x-1/2 w-44 h-44 sm:w-48 sm:h-48"
          aria-label={pizza.name}
        >
          <div className="absolute inset-3 translate-y-4 rounded-full bg-stone-900/30 blur-xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#B9C3CC] to-[#7D8A97] p-[7px] shadow-[inset_0_4px_12px_rgba(255,255,255,0.4)]">
            <motion.div
              variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 40, scale: 1.06 } }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="w-full h-full rounded-full overflow-hidden"
            >
              <img src={pizza.image} alt="" className="w-full h-full object-cover scale-[1.15]" loading="lazy" />
            </motion.div>
          </div>
        </Link>

        {/* Cart button */}
        <motion.button
          type="button"
          onClick={() => {
            addToCart(pizza);
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          whileTap={{ scale: 0.85 }}
          animate={added ? { scale: [1, 1.25, 1] } : { scale: 1 }}
          className={`absolute right-5 -top-14 z-10 w-12 h-12 rounded-2xl rounded-tr-md flex items-center justify-center text-white shadow-lg cursor-pointer transition-colors ${
            added ? 'bg-emerald-600' : 'bg-stone-900 hover:bg-[#E8482A]'
          }`}
          aria-label={`Add ${pizza.name} to cart`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? 'ok' : 'cart'}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <div className="flex items-center gap-1 text-xs font-bold text-stone-700">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          {pizza.rating}
          <span className="font-normal text-stone-400">({pizza.reviewsCount})</span>
        </div>
        <Link href={`/pizza/${pizza.id}`}>
          <h3 className="mt-2 font-display text-xl font-semibold text-stone-900 leading-tight line-clamp-1 group-hover:text-[#E8482A] transition-colors">
            {pizza.name}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-stone-500 line-clamp-1">{subtitle}</p>

        <div className="mt-6 flex items-end justify-between">
          <span className="font-display text-2xl font-semibold text-stone-900">${pizza.price.toFixed(2)}</span>
          <span className="text-[11px] font-semibold text-stone-400">{pizza.prepTime}</span>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function SignatureCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#F2EDE8] pb-12 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8482A]">From the oven</span>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold tracking-tight text-stone-900">
              Signature pies
            </h2>
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              whileHover={canPrev ? { scale: 1.08, x: -2 } : undefined}
              whileTap={canPrev ? { scale: 0.9 } : undefined}
              className="w-12 h-12 rounded-full bg-stone-800 text-white flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
              aria-label="Previous pizzas"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              whileHover={canNext ? { scale: 1.08, x: 2 } : undefined}
              whileTap={canNext ? { scale: 0.9 } : undefined}
              className="w-12 h-12 rounded-full bg-[#E8482A] text-white flex items-center justify-center shadow-[0_10px_24px_-6px_rgba(232,72,42,0.6)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
              aria-label="Next pizzas"
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div
          ref={track}
          onScroll={update}
          className="mt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-8 scroll-smooth pb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_2.5%,black_97.5%,transparent)]"
        >
          {MOCK_PIZZAS.map((pizza, i) => (
            <DishCard key={pizza.id} pizza={pizza} index={i} />
          ))}
        </div>

        {/* progress rail */}
        <div className="-mt-6 h-1 w-40 rounded-full bg-stone-300/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#E8482A] origin-left"
            animate={{ scaleX: 0.15 + progress * 0.85 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
      </div>
    </section>
  );
}
