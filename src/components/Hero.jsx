import React from "react";
import { useApp } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../config/siteConfig";
import { CheckCircle2, ArrowRight, Clock } from "lucide-react";

export const Hero = () => {
  const { t } = useApp();

  const [timeLeft, setTimeLeft] = React.useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  /* =========================
     Responsive Hero Images
     ========================= */

  const desktopImages = [
    "/images/hero-desktop-1.jpg",
    "/images/hero-desktop-2.jpg",
    "/images/hero-desktop-3.jpg",
    "/images/hero-desktop-4.jpg",
  ];

  const mobileImages = [
    "/images/hero-mobile-1.jpg",
    "/images/hero-mobile-2.jpg",
    "/images/hero-mobile-3.jpg",
    "/images/hero-mobile-4.jpg",
  ];

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroImages = isMobile ? mobileImages : desktopImages;

  /* =========================
     Slider (UNCHANGED LOGIC)
     ========================= */

  React.useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % heroImages.length
      );
    }, 10000);

    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  /* =========================
     Countdown (UNCHANGED)
     ========================= */

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance =
        new Date(siteConfig.countdownDate).getTime() - now;

      setTimeLeft({
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) / 1000
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden"
    >
      {/* Background Scrolling Images */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 10,
              ease: "linear",
              opacity: { duration: 2 },
            }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Hero Background"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-[#050505]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-sky-500/20 blur-[120px] -z-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] -z-20" />

      <div className="max-w-5xl mx-auto text-center space-y-1 relative z-10">

        {/* Offer Board */}
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1 }}
          className="relative block translate-y-6 w-fit mx-auto cursor-pointer"
        >
          <motion.div
            animate={{ rotate: [-4, 4, -4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top center" }}
            className="relative flex flex-col items-center"
          >
            <svg
              width="110"
              height="40"
              viewBox="0 0 110 80"
              className="drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
            >
              <path
                d="
                  M55 0
                  Q65 20 55 40
                  Q40 55 55 65
                  A8 8 0 1 1 54.9 65
                "
                stroke="#38bdf8"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div
              className="relative -mt-2 px-6 py-4 rounded-2xl
              bg-gradient-to-br from-[#0f172a] to-[#1e293b]
              border border-white/10
              shadow-[0_20px_50px_rgba(14,165,233,0.25)]
              text-center"
            >
              <div className="text-[11px] uppercase tracking-widest text-sky-400 font-bold mb-2">
                Use Coupon
              </div>

              <div className="text-xl font-extrabold text-white">
                Buy 1 @ ₹55
              </div>

              <div className="flex items-center justify-center gap-3 text-slate-400 text-xs my-2">
                <div className="h-px w-8 bg-white/20"></div>
                OR
                <div className="h-px w-8 bg-white/20"></div>
              </div>

              <div className="text-xl font-extrabold text-white">
                5 @ ₹125
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-widest text-orange-400 animate-pulse">
                Offer Ends Soon
              </div>
            </div>
          </motion.div>
        </motion.a>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-7xl lg:text-8xl font-black text-white leading-[1.25] tracking-tighter drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          {t.heroTitle}
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl font-bold text-slate-100 max-w-3xl mx-auto leading-[1.6] drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
          style={{ WebkitTextStroke: "0.5px rgba(255,255,255,0.05)" }}
        >
          {t.heroSubtitle}{" "}
          <span className="text-sky-400">
            {t.heroHook}
          </span>
        </motion.p>

        {/* CTA + Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
        >
          <a
            href="#products"
            className="group relative bg-gradient-to-r from-sky-500 to-teal-500 text-white px-10 py-6 rounded-[2rem] font-black text-xl flex items-center gap-3 hover:shadow-[0_20px_50px_rgba(14,165,233,0.5)] transition-all hover:-translate-y-2 active:scale-95 shadow-2xl"
          >
            {t.ctaButton}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <Clock className="text-orange-500" />
            <div className="flex gap-3 font-mono text-2xl font-bold text-white">
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase text-slate-500 font-sans">
                  Hrs
                </span>
              </div>
              <span className="opacity-30">:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase text-slate-500 font-sans">
                  Min
                </span>
              </div>
              <span className="opacity-30">:</span>
              <div className="flex flex-col items-center">
                <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[10px] uppercase text-slate-500 font-sans">
                  Sec
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};