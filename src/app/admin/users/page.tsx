'use client';

import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-black text-white">Registered Users & Customers</h1>
        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
            <div><strong>Alex Morgan</strong> <span className="text-gray-500">(alex@example.com)</span></div>
            <span className="text-[#FFB703] font-bold">Gold VIP (450 Pts)</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
            <div><strong>Sarah Jenkins</strong> <span className="text-gray-500">(sarah@example.com)</span></div>
            <span className="text-emerald-400 font-bold">Regular Customer</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
