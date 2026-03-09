import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, BookOpen, Star, Mail, ShoppingCart } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const BottomNav = () => {
  const { cart, setIsCartOpen } = useApp();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'products', icon: BookOpen, label: 'eBooks' },
    { id: 'reviews', icon: Star, label: 'Reviews' },
    // 🔒 Temporarily disabled — will enable after launch when real reviews are available
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-3xl border-t border-white/10 px-6 py-4 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,1)] md:hidden rounded-t-[2.5rem]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-sky-400 transition-all active:scale-75 group"
        >
          <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-sky-500/20 transition-all shadow-xl">
            <item.icon size={24} className="group-hover:scale-125 transition-transform" />
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.2em]">{item.label}</span>
        </button>
      ))}
      
      <button 
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-2 text-slate-500 hover:text-orange-400 transition-all active:scale-75 relative group"
      >
        <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-orange-500/20 transition-all shadow-xl relative">
          <ShoppingCart size={24} className="group-hover:scale-125 transition-transform" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0A0A0A] shadow-2xl shadow-orange-500/50 animate-pulse">
              {cart.length}
            </span>
          )}
        </div>
        <span className="text-[10px] uppercase font-black tracking-[0.2em]">Cart</span>
      </button>
    </div>
  );
};
