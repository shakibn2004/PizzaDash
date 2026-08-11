'use client';


export default function AdminCouponsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-black text-white">Coupons & Promo Codes</h1>
      <div className="bg-[#161B22] p-6 rounded-3xl border border-gray-800 space-y-4">
        <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
          <span className="font-mono text-base font-bold text-[#FFB703]">PIZZADASH50</span>
          <span className="text-emerald-400">50% Off First Order • 1,240 Uses</span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-300 pb-3 border-b border-gray-800">
          <span className="font-mono text-base font-bold text-[#FFB703]">FREEDELIVERY</span>
          <span className="text-emerald-400">Free Shipping on $30+ • 410 Uses</span>
        </div>
      </div>
    </div>
  );
}
