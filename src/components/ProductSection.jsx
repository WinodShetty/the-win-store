import React from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { translations } from '../data/translations';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Zap, Plus } from 'lucide-react';

export const ProductSection = () => {
  const { addToCart, removeFromCart, cart, setIsCartOpen, language, t } = useApp();

  // ✅ CATEGORY ENGINE (Future Proof)
  const activeCategory = "mindset";

  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <section id="products" className="py-24 px-4 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block bg-sky-500/10 border border-sky-500/20 px-6 py-2 rounded-full">
            <h2 className="text-sky-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">Genuine Collection</h2>
          </div>
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">eBooks Store</h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">Select your preferred language and start your success journey today.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6">
          {filteredProducts.map((product) => {
            const inCart = cart.find(item => item.cartId === `${product.id}-${language}`);
            const isBundle = product.id === 'bundle-all';
            
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className={`relative group rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-500 ${
                  isBundle 
                    ? 'border-sky-500 bg-gradient-to-b from-sky-900/40 via-[#0A0A0A] to-[#0A0A0A] shadow-[0_0_40px_rgba(14,165,233,0.15)] scale-[1.02] z-10' 
                    : 'border-white/10 bg-[#0A0A0A] hover:border-white/20'
                } p-2 md:p-4 flex flex-col`}
              >
                {isBundle && (
                  <div className="absolute top-30 right-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest z-10 shadow-xl">
                    Bundle
                  </div>
                )}

                <div className="aspect-[3/5] rounded-2xl overflow-hidden mb-3 border border-white/5 relative shadow-xl">
                  <img 
                    src={product.image} 
                    alt={product.title[language]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-2 right-2">
                    <div className="bg-red-500/90 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg flex items-center gap-1 justify-center uppercase tracking-widest shadow-lg border border-white/10">
                      <Zap size={8} fill="currentColor" />
                      {t.offerEndsSoon}
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col gap-1">
                    <h3 className={`font-black leading-tight line-clamp-2 ${isBundle ? 'text-sm md:text-base text-white' : 'text-xs md:text-sm text-slate-200'}`}>
                      {product.title[language]}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] bg-sky-500/20 px-2 py-0.5 rounded-md text-sky-400 font-black uppercase tracking-widest border border-sky-500/10">
                        {translations[language].langName}
                      </span>
                      <div className="flex items-center gap-0.5 text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={8} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-black ${isBundle ? 'text-xl text-white' : 'text-lg text-slate-200'}`}>
                      ₹{product.offerPrice}
                    </span>
                    <span className="text-[10px] text-slate-600 line-through font-bold">
                      ₹{product.basePrice}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">

  {!inCart && (
    <button
      onClick={() => addToCart(product, language)}
      className="w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all active:scale-95 shadow-lg"
    >
      <Plus size={12} />
      {t.addToCart}
    </button>
  )}

  {inCart && (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 bg-emerald-500 text-white transition-all active:scale-95 shadow-lg"
      >
        <ShoppingCart size={12} />
        {t.goToCart}
      </button>

      <button
        onClick={() => removeFromCart(inCart.cartId)}
        className="w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 transition-all active:scale-95"
      >
        {t.remove}
      </button>
    </>
  )}

</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};