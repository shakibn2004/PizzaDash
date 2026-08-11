'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const statusList = ['Pending', 'Preparing', 'Baking', 'Out for Delivery', 'Delivered', 'Cancelled'];

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/auth/login');
      }
    }
  }, [user, authLoading, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchOrders();
    }
  }, [user]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setStatusMessage(null);
    setErrorMessage(null);
    try {
      setUpdatingId(orderId);
      const res = await fetch('/api/orders/update-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        setStatusMessage(`Order #${orderId.slice(-8)} status updated to "${newStatus}"`);
        setTimeout(() => setStatusMessage(null), 4000);
      } else {
        setErrorMessage(data.message || 'Failed to update order status');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error updating order status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0D1117] py-20 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-400">Verifying Admin Access...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Order Approval & Kitchen Dispatch</h1>
          <p className="text-xs text-gray-400 mt-1">Approve pending orders or advance kitchen status in real time</p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-gray-400">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto mb-2" />
          <p className="text-xs">Loading orders from MongoDB...</p>
        </div>
      ) : (
        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="text-[10px] uppercase font-bold text-gray-500 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Approve / Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((o) => (
                <tr key={o._id} className={o.status === 'Pending' ? 'bg-amber-500/5' : ''}>
                  <td className="py-4 px-4 font-bold text-white">#{o._id.slice(-8)}</td>
                  <td className="py-4 px-4">{o.customerName}<br/><span className="text-[10px] text-gray-500">{o.phone}</span></td>
                  <td className="py-4 px-4 text-gray-400 max-w-xs truncate">{o.address}</td>
                  <td className="py-4 px-4 font-bold text-[#FFB703]">${o.totalAmount?.toFixed(2)}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      o.status === 'Delivered'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : o.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-400 animate-pulse'
                        : o.status === 'Cancelled'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {o.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          disabled={updatingId === o._id}
                          onClick={() => handleUpdateStatus(o._id, 'Preparing')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 hover:bg-emerald-600 cursor-pointer disabled:opacity-50"
                        >
                          {updatingId === o._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />} Approve & Prepare
                        </button>
                        <button
                          disabled={updatingId === o._id}
                          onClick={() => handleUpdateStatus(o._id, 'Cancelled')}
                          className="px-2.5 py-1.5 rounded-xl bg-red-500/20 text-red-400 font-bold text-[11px] hover:bg-red-500/30 cursor-pointer disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <select
                        value={o.status}
                        disabled={updatingId === o._id}
                        onChange={(e) => handleUpdateStatus(o._id, e.target.value)}
                        className="bg-gray-800 border border-gray-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                      >
                        {statusList.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
