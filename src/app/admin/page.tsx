'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/auth/login');
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      async function fetchAdminData() {
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
          console.error('Error loading admin data:', err);
        } finally {
          setLoading(false);
        }
      }

      fetchAdminData();
    }
  }, [user]);

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0D1117] py-20 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-400">Verifying Admin Privileges & MongoDB connection...</p>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-white">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Admin Control Panel</h1>
          <p className="text-xs text-gray-400 mt-0.5">Logged in as Administrator ({user.email}). Live MongoDB Atlas control stream.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Kitchen Connected to MongoDB
          </span>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Total Sales Revenue</span>
            <span className="text-emerald-400 flex items-center">+18.4% <ArrowUpRight className="w-3.5 h-3.5" /></span>
          </div>
          <div className="text-2xl font-black text-white">${totalRevenue.toFixed(2)}</div>
          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
            <div className="bg-[#FF6B35] h-full w-[78%]"></div>
          </div>
        </div>

        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Total Orders Placed</span>
            <span className="text-emerald-400 flex items-center">+12.1% <ArrowUpRight className="w-3.5 h-3.5" /></span>
          </div>
          <div className="text-2xl font-black text-white">{totalOrdersCount}</div>
          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
            <div className="bg-[#FFB703] h-full w-[65%]"></div>
          </div>
        </div>

        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Avg Order Value</span>
            <span className="text-gray-400">+3.2%</span>
          </div>
          <div className="text-2xl font-black text-white">${avgOrderValue.toFixed(2)}</div>
          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
            <div className="bg-[#2EC4B6] h-full w-[50%]"></div>
          </div>
        </div>

        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-400">
            <span>Total Menu Items</span>
            <span className="text-emerald-400">Live</span>
          </div>
          <div className="text-2xl font-black text-white">{pizzas.length} Items</div>
          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[90%]"></div>
          </div>
        </div>

      </div>

      {/* Live Orders Stream & Admin Control Table */}
      <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">Live Kitchen Order Stream (MongoDB)</h3>
          <Link href="/admin/orders" className="text-xs font-bold text-[#FF6B35] hover:underline">
            Manage All Orders
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400">
            <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto mb-2" />
            <p className="text-xs">Fetching real-time orders from MongoDB...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] uppercase font-bold text-gray-500 border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-800/40">
                    <td className="py-4 px-4 font-bold text-white">#{order._id.slice(-8)}</td>
                    <td className="py-4 px-4">{order.customerName}<br/><span className="text-[10px] text-gray-500">{order.phone}</span></td>
                    <td className="py-4 px-4 text-gray-400 max-w-xs truncate">{order.address}</td>
                    <td className="py-4 px-4 text-gray-400">{order.items?.map((i: any) => `${i.quantity}x ${i.name}`).join(', ')}</td>
                    <td className="py-4 px-4 font-black text-[#FFB703]">${order.totalAmount?.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-orange-500/20 text-orange-400 animate-pulse'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
