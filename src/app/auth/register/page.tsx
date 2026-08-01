'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pizza, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl soft-shadow border border-gray-100 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FFB703] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Pizza className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create PizzaDash Account</h2>
          <p className="text-xs text-gray-500 mt-1">Get 50% off your first order & earn reward points</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
            <input type="text" placeholder="Alex Morgan" required className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
            <input type="email" placeholder="alex@example.com" required className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
            <input type="password" placeholder="••••••••" required className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold" />
          </div>

          <Link
            href="/dashboard"
            className="w-full py-3.5 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] transition-all flex items-center justify-center gap-2"
          >
            Create Free Account <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="text-center pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#FF6B35] font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
