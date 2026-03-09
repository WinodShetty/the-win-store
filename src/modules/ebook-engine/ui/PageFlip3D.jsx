import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function PageFlip3D({ pages }) {
  const [index, setIndex] = useState(0);
  const flipSound = useRef(null);
  const ambient = useRef(null);

  useEffect(() => {
    ambient.current = new Audio("/sounds/ambient-loop.mp3");
    ambient.current.loop = true;
    ambient.current.volume = 0.4;
    ambient.current.play().catch(() => {});
    return () => ambient.current.pause();
  }, []);

  const playFlip = () => {
    flipSound.current = new Audio("/sounds/page-flip.mp3");
    flipSound.current.volume = 0.8;
    flipSound.current.play();
  };

  const next = () => {
    if (index < pages.length - 1) {
      playFlip();
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      playFlip();
      setIndex(index - 1);
    }
  };

  return (
    <div className="relative w-full h-full flex">

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateY: -90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: 90, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full bg-[#2b1f18] rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-16 text-[#e6d3a3]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {pages[index]}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gold text-3xl"
      >
        ‹
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gold text-3xl"
      >
        ›
      </button>

    </div>
  );
}
