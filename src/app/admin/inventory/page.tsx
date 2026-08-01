'use client';

import React from 'react';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminInventoryPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-black text-white">Inventory Stock Control</h1>
        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-4">
          <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
            <span>San Marzano Tomato Sauce</span><strong>94% (Full)</strong>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
            <span>Italian Fresh Mozzarella</span><strong>82% (High)</strong>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
            <span>Black Truffle Oil</span><strong className="text-rose-400">12% (Low Stock Alert)</strong>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
