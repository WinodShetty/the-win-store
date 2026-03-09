import React from "react";
import { useApp } from "../context/AppContext";
import { siteConfig } from "../config/siteConfig";
import { translations } from "../data/translations";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const { language, setLanguage, cart, setIsCartOpen, t } = useApp();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">

      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
          <div className="w-7 h-7 md:w-14 md:h-14 bg-gradient-to-br from-sky-500 to-teal-500 rounded-lg md:rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/40 group-hover:rotate-6 transition-transform">
            <img 
              src="/images/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-base md:text-4xl font-black tracking-tight text-white whitespace-nowrap group-hover:text-sky-400 transition-colors">
              {siteConfig.brandName}
            </span>
            <span className="text-[8px] md:text-sm font-black text-sky-500 tracking-[0.4em] ml-0.5">
              eBooks
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 md:gap-12">

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10 text-sm xl:text-base uppercase font-black tracking-widest text-slate-300">

            <button onClick={() => scrollToSection("home")} className="hover:text-white transition-all relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-500 to-teal-500 transition-all group-hover:w-full"></span>
            </button>

            <button onClick={() => scrollToSection("products")} className="hover:text-white transition-all relative group">
              eBooks
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-500 to-teal-500 transition-all group-hover:w-full"></span>
            </button>

            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition-all relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-sky-500 to-teal-500 transition-all group-hover:w-full"></span>
            </button>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 md:gap-8">

            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 backdrop-blur-md">
              {["en", "te", "hi"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 md:px-5 py-1.5 rounded-full text-[10px] md:text-sm font-black transition-all ${
                    language === lang
                      ? "bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-lg scale-105"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {translations[lang].langName}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500/10 to-teal-500/10 border border-sky-500/30 px-4 md:px-6 py-2 rounded-full text-sky-400 hover:text-white hover:border-sky-500 transition-all group relative"
            >
              <div className="relative">
                <ShoppingCart size={18} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#050505] animate-pulse">
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-sm uppercase font-black tracking-widest">
                {t.cart}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Multi-Language Animated Ticker */}
      <div className="bg-gradient-to-r from-sky-600 via-teal-500 to-sky-600 text-white text-[10px] md:text-xs uppercase tracking-[0.25em] font-black py-2 overflow-hidden border-y border-white/10 flex">
        
        {/* The scrolling track */}
        <div className="animate-ticker flex w-max shrink-0">
          
          {/* Block 1 */}
          <div className="flex shrink-0">
            {[...Array(10)].map((_, i) => (
              <span key={`ticker-1-${i}`} className="px-6 whitespace-nowrap">
                {t.tickerText} •
              </span>
            ))}
          </div>

          {/* Block 2 (Exact duplicate) */}
          <div className="flex shrink-0">
            {[...Array(10)].map((_, i) => (
              <span key={`ticker-2-${i}`} className="px-6 whitespace-nowrap">
                {t.tickerText} •
              </span>
            ))}
          </div>

        </div>
      </div>

    </nav>
  );
};