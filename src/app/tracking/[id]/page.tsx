'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle2, Clock, ChefHat, Bike, Home, PhoneCall, MapPin, Loader2 } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (data.success && data.orders) {
          const found = data.orders.find((o: any) => o._id === orderId);
          setOrder(found || data.orders[0]);
        }
      } catch (err) {
        console.error('Error fetching order tracking info:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500">Retrieving live tracking details from MongoDB...</p>
      </div>
    );
  }

  const currentStatus = order?.status || 'Preparing';

  const timelineSteps = [
    { label: 'Order Received', desc: 'Confirmed', completed: true, icon: CheckCircle2 },
    { label: 'Preparing', desc: 'Crafting Dough', completed: ['Preparing', 'Baking', 'Out for Delivery', 'Delivered'].includes(currentStatus), icon: ChefHat },
    { label: 'Baking', desc: '500°F Wood Oven', completed: ['Baking', 'Out for Delivery', 'Delivered'].includes(currentStatus), active: currentStatus === 'Baking', icon: Clock },
    { label: 'Out for Delivery', desc: 'On the way', completed: ['Out for Delivery', 'Delivered'].includes(currentStatus), active: currentStatus === 'Out for Delivery', icon: Bike },
    { label: 'Delivered', desc: 'Enjoy your meal!', completed: currentStatus === 'Delivered', icon: Home }
  ];

  return (
    <div className="min-h-screen py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Status Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 mb-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-black text-[#FF6B35] uppercase tracking-wider">Live MongoDB Tracker • #{order?._id?.slice(-8) || orderId}</span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">Status: {order?.status || 'Preparing'}</h1>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-orange-50 text-[#FF6B35] border border-orange-200 text-xs font-extrabold flex items-center gap-2">
            <Clock className="w-4 h-4 animate-spin" /> ETA: {order?.estimatedDeliveryTime || '25-30 mins'}
          </div>
        </div>

        {/* 5-Step Timeline Component */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 py-4">
          {timelineSteps.map((step) => {
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
        {/* Order Info Card */}
        <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Customer Details</span>
          <h3 className="text-base font-extrabold text-gray-900">{order?.customerName}</h3>
          <p className="text-xs text-gray-500">{order?.email} • {order?.phone}</p>
          <div className="pt-2 border-t border-gray-100 flex justify-between text-xs font-bold text-gray-900">
            <span>Payment Method:</span>
            <span className="text-[#FF6B35]">{order?.paymentMethod} ({order?.paymentStatus})</span>
          </div>
        </div>

        {/* Delivery Address Card */}
        <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Destination Address</span>
            <h3 className="text-xs font-extrabold text-gray-900 line-clamp-2">{order?.address}</h3>
            <p className="text-[11px] text-gray-500 mt-1">Total Paid: ${order?.totalAmount?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
