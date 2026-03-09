import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Download, Smartphone, Zap } from 'lucide-react';

export const TrustBadges = () => {
  const { t } = useApp();
  const badges = [
    { icon: ShieldCheck, label: t.trustBadges.secure, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: Download, label: t.trustBadges.instant, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { icon: Smartphone, label: t.trustBadges.mobile, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { icon: Zap, label: t.trustBadges.razorpay, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-5 group">
              <div className={`p-6 rounded-[2rem] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${badge.bg} ${badge.color} shadow-2xl`}>
                <badge.icon size={40} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] group-hover:text-white transition-colors">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
