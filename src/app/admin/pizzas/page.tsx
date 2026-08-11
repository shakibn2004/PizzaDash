'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Plus, Trash2, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminPizzasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('popular');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [badge, setBadge] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/auth/login');
      }
    }
  }, [user, authLoading, router]);

  const fetchPizzas = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/pizzas');
      const data = await res.json();
      if (data.success) {
        setPizzas(data.pizzas || []);
      }
    } catch (err) {
      console.error('Error fetching admin pizzas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPizzas();
    }
  }, [user]);

  const handleAddPizza = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const pizzaData = {
        name,
        category,
        price: parseFloat(price),
        description,
        image: image || 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1200&q=85',
        badge,
        ingredients: ['Mozzarella', 'Tomato Sauce'],
        crustOptions: ['Classic Hand-Tossed', 'Thick Pan Crust'],
        sizeOptions: [{ name: 'Medium (12")', priceMultiplier: 1.0 }],
        isAvailable: true,
      };

      const res = await fetch('/api/pizzas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pizzaData),
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setName('');
        setPrice('');
        setDescription('');
        setImage('');
        setBadge('');
        fetchPizzas();
      } else {
        alert(data.message || 'Failed to add pizza');
      }
    } catch (err) {
      console.error('Error adding pizza:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePizza = async (pizzaId: string) => {
    if (!confirm('Are you sure you want to delete this pizza from MongoDB?')) return;

    try {
      const res = await fetch(`/api/pizzas/delete?id=${pizzaId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setPizzas((prev) => prev.filter((p) => p._id !== pizzaId));
      } else {
        alert(data.message || 'Failed to delete pizza');
      }
    } catch (err) {
      console.error('Error deleting pizza:', err);
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
          <h1 className="text-2xl font-black">Pizza Menu Management (MongoDB)</h1>
          <p className="text-xs text-gray-400 mt-1">Add, edit, or remove live pizzas directly in your MongoDB database</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#FF6B35] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#E85A24] cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Pizza
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-400">
          <Loader2 className="w-8 h-8 text-[#FF6B35] animate-spin mx-auto mb-2" />
          <p className="text-xs">Fetching pizzas from MongoDB...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((p) => (
            <div key={p._id} className="bg-[#161B22] p-4 rounded-2xl border border-gray-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="text-sm font-bold text-white">{p.name}</h3>
                  <span className="text-xs text-[#FFB703] font-black">${p.price?.toFixed(2)}</span>
                  <div className="text-[10px] text-emerald-400 mt-0.5 capitalize">{p.category}</div>
                </div>
              </div>
              <button
                onClick={() => handleDeletePizza(p._id)}
                className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 cursor-pointer"
                title="Delete Pizza"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Pizza Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#161B22] border border-gray-800 p-6 rounded-3xl max-w-md w-full space-y-4 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-black">Add New Pizza to MongoDB</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPizza} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Pizza Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Super BBQ Chicken"
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-white capitalize"
                  >
                    <option value="popular">popular</option>
                    <option value="classic">classic</option>
                    <option value="spicy">spicy</option>
                    <option value="vegetarian">vegetarian</option>
                    <option value="gourmet">gourmet</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="22.50"
                    className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={2}
                  placeholder="Delicious wood-fired pizza..."
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">Badge (Optional)</label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="BESTSELLER / NEW / HOT"
                  className="w-full p-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-semibold text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#FF6B35] text-white text-xs font-bold rounded-xl hover:bg-[#E85A24] cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Pizza to MongoDB'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
