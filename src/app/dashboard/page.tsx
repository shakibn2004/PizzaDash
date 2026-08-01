'use client';

import React from 'react';
import Link from 'next/link';
import { User, Clock, Heart, MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { MOCK_ORDERS, MOCK_PIZZAS } from '@/data/mockData';

export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 sm:p-10 soft-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#FFB703] uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-3xl font-black tracking-tight">Welcome back, Alex! 👋</h1>
          <p className="text-xs text-gray-300">You have <strong className="text-white">450 Perks Points</strong>. Only 50 points away from a FREE Large Pizza!</p>
        </div>
        <Link
          href="/builder"
          className="px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] transition-all whitespace-nowrap"
        >
          Order Now
        </Link>
      </div>

      {/* Active Order Banner Widget */}
      <div className="bg-white p-6 rounded-3xl soft-shadow border border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center font-black">
            🍕
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">Active Order • ORD-94821</span>
            <h3 className="text-sm font-extrabold text-gray-900 mt-0.5">2x Truffle Pepperoni Supreme</h3>
            <p className="text-xs text-gray-500">Baking in Oven • Estimated Arrival in 18 mins</p>
          </div>
        </div>
        <Link
          href="/tracking/ORD-94821"
          className="px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85A24]"
        >
          Track Live
        </Link>
      </div>

      {/* Grid: Order History & Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Order History */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Recent Order History</h2>
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-gray-900">{order.id}</span>
                    <span className="text-[10px] text-gray-400">• {order.createdAt}</span>
                  </div>
                  <div className="text-xs text-gray-600 font-medium mt-1">
                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </div>
                  <div className="text-xs font-black text-[#FF6B35] mt-1">${order.totalAmount.toFixed(2)}</div>
                </div>
                <Link
                  href={`/tracking/${order.id}`}
                  className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Pizzas */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Favorite Pizzas
          </h2>
          <div className="space-y-4">
            {MOCK_PIZZAS.slice(0, 3).map((pizza) => (
              <div key={pizza.id} className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-gray-50 transition-colors">
                <img src={pizza.image} alt={pizza.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold text-gray-900">{pizza.name}</h4>
                  <span className="text-xs font-black text-[#FF6B35]">${pizza.price.toFixed(2)}</span>
                </div>
                <Link href={`/pizza/${pizza.id}`} className="px-3 py-1.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold">
                  Reorder
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
