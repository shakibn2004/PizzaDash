'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Bot, Pizza, Flame, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PROMPTS = [
  "Recommend a spicy pizza under $20",
  "What is the best sourdough pizza?",
  "Suggest vegetarian pizza with burrata",
  "How fast is the 900°F oven delivery?"
];

const INITIAL_MESSAGES = [
  {
    sender: 'ai',
    text: "Ciao! I am your PizzaDash Gourmet Sommelier. Tell me your taste preferences or budget, and I'll find your perfect wood-fired sourdough match!"
  }
];

export const AskAiModal: React.FC<AiModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add User Message
    const updated = [...messages, { sender: 'user', text: query }];
    setMessages(updated);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let aiReply = "Our master pizzaiolo recommends the Truffle Pepperoni with 72-hour fermented sourdough crust! It features imported San Marzano DOP tomatoes and fresh mozzarella.";
      if (query.toLowerCase().includes('veggie') || query.toLowerCase().includes('vegetarian')) {
        aiReply = "For a vegetarian feast, try our Margherita Burrata Gold ($17.99) topped with creamy whole burrata and organic fresh basil!";
      } else if (query.toLowerCase().includes('spicy') || query.toLowerCase().includes('under 20')) {
        aiReply = "I highly recommend the Fiery Calabrian BBQ ($18.50) - slow-roasted chicken, spicy Calabrian chili oil, and smoked gouda!";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          {/* Luxury Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-3xl bg-[#FFFDF9] border border-orange-200/90 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
          >
            {/* Modal Header (100% Mobile Responsive) */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-white via-[#FFFDF9] to-orange-50/80 border-b border-orange-200/80 flex items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 shrink-0">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <h3 className="text-sm sm:text-lg font-black text-stone-900 truncate">PizzaDash Gourmet AI</h3>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-[#FF6B35] text-[9px] sm:text-[10px] font-extrabold uppercase shrink-0">
                      Sommelier v2.0
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-medium truncate">Instant sourdough & flavor recommendations</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-stone-200/80 text-stone-500 hover:text-stone-900 hover:bg-stone-100 flex items-center justify-center transition-colors shadow-2xs shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Chat Conversation Body */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 bg-[#FFFDF9]/50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                      AI
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed max-w-[82%] shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-[#FF6B35] text-white rounded-br-none'
                        : 'bg-white border border-orange-200/80 text-stone-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-xl bg-[#FF6B35] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    AI
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-orange-200/80 text-stone-400 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-6 py-3 bg-white/80 border-t border-orange-100 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold text-stone-400 shrink-0">Quick Ask:</span>
              {SAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-xl bg-orange-50/80 border border-orange-200/60 text-stone-700 text-xs font-semibold hover:bg-[#FF6B35] hover:text-white hover:border-transparent transition-all shrink-0 whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-orange-200/80 flex items-center gap-3">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about flavors, toppings, or dietary recommendations..."
                className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-orange-200/80 text-xs font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40"
              />
              <button
                onClick={() => handleSend()}
                className="px-5 py-3 rounded-xl bg-[#FF6B35] text-white font-bold text-xs hover:bg-[#E85A24] transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/20 shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
