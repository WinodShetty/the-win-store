import React, { useEffect, useRef, useState, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Draggable from "react-draggable"; // Import the draggable library

export default function LuxuryFlipBook({ pages }) {
  const flipSound = useRef(null);
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  /* =============================
     Detect Screen Size
  ============================= */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* =============================
     Play Page Flip Sound
  ============================= */
  const playFlipSound = useCallback(() => {
    flipSound.current = new Audio("/sounds/page-flip.mp3");
    flipSound.current.volume = 0.6;
    flipSound.current.play().catch(() => {});
  }, []);

  /* =============================
     Navigation Handlers
  ============================= */
  const goNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const goPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-[#1b1410] overflow-hidden">
      
      {/* =============================
          Zoom & Pan Wrapper
      ============================= */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
        panning={{ velocityDisabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <HTMLFlipBook
                  ref={bookRef}
                  width={isMobile ? 350 : 550}
                  height={isMobile ? 500 : 700}
                  size="stretch"
                  minWidth={315}
                  maxWidth={1000}
                  minHeight={400}
                  maxHeight={1200}
                  showCover={true}
                  usePortrait={true} 
                  mobileScrollSupport={true}
                  drawShadow={true}
                  maxShadowOpacity={0.5}
                  flippingTime={900}
                  useMouseEvents={false} 
                  className="shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
                  onFlip={playFlipSound}
                >
                  {pages.map((PageComponent, index) => (
                    <div
                      key={index}
                      className="bg-[#eb0f0f] text-[#e6d3a3] flex items-center justify-center overflow-hidden"
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                      }}
                    >
                      <PageComponent />
                    </div>
                  ))}
                </HTMLFlipBook>
              </TransformComponent>
            </div>

            {/* =============================
                Draggable Bottom Control Panel
            ============================= */}
            {/* The wrapper handles the default bottom-center position without interfering with Draggable's transform math */}
            <div className="absolute bottom-8 left-0 w-full flex justify-center pointer-events-none z-50">
              
              <Draggable 
                handle=".drag-handle" // Only allows dragging via the grip icon
                bounds="parent"       // Keeps the panel from being dragged off the screen
              >
                {/* Re-enable pointer events here so buttons are clickable */}
                <div className="pointer-events-auto flex items-center gap-4 bg-black/70 backdrop-blur-md pl-2 pr-6 py-3 rounded-full border border-white/10 shadow-2xl">
                  
                  {/* The Grip / Drag Handle */}
                  <div className="drag-handle cursor-grab active:cursor-grabbing p-2 text-white/40 hover:text-white transition-colors" title="Drag to move">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM16 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                    </svg>
                  </div>

                  <div className="w-[1px] h-6 bg-white/20 mr-1"></div>

                  {/* Zoom Controls */}
                  <button onClick={() => zoomOut()} className="text-white/80 hover:text-[#e6d3a3] transition-colors p-2" title="Zoom Out">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
                  </button>
                  <button onClick={() => resetTransform()} className="text-white/80 hover:text-[#e6d3a3] transition-colors p-2" title="Reset View">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </button>
                  <button onClick={() => zoomIn()} className="text-white/80 hover:text-[#e6d3a3] transition-colors p-2" title="Zoom In">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                  </button>

                  {/* Divider */}
                  <div className="w-[1px] h-6 bg-white/20 mx-2"></div>

                  {/* Next/Prev Controls */}
                  <button 
                    onClick={goPrevPage} 
                    className="flex items-center gap-2 bg-[#e6d3a3] text-[#1b1410] px-4 py-2 rounded-full hover:bg-white transition-colors font-semibold shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Prev
                  </button>
                  <button 
                    onClick={goNextPage} 
                    className="flex items-center gap-2 bg-[#e6d3a3] text-[#1b1410] px-4 py-2 rounded-full hover:bg-white transition-colors font-semibold shadow-lg"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>

                </div>
              </Draggable>

            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}