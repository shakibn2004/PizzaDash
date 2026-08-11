'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function CustomerProfilePage() {
  const { user, loading, refetchUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    } else if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen py-20 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500">Checking session status...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, address }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg('Profile updated successfully!');
        await refetchUser();
      } else {
        setErrorMsg(data.message || 'Failed to update profile');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Server error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (nameStr?: string) => {
    if (!nameStr) return 'P';
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Account Profile</h1>

      {/* User Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#FFB703] text-white flex items-center justify-center text-2xl font-black shadow-md">
          {getInitials(user?.name)}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-gray-900">{user?.name || 'Guest User'}</h2>
          <p className="text-xs text-gray-500">{user?.email || 'Not signed in'}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-black">
            <Award className="w-3.5 h-3.5 text-amber-500" /> VIP Member (450 Pts)
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
        <h3 className="text-lg font-black text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Email Address (Read only)</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full p-3 bg-gray-100/70 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801700000000"
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Saved Delivery Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House 12, Road 5, Banani, Dhaka"
              className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !user}
          className="px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
            </>
          ) : (
            'Save Profile Changes'
          )}
        </button>
      </form>
    </div>
  );
}
