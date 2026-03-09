import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/* =============================
   1. The Global Protection Hook
============================= */
function useGlobalScreenshotProtection() {
  const [isObscured, setIsObscured] = useState(false);

  useEffect(() => {
    // Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // Trap the Print Screen key
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        setIsObscured(true);
        if (navigator.clipboard) {
          navigator.clipboard.writeText("Screenshots are disabled.");
        }
        setTimeout(() => setIsObscured(false), 3000);
      }
    };

    // Obscure when window loses focus (Snipping tools)
    const handleBlur = () => setIsObscured(true);
    const handleFocus = () => setIsObscured(false);

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return isObscured;
}

/* =============================
   2. The Wrapper Component
============================= */
function GlobalProtectionWrapper({ children }: { children: React.ReactNode }) {
  const isObscured = useGlobalScreenshotProtection();

  return (
    // select-none prevents text highlighting globally
    <div className="relative w-full min-h-screen select-none bg-[#0A0A0A]">
      
      {/* The Blackout Screen */}
      {isObscured && (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
          <p className="text-white text-2xl font-bold tracking-widest uppercase">
            Content Protected
          </p>
        </div>
      )}

      {/* Your App Content */}
      <div 
        className={`w-full min-h-screen transition-all duration-200 ${
          isObscured ? 'blur-2xl opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* =============================
   3. Render the Application
============================= */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalProtectionWrapper>
      <App />
    </GlobalProtectionWrapper>
  </StrictMode>,
);