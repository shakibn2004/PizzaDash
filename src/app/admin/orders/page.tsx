'use client';

import React from 'react';
import { MOCK_ORDERS } from '@/data/mockData';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-black text-white">Order Stream & Dispatch</h1>
        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="text-[10px] uppercase font-bold text-gray-500 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {MOCK_ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="py-4 px-4 font-bold text-white">{o.id}</td>
                  <td className="py-4 px-4">{o.customerName}</td>
                  <td className="py-4 px-4 text-gray-400 max-w-xs truncate">{o.deliveryAddress}</td>
                  <td className="py-4 px-4 font-bold text-[#FFB703]">${o.totalAmount.toFixed(2)}</td>
                  <td className="py-4 px-4"><span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">{o.status}</span></td>
                  <td className="py-4 px-4"><button className="px-3 py-1 rounded bg-gray-800 text-white text-[11px] font-bold">Advance Status</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
