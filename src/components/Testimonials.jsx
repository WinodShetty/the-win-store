import React from 'react';
import { useApp } from '../context/AppContext';
import { testimonials } from '../data/testimonials';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const { t, language } = useApp();
  const currentTestimonials = testimonials[language] || testimonials.en;

  return (
    <section id="reviews" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t.testimonialsTitle}</h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-sky-500 to-teal-500 mx-auto rounded-full" />
      </div>

      <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
        {[...currentTestimonials, ...currentTestimonials, ...currentTestimonials].map((item, idx) => (
          <div 
            key={idx}
            className="shrink-0 w-[350px] bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-500/30">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">{item.city}</p>
              </div>
              <Quote className="ml-auto text-sky-500/20" size={32} />
            </div>
            <p className="text-slate-300 leading-relaxed italic">"{item.text}"</p>
            <div className="flex gap-1 text-orange-400">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * 6 - 1.5rem * 6)); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}} />
    </section>
  );
};
