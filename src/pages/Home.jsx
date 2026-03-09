import React from 'react';
import { Hero } from '../components/Hero';
import { CompareTable } from '../components/CompareTable';
import { ProductSection } from '../components/ProductSection';
import { TrustBadges } from '../components/TrustBadges';
import { Testimonials } from '../components/Testimonials';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';


export const Home = () => {
  const [showExitPopup, setShowExitPopup] = React.useState(false);

  React.useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 0 && !localStorage.getItem('exit_popup_shown')) {
        setShowExitPopup(true);
        localStorage.setItem('exit_popup_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    // Handle hash scroll on mount
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }

    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen">
      <Hero />
      <CompareTable />
      <ProductSection />
      <TrustBadges />
      /*<Testimonials />

      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-[#0A0A0A] border border-sky-500/30 rounded-3xl p-8 max-w-lg w-full text-center space-y-6 shadow-[0_0_50px_rgba(14,165,233,0.2)]"
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🎁</span>
              </div>
              
              <h2 className="text-3xl font-black text-white">Wait! Don't Leave Empty Handed</h2>
              <p className="text-slate-400">Use code <span className="text-sky-400 font-bold">WIN30</span> for an extra 50% discount on your first order. Valid for the next 15 minutes!</p>
              
              <button 
                onClick={() => setShowExitPopup(false)}
                className="w-full bg-gradient-to-r from-sky-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg"
              >
                Claim My Discount
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
