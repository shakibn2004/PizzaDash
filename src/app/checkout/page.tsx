'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, MapPin, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, tax, deliveryFee, cartTotal, clearCart } = useCart();
  
  const [tip, setTip] = useState<number>(15);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple'>('card');

  const tipAmount = (cartSubtotal * tip) / 100;
  const grandTotal = cartTotal + tipAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push('/order-success');
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Delivery Address */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B35]" /> Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" defaultValue="Alex Morgan" placeholder="Full Name" required className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
              <input type="tel" defaultValue="+1 (555) 234-5678" placeholder="Phone Number" required className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
              <input type="text" defaultValue="742 Evergreen Terrace, Apt 4B" placeholder="Street Address" required className="sm:col-span-2 p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
            </div>
          </div>

          {/* Courier Tip Picker */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-4">
            <h2 className="text-lg font-black text-gray-900">Courier Driver Tip</h2>
            <div className="grid grid-cols-4 gap-3">
              {[10, 15, 20, 25].map((pct) => (
                <button
                  type="button"
                  key={pct}
                  onClick={() => setTip(pct)}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all ${
                    tip === pct
                      ? 'bg-[#FF6B35] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pct}% (${((cartSubtotal * pct) / 100).toFixed(2)})
                </button>
              ))}
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#FF6B35]" /> Payment Options
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 transition-all ${
                  paymentMethod === 'card' ? 'border-[#FF6B35] bg-orange-50/50' : 'border-gray-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#FF6B35]" /> Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('apple')}
                className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 transition-all ${
                  paymentMethod === 'apple' ? 'border-[#FF6B35] bg-orange-50/50' : 'border-gray-200'
                }`}
              >
                 Apple Pay / Google Pay
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Final Summary</h2>

          <div className="space-y-3 text-xs font-semibold text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (9%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Driver Tip ({tip}%)</span><span>${tipAmount.toFixed(2)}</span></div>
            <div className="pt-4 border-t border-gray-100 flex justify-between text-base font-black text-gray-900">
              <span>Total Due</span>
              <span className="text-[#FF6B35]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#FF6B35] text-white text-xs font-black shadow-lg hover:bg-[#E85A24] transition-all flex items-center justify-center gap-2"
          >
            Place Order (${grandTotal.toFixed(2)}) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
