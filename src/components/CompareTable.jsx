import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';

export const CompareTable = () => {
  const { t } = useApp();

  return (
    <section className="py-24 px-4 bg-white/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            {t.compareTitle}
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-sky-500 to-teal-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* ================= EDUCATION SYSTEM ================= */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative rounded-3xl p-6 md:p-8 space-y-6 overflow-hidden group border border-white/10 backdrop-blur-2xl"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: "url('/images/educationsystem.jpg')" }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90" />

            {/* Glow Effect */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-slate-400 uppercase tracking-widest">
                Education System
              </h3>

              <div className="space-y-4">
                {t.compareRows.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-400">
                    <X className="text-red-500 shrink-0" size={18} />
                    <span className="text-base md:text-lg line-through opacity-60 truncate">
                      {row[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= THE WIN ================= */}
          <motion.div
            whileHover={{ y: -5 }}
            className="relative rounded-3xl p-6 md:p-8 space-y-6 overflow-hidden border border-sky-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(14,165,233,0.25)]"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: "url('/images/thewinebooks.jpg')" }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-teal-900/70 to-black/90" />

            {/* Premium Glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/20 blur-3xl" />

            <div className="relative z-10">
              <div className="absolute top-16 -right-6  bg-sky-500 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                Champion's Path
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white tracking-widest">
                THE WIN eBOOKS
              </h3>

              <div className="space-y-4">
                {t.compareRows.map((row, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white">
                    <Check
                      className="text-emerald-400 shrink-0"
                      size={20}
                      strokeWidth={3}
                    />
                    <span className="text-base md:text-lg font-bold truncate">
                      {row[1]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 md:pt-8">
                <a
                  href="#products"
                  className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-black py-4 rounded-2xl transition-all group backdrop-blur-md"
                >
                  <span>Start Your Success Now</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};