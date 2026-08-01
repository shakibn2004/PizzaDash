'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Pizza, Layers, Ticket, Users, TrendingUp, Settings, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Analytics Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders Management', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Pizza Menu Catalog', href: '/admin/pizzas', icon: Pizza },
    { label: 'Inventory Stock', href: '/admin/inventory', icon: Layers },
    { label: 'Coupons & Promos', href: '/admin/coupons', icon: Ticket },
    { label: 'Users & Customers', href: '/admin/users', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-[#0E1117] text-gray-100 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#161B22] border-r border-gray-800 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B35] flex items-center justify-center text-white shadow-md">
              <Pizza className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight">PizzaDash</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase block -mt-1">Admin Operations</span>
            </div>
          </Link>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#FF6B35] text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-800/80 text-gray-300 text-xs font-bold hover:bg-gray-800 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF6B35]" /> Exit to Customer UI
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
