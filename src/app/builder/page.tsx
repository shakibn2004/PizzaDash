'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, ArrowRight, RotateCcw, Pizza } from 'lucide-react';
import { MOCK_BUILDER_OPTIONS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';

export default function CustomBuilderPage() {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  // Selection states
  const [selectedCrust, setSelectedCrust] = useState(MOCK_BUILDER_OPTIONS.crusts[0]);
  const [selectedSauce, setSelectedSauce] = useState(MOCK_BUILDER_OPTIONS.sauces[0]);
  const [selectedCheese, setSelectedCheese] = useState(MOCK_BUILDER_OPTIONS.cheeses[0]);
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [selectedMeats, setSelectedMeats] = useState<string[]>([]);
  const [added, setAdded] = useState(false);

  // Price Calculation
  const basePrice = 14.99;
  const crustExtra = selectedCrust.price;
  const sauceExtra = selectedSauce.price;
  const cheeseExtra = selectedCheese.price;
  const veggiesExtra = selectedVeggies.reduce((sum, id) => {
    const v = MOCK_BUILDER_OPTIONS.veggies.find(i => i.id === id);
    return sum + (v ? v.price : 0);
  }, 0);
  const meatsExtra = selectedMeats.reduce((sum, id) => {
    const m = MOCK_BUILDER_OPTIONS.meats.find(i => i.id === id);
    return sum + (m ? m.price : 0);
  }, 0);

  const totalPrice = basePrice + crustExtra + sauceExtra + cheeseExtra + veggiesExtra + meatsExtra;

  const toggleVeggie = (id: string) => {
    setSelectedVeggies(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleMeat = (id: string) => {
    setSelectedMeats(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleFinishCustomPizza = () => {
    const customPizza = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedCrust.name} Pizza`,
      description: `${selectedSauce.name}, ${selectedCheese.name}, ${selectedVeggies.length + selectedMeats.length} extra toppings`,
      price: totalPrice,
      rating: 5.0,
      reviewsCount: 1,
      category: 'Specialty' as const,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      calories: 1100,
      prepTime: '15-20 min',
      ingredients: [selectedCrust.name, selectedSauce.name, selectedCheese.name, ...selectedVeggies, ...selectedMeats],
      dietary: []
    };

    addToCart(customPizza, 'Large (14")', selectedCrust.name);
    setAdded(true);
  };

  return (
    <div className="min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Pizza Lab
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">Custom Pizza Builder</h1>
      </div>

      {/* Progress Stepper Bar */}
      <div className="grid grid-cols-5 gap-2 mb-10">
        {[
          { step: 1, label: '1. Crust' },
          { step: 2, label: '2. Sauce' },
          { step: 3, label: '3. Cheese' },
          { step: 4, label: '4. Toppings' },
          { step: 5, label: '5. Summary' }
        ].map((item) => (
          <button
            key={item.step}
            onClick={() => setCurrentStep(item.step)}
            className={`py-3 px-2 rounded-2xl text-xs font-bold text-center transition-all ${
              currentStep === item.step
                ? 'bg-[#FF6B35] text-white shadow-md'
                : currentStep > item.step
                ? 'bg-orange-100 text-[#FF6B35]'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Wizard Options Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-gray-100 space-y-6">
          
          {/* STEP 1: CRUST */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-gray-900">Step 1: Choose Your Dough Crust</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_BUILDER_OPTIONS.crusts.map((crust) => (
                  <div
                    key={crust.id}
                    onClick={() => setSelectedCrust(crust)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedCrust.id === crust.id
                        ? 'border-[#FF6B35] bg-orange-50/50 ring-2 ring-[#FF6B35]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-gray-900">{crust.name}</span>
                      <span className="text-xs font-bold text-[#FF6B35]">
                        {crust.price === 0 ? 'Included' : `+$${crust.price.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{crust.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SAUCE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-gray-900">Step 2: Choose Sauce Base</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_BUILDER_OPTIONS.sauces.map((sauce) => (
                  <div
                    key={sauce.id}
                    onClick={() => setSelectedSauce(sauce)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedSauce.id === sauce.id
                        ? 'border-[#FF6B35] bg-orange-50/50 ring-2 ring-[#FF6B35]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-gray-900">{sauce.name}</span>
                      <span className="text-xs font-bold text-[#FF6B35]">
                        {sauce.price === 0 ? 'Included' : `+$${sauce.price.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{sauce.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CHEESE */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-gray-900">Step 3: Choose Cheese Blend</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MOCK_BUILDER_OPTIONS.cheeses.map((cheese) => (
                  <div
                    key={cheese.id}
                    onClick={() => setSelectedCheese(cheese)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedCheese.id === cheese.id
                        ? 'border-[#FF6B35] bg-orange-50/50 ring-2 ring-[#FF6B35]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-sm text-gray-900">{cheese.name}</span>
                      <span className="text-xs font-bold text-[#FF6B35]">
                        {cheese.price === 0 ? 'Included' : `+$${cheese.price.toFixed(2)}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{cheese.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: VEGGIES & MEATS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-3">Step 4: Select Gourmet Toppings</h2>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fresh Vegetables</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MOCK_BUILDER_OPTIONS.veggies.map((veg) => {
                    const isSelected = selectedVeggies.includes(veg.id);
                    return (
                      <button
                        key={veg.id}
                        onClick={() => toggleVeggie(veg.id)}
                        className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                          isSelected
                            ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div>{veg.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">+${veg.price.toFixed(2)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Artisan Meats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {MOCK_BUILDER_OPTIONS.meats.map((meat) => {
                    const isSelected = selectedMeats.includes(meat.id);
                    return (
                      <button
                        key={meat.id}
                        onClick={() => toggleMeat(meat.id)}
                        className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                          isSelected
                            ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div>{meat.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">+${meat.price.toFixed(2)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-gray-900">Step 5: Review Custom Pizza Recipe</h2>
              <div className="bg-gray-50 rounded-2xl p-4 space-y-2 text-xs font-semibold text-gray-700">
                <div className="flex justify-between"><span>Base Crust:</span> <strong>{selectedCrust.name}</strong></div>
                <div className="flex justify-between"><span>Sauce:</span> <strong>{selectedSauce.name}</strong></div>
                <div className="flex justify-between"><span>Cheese:</span> <strong>{selectedCheese.name}</strong></div>
                <div className="flex justify-between"><span>Extra Toppings ({selectedVeggies.length + selectedMeats.length}):</span> <strong>{selectedVeggies.length + selectedMeats.length > 0 ? 'Selected' : 'None'}</strong></div>
              </div>
            </div>
          )}

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 disabled:opacity-40"
            >
              Back
            </button>

            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold shadow-md hover:bg-[#E85A24] flex items-center gap-1.5"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishCustomPizza}
                className="px-8 py-3.5 rounded-2xl bg-emerald-500 text-white text-xs font-black shadow-lg hover:bg-emerald-600 flex items-center gap-2"
              >
                {added ? 'Added to Cart!' : 'Add Custom Pizza to Cart'}
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Live Visual Canvas & Pricing Dock */}
        <div className="lg:col-span-5 sticky top-28 space-y-6">
          <div className="bg-gray-900 rounded-3xl p-6 text-white soft-shadow relative overflow-hidden">
            {/* Visual Pizza Canvas Mockup */}
            <div className="w-full h-64 rounded-2xl bg-gradient-to-tr from-gray-800 to-gray-900 flex items-center justify-center relative mb-6 border border-gray-800">
              <div className="w-44 h-44 rounded-full bg-amber-700/80 border-8 border-amber-600/90 shadow-2xl flex items-center justify-center text-center p-4 relative">
                <Pizza className="w-20 h-20 text-amber-200/40 animate-pulse" />
                <span className="absolute bottom-2 text-[10px] font-black text-amber-200 uppercase tracking-widest">
                  {selectedCrust.name}
                </span>
              </div>
            </div>

            {/* Price Counter */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Live Custom Total</span>
                <span className="text-3xl font-black text-[#FFB703]">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-bold block">15-20 Min Bake Time</span>
                <span className="text-xs text-gray-400">Approx. 1,050 kcal</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
