'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, tax, deliveryFee, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20 max-w-7xl mx-auto px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-[#FF6B35] mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto">
          Explore our artisan menu or build your own custom pizza to satisfy your hunger!
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24]"
        >
          Explore Full Menu <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="bg-white p-5 rounded-3xl soft-shadow border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-2xl object-cover bg-gray-50 flex-shrink-0"
                />
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">{item.name}</h3>
                  <div className="text-xs text-gray-500 mt-0.5">
                    <span>{item.size}</span> • <span>{item.crust}</span>
                  </div>
                  <div className="text-sm font-black text-[#FF6B35] mt-1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Delete */}
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-gray-100 border border-gray-200">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="w-7 h-7 rounded-xl bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="w-7 h-7 rounded-xl bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Order Summary</h2>

          <div className="space-y-3 text-xs font-semibold text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (9%)</span>
              <span className="text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between text-base font-black text-gray-900">
              <span>Total</span>
              <span className="text-[#FF6B35]">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 rounded-2xl bg-[#FF6B35] text-white text-xs font-black shadow-lg hover:bg-[#E85A24] transition-all flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
