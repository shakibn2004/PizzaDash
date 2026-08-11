'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminUsersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/auth/login');
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      async function fetchUsers() {
        try {
          setLoading(true);
          const res = await fetch('/api/users');
          const data = await res.json();
          if (data.success) {
            setUsers(data.users || []);
          }
        } catch (err) {
          console.error('Error fetching admin users:', err);
        } finally {
          setLoading(false);
        }
      }
      fetchUsers();
    }
  }, [user]);

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0D1117] py-20 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#FF6B35] animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-400">Verifying Admin Privileges...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black">Registered Customers & Users (MongoDB)</h1>
          <p className="text-xs text-gray-400 mt-1">Live customer records stored in your MongoDB Atlas database</p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto mb-2" />
          <p className="text-xs">Fetching users from MongoDB...</p>
        </div>
      ) : (
        <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="text-[10px] uppercase font-bold text-gray-500 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-800/40">
                  <td className="py-4 px-4 font-bold text-white">#{u._id.slice(-8)}</td>
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    {u.name}
                  </td>
                  <td className="py-4 px-4 text-gray-300">{u.email}</td>
                  <td className="py-4 px-4 text-gray-400">{u.phone || 'N/A'}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      u.role === 'admin' ? 'bg-orange-500/20 text-[#FF6B35]' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
