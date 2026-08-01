'use client';

import React from 'react';
import { MOCK_PIZZAS } from '@/data/mockData';
import { AdminLayout } from '@/components/AdminLayout';

export default function AdminPizzasPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-white">Pizza Menu Management</h1>
          <button className="px-4 py-2 bg-[#FF6B35] text-white text-xs font-bold rounded-xl">+ Add New Pizza</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PIZZAS.map((p) => (
            <div key={p.id} className="bg-[#161B22] p-4 rounded-2xl border border-gray-800 flex items-center gap-4">
              <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="text-sm font-bold text-white">{p.name}</h3>
                <span className="text-xs text-[#FFB703] font-black">${p.price.toFixed(2)}</span>
                <div className="text-[10px] text-emerald-400 mt-1">Available in Stock</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
