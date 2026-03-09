import React, { useEffect } from "react";

export default function BookShell({ children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-[#1b1410] flex items-center justify-center">

      {/* Ambient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

      {/* Book container */}
      <div
        className="relative w-[90vw] max-w-6xl h-[85vh] perspective-[2000px]"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        {children}
      </div>

    </div>
  );
}