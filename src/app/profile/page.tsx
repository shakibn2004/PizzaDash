'use client';

import React from 'react';
import Link from 'next/link';
import { User, MapPin, Award, Shield, Bell, Key } from 'lucide-react';

export default function CustomerProfilePage() {
  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Account Profile</h1>

      {/* User Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#FFB703] text-white flex items-center justify-center text-2xl font-black shadow-md">
          AM
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">Alex Morgan</h2>
          <p className="text-xs text-gray-500">alex.morgan@example.com • Member since 2024</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-black">
            <Award className="w-3.5 h-3.5 text-amber-500" /> Gold VIP Member (450 Pts)
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
        <h3 className="text-lg font-black text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Full Name</label>
            <input type="text" defaultValue="Alex Morgan" className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Email Address</label>
            <input type="email" defaultValue="alex.morgan@example.com" className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Phone Number</label>
            <input type="tel" defaultValue="+1 (555) 234-5678" className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Saved Address</label>
            <input type="text" defaultValue="742 Evergreen Terrace, Apt 4B, Seattle" className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>
        </div>
        <button className="px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24]">
          Save Profile Changes
        </button>
      </div>
    </div>
  );
}
