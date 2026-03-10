// src/components/CartDrawer.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ShoppingCart, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; 
import { siteConfig } from "../config/siteConfig";

// ---> 1. ADDED: Import Google Analytics <---
import ReactGA from "react-ga4";

const WORKER_URL = "https://the-win-access.mechvnod.workers.dev";

/* ================================
   Language Labels (Reusable)
================================ */
const LANGUAGE_LABELS = {
  en: "English",
  te: "తెలుగు",
  hi: "हिंदी",
};

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    subtotal,
    discount,
    total,
    coupon,
    setCoupon,
    t,
    clearCart,
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  /* =============================
     Razorpay Checkout
  ============================= */
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const options = {
      key: siteConfig.razorpay.key,
      amount: total * 100,
      currency: "INR",
      name: siteConfig.brandName,
      description: "Digital eBook Purchase",

      handler: async function () {
        try {
          let purchasedLinks = [];

          for (const item of cart) {
            /* =============================
               Bundle Purchase
            ============================= */
            if (item.id === "bundle-all") {
              const allBooks = ["book-1", "book-2", "book-3", "book-4", "book-5"];

              for (const bookId of allBooks) {
                const response = await fetch(`${WORKER_URL}/generate`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    productId: bookId,
                    language: item.itemLanguage,
                  }),
                });

                const data = await response.json();
                const link = `${window.location.origin}/ebook/${bookId}/${item.itemLanguage}?access=${data.token}`;

                purchasedLinks.push({
                  title: `Book ${bookId.replace("book-", "")}`,
                  language: item.itemLanguage,
                  url: link,
                  image: item.image,
                });
              }
            } 
            /* =============================
               Individual Book
            ============================= */
            else {
              const response = await fetch(`${WORKER_URL}/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  productId: item.id,
                  language: item.itemLanguage,
                }),
              });

              const data = await response.json();
              const link = `${window.location.origin}/ebook/${item.id}/${item.itemLanguage}?access=${data.token}`;

              purchasedLinks.push({
                title: item.title[item.itemLanguage],
                language: item.itemLanguage,
                url: link,
                image: item.image,
              });
            }
          }

          localStorage.setItem("purchasedLinks", JSON.stringify(purchasedLinks));

          /* =========================================
             ---> 2. ADDED: ECOMMERCE REVENUE TRACKING <---
          ========================================= */
          ReactGA.event("purchase", {
            transaction_id: `RZP_${Date.now()}`,
            value: total,
            currency: "INR",
            items: cart.map((item) => ({
              item_id: item.id,
              item_name: item.title["en"] || item.title[item.itemLanguage],
              price: item.offerPrice,
              quantity: 1
            }))
          });

          clearCart();
          setIsCartOpen(false);

          window.location.href = "/success?links=" + encodeURIComponent(JSON.stringify(purchasedLinks));
        } catch (error) {
          console.error("Checkout Error:", error);
          alert("Something went wrong. Please try again.");
        }
      },

      theme: {
        color: "#0ea5e9",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* =============================
     Coupon Apply
  ============================= */
  const handleApplyCoupon = () => {
    setCouponError("");

    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    if (couponCode.toUpperCase() === "WIN30") {
      setCoupon({
        discountType: "flat",
        value: 30,
      });
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code.");
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  /* =============================
     UI
  ============================= */
  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0A0A0A] z-[70] border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <ShoppingCart size={24} />
                {t?.cart || "Cart"}
              </h2>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-3 hover:bg-white/10 rounded-2xl text-slate-400 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title[item.itemLanguage]}
                    className="w-20 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="text-white font-bold">
                      {item.title[item.itemLanguage]}
                    </h3>

                    {/* Language Display */}
                    <p className="text-slate-400 text-xs mt-1">
                      Language: {LANGUAGE_LABELS[item.itemLanguage]}
                    </p>

                    <p className="text-slate-400 text-sm mt-1">
                      ₹{item.offerPrice}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-red-400 text-sm mt-2 hover:text-red-300 transition-colors"
                    >
                      {t?.remove || "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-white/5 border-t border-white/10 flex flex-col gap-6">
                {/* Coupon Section */}
                <div>
                  {!coupon ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                        className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 uppercase transition-colors"
                      />

                      <button
                        onClick={handleApplyCoupon}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                      <span className="text-emerald-400 font-bold text-sm">
                        ✓ Coupon Applied
                      </span>

                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-400 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-red-400 text-sm mt-2">{couponError}</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  {coupon && (
                    <>
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>

                      <div className="flex justify-between text-emerald-400 text-sm">
                        <span>Discount</span>
                        <span>-₹{discount}</span>
                      </div>
                    </>
                  )}

                  <div
                    className={`flex justify-between text-white font-bold text-lg ${
                      coupon ? "pt-3 border-t border-white/10" : ""
                    }`}
                  >
                    <span>{t?.total || "Total"}</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-sky-500 to-teal-500 text-white font-black py-4 rounded-2xl uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-sky-500/20"
                >
                  {t?.checkout || "Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};