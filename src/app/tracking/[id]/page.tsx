'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Clock, ChefHat, Bike, Home, PhoneCall, MapPin } from 'lucide-react';
import { MOCK_ORDERS } from '@/data/mockData';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ORD-94821';
  const order = MOCK_ORDERS.find(o => o.id === orderId) || MOCK_ORDERS[0];

  const timelineSteps = [
    { label: 'Order Received', desc: '11:30 AM', completed: true, icon: CheckCircle2 },
    { label: 'Preparing', desc: '11:32 AM', completed: true, icon: ChefHat },
    { label: 'In Kitchen', desc: 'Baking at 500°F', completed: true, active: true, icon: Clock },
    { label: 'Out for Delivery', desc: 'Estimated 11:45 AM', completed: false, icon: Bike },
    { label: 'Delivered', desc: 'Estimated 11:52 AM', completed: false, icon: Home }
  ];

  return (
    <div className="min-h-screen py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Status Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-wider">Live Tracker • {order.id}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">Order Status: {order.status}</h1>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-orange-50 text-[#FF6B35] border border-orange-200 text-xs font-extrabold flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin" /> ETA: {order.estimatedDelivery}
          </div>
        </div>

        {/* 5-Step Timeline Component */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 py-4">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex flex-col items-center text-center space-y-2 relative">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    step.completed
                      ? 'bg-[#FF6B35] text-white shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  } ${step.active ? 'ring-4 ring-[#FF6B35]/20 animate-pulse' : ''}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-extrabold text-gray-900">{step.label}</div>
                <div className="text-[10px] text-gray-400 font-medium">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Driver & Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Driver Info Card */}
        <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Driver" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Assigned Courier</span>
              <h3 className="text-base font-extrabold text-gray-900">{order.driverName}</h3>
              <p className="text-xs text-gray-500">Honda Scooter • 4.9 ★ Rating</p>
            </div>
          </div>

          <a
            href={`tel:${order.driverPhone}`}
            className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
          >
            <PhoneCall className="w-5 h-5" />
          </a>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Destination</span>
            <h3 className="text-xs font-extrabold text-gray-900 line-clamp-1">{order.deliveryAddress}</h3>
            <p className="text-[11px] text-gray-500">Left at front door instruction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
