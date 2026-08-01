'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, ShoppingBag, DollarSign, Clock, Users, ArrowUpRight } from 'lucide-react';
import { MOCK_ADMIN_METRICS, MOCK_ORDERS } from '@/data/mockData';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Analytics Overview</h1>
            <p className="text-xs text-gray-400 mt-0.5">Real-time performance, sales, and operational metrics.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Kitchen Operating Live
            </span>
          </div>
        </div>

        {/* 4 KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400">
              <span>Total Revenue</span>
              <span className="text-emerald-400 flex items-center">{MOCK_ADMIN_METRICS.revenueChange} <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
            <div className="text-2xl font-black text-white">${MOCK_ADMIN_METRICS.totalRevenue.toLocaleString()}</div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-[#FF6B35] h-full w-[78%]"></div>
            </div>
          </div>

          <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400">
              <span>Total Orders</span>
              <span className="text-emerald-400 flex items-center">{MOCK_ADMIN_METRICS.ordersChange} <ArrowUpRight className="w-3.5 h-3.5" /></span>
            </div>
            <div className="text-2xl font-black text-white">{MOCK_ADMIN_METRICS.totalOrders.toLocaleString()}</div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-[#FFB703] h-full w-[65%]"></div>
            </div>
          </div>

          <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400">
              <span>Avg Order Value</span>
              <span className="text-gray-400">+3.2%</span>
            </div>
            <div className="text-2xl font-black text-white">${MOCK_ADMIN_METRICS.avgOrderValue.toFixed(2)}</div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-[#2EC4B6] h-full w-[50%]"></div>
            </div>
          </div>

          <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400">
              <span>Avg Delivery Speed</span>
              <span className="text-emerald-400">-4.5 min</span>
            </div>
            <div className="text-2xl font-black text-white">{MOCK_ADMIN_METRICS.avgDeliveryTime}</div>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[90%]"></div>
            </div>
          </div>

        </div>

        {/* Sales Chart & Top Selling Pizzas Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Weekly Sales Chart */}
          <div className="lg:col-span-8 bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-6">
            <h3 className="text-base font-extrabold text-white">Weekly Revenue Growth ($)</h3>
            <div className="h-48 flex items-end justify-between gap-4 pt-8 border-b border-gray-800 pb-2">
              {MOCK_ADMIN_METRICS.weeklySales.map((item) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#FF6B35] transition-colors">${item.sales}</span>
                  <div
                    style={{ height: `${(item.sales / 6500) * 100}%` }}
                    className="w-full bg-gradient-to-t from-[#FF6B35] to-[#FFB703] rounded-t-xl transition-all group-hover:brightness-125"
                  ></div>
                  <span className="text-[11px] font-bold text-gray-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Breakdown Doughnut representation */}
          <div className="lg:col-span-4 bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-6">
            <h3 className="text-base font-extrabold text-white">Top-Selling Pizzas</h3>
            <div className="space-y-4">
              {MOCK_ADMIN_METRICS.topPizzas.map((p) => (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-300">{p.name}</span>
                    <span className="text-gray-400">{p.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div style={{ width: `${p.percentage}%`, backgroundColor: p.color }} className="h-full rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recent Orders Queue Table */}
        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">Live Kitchen Order Stream</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-[#FF6B35] hover:underline">
              View All Orders
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="text-[10px] uppercase font-bold text-gray-500 border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {MOCK_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-800/40">
                    <td className="py-4 px-4 font-bold text-white">{order.id}</td>
                    <td className="py-4 px-4">{order.customerName}</td>
                    <td className="py-4 px-4 text-gray-400">{order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}</td>
                    <td className="py-4 px-4 font-black text-[#FFB703]">${order.totalAmount.toFixed(2)}</td>
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
        </div>

      </div>
    </AdminLayout>
  );
}
