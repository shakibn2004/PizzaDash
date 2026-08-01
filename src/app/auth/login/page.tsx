'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pizza, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl soft-shadow border border-gray-100 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FFB703] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
            <Pizza className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Sign In to PizzaDash</h2>
          <p className="text-xs text-gray-500 mt-1">Order your favorite artisan wood-fired pizzas</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <Link href="/auth/forgot-password" className="text-[11px] font-bold text-[#FF6B35] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
              />
            </div>
          </div>

          <Link
            href="/dashboard"
            className="w-full py-3.5 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] transition-all flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="text-center pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#FF6B35] font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
