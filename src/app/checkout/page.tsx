'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, tax, deliveryFee, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [tip, setTip] = useState<number>(15);
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Card'>('Cash on Delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tipAmount = (cartSubtotal * tip) / 100;
  const grandTotal = cartTotal + tipAmount;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        customerName: customerName || 'Valued Guest',
        email: email || 'guest@pizzadash.com',
        phone: phone || '+8801700000000',
        address: address || 'Default Address',
        items: cart.map(item => ({
          pizzaId: item.id,
          name: item.name,
          size: item.size,
          crust: item.crust,
          quantity: item.quantity,
          price: item.price,
          customToppings: item.customToppings || []
        })),
        totalAmount: grandTotal,
        paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success && data.order) {
        clearCart();
        router.push(`/tracking/${data.order._id}`);
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Order placement error:', err);
      alert('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Panel */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Delivery Address */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6B35]" /> Delivery Address
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full Name"
                required
                className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
                className="p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold"
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street Address, City"
                required
                className="sm:col-span-2 p-3 bg-gray-50 rounded-2xl border border-gray-200 text-xs font-semibold"
              />
            </div>
          </div>

          {/* Courier Tip Picker */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-4">
            <h2 className="text-lg font-black text-gray-900">Courier Driver Tip</h2>
            <div className="grid grid-cols-4 gap-3">
              {[10, 15, 20, 25].map((pct) => (
                <button
                  type="button"
                  key={pct}
                  onClick={() => setTip(pct)}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    tip === pct
                      ? 'bg-[#FF6B35] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pct}% (${((cartSubtotal * pct) / 100).toFixed(2)})
                </button>
              ))}
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white p-6 rounded-3xl soft-shadow border border-gray-100 space-y-4">
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#FF6B35]" /> Payment Options
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('Cash on Delivery')}
                className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'Cash on Delivery' ? 'border-[#FF6B35] bg-orange-50/50' : 'border-gray-200'
                }`}
              >
                💵 Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'Card' ? 'border-[#FF6B35] bg-orange-50/50' : 'border-gray-200'
                }`}
              >
                <CreditCard className="w-4 h-4 text-[#FF6B35]" /> Credit / Debit Card
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          <h2 className="text-xl font-black text-gray-900">Final Summary</h2>

          <div className="space-y-3 text-xs font-semibold text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${cartSubtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax (9%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>${deliveryFee.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Driver Tip ({tip}%)</span><span>${tipAmount.toFixed(2)}</span></div>
            <div className="pt-4 border-t border-gray-100 flex justify-between text-base font-black text-gray-900">
              <span>Total Due</span>
              <span className="text-[#FF6B35]">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-4 rounded-2xl bg-[#FF6B35] text-white text-xs font-black shadow-lg hover:bg-[#E85A24] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Order to MongoDB...
              </>
            ) : (
              <>
                Place Order (${grandTotal.toFixed(2)}) <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
