'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    async function loadDashboardData() {
      try {
        setLoading(true);
        const [ordersRes, pizzasRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/pizzas')
        ]);
        const ordersData = await ordersRes.json();
        const pizzasData = await pizzasRes.json();

        if (ordersData.success) setOrders(ordersData.orders || []);
        if (pizzasData.success) setPizzas(pizzasData.pizzas || []);
      } catch (err) {
        console.error('Failed to load dashboard data from MongoDB:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500">Checking user session...</p>
      </div>
    );
  }

  const activeOrder = orders.find(o => ['Pending', 'Preparing', 'Baking', 'Out for Delivery'].includes(o.status));

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-8 sm:p-10 soft-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#FFB703] uppercase tracking-wider">MongoDB Customer Portal</span>
          <h1 className="text-3xl font-black tracking-tight">Welcome back, {user?.name}! 👋</h1>
          <p className="text-xs text-gray-300">Email: <strong className="text-white">{user?.email}</strong> • Address: <strong className="text-white">{user?.address || 'Not specified'}</strong></p>
        </div>
        <Link
          href="/menu"
          className="px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] transition-all whitespace-nowrap cursor-pointer"
        >
          Order Fresh Pizza
        </Link>
      </div>

      {/* Active Order Banner Widget */}
      {activeOrder && (
        <div className="bg-white p-6 rounded-3xl soft-shadow border border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center font-black">
              🍕
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">Active Order • #{activeOrder._id.slice(-8)}</span>
              <h3 className="text-sm font-extrabold text-gray-900 mt-0.5">
                {activeOrder.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
              </h3>
              <p className="text-xs text-gray-500">Status: {activeOrder.status} • ETA: {activeOrder.estimatedDeliveryTime || '30 mins'}</p>
            </div>
          </div>
          <Link
            href={`/tracking/${activeOrder._id}`}
            className="px-4 py-2.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85A24]"
          >
            Track Live
          </Link>
        </div>
      )}

      {/* Grid: Order History & Favorites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Order History */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Your MongoDB Orders</h2>
          
          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500">Fetching live orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-gray-900">#{order._id.slice(-8)}</span>
                      <span className="text-[10px] text-gray-400">• {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-xs text-gray-600 font-medium mt-1">
                      {order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                    <div className="text-xs font-black text-[#FF6B35] mt-1">${order.totalAmount?.toFixed(2)}</div>
                  </div>
                  <Link
                    href={`/tracking/${order._id}`}
                    className="px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-100"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-gray-500">
              No previous orders found. Place your first wood-fired pizza order today!
            </div>
          )}
        </div>

        {/* Live Menu Highlights */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Featured Pizzas
          </h2>
          <div className="space-y-4">
            {pizzas.slice(0, 4).map((pizza) => (
              <div key={pizza._id} className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-gray-50 transition-colors">
                <img src={pizza.image} alt={pizza.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="text-xs font-extrabold text-gray-900">{pizza.name}</h4>
                  <span className="text-xs font-black text-[#FF6B35]">${pizza.price?.toFixed(2)}</span>
                </div>
                <Link href="/menu" className="px-3 py-1.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold">
                  Order
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
