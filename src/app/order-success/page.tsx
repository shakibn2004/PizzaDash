'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentSuccessPage() {
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div className="min-h-screen py-20 max-w-xl mx-auto px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mx-auto mb-6">
        <CheckCircle className="w-12 h-12" />
      </div>

      <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
        Order Confirmed • ORD-94821
      </span>

      <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-3">Order Placed Successfully!</h1>
      <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
        Thank you for ordering with PizzaDash. Our wood-fired oven kitchen has received your order and is baking it right now!
      </p>

      {/* Order Info Card */}
      <div className="mt-8 bg-white p-6 rounded-3xl soft-shadow border border-gray-100 text-left space-y-4 text-xs font-semibold text-gray-700">
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-gray-400">Estimated Delivery Time</span>
          <strong className="text-gray-900 font-extrabold flex items-center gap-1 text-sm text-[#FF6B35]">
            <Clock className="w-4 h-4" /> 15 - 20 Minutes
          </strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Delivery Address</span>
          <strong className="text-gray-900">742 Evergreen Terrace, Seattle</strong>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/tracking/ORD-94821"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] flex items-center justify-center gap-2"
        >
          Live Order Tracker <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
