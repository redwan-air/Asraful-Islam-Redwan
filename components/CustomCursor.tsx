import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (cursorRef.current) {
        // Direct DOM manipulation for zero-latency tracking
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');
      
      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform', transition: 'none' }}
    >
      <div className="relative flex items-center justify-center">
        
        {/* OUTER GLOW (Deep Atmosphere) */}
        <div 
          className={`absolute rounded-full bg-blue-600/10 transition-all duration-500 ease-out ${
            isHovered ? 'w-32 h-32 blur-[40px]' : 'w-20 h-20 blur-[30px]'
          }`}
        />

        {/* MID GLOW (Brightening Layer) - Pulses to look "brighter and brighter" */}
        <div 
          className={`absolute rounded-full bg-blue-400/30 blur-[20px] animate-pulse-slow transition-all duration-300 ${
            isHovered ? 'w-24 h-24 opacity-80' : 'w-14 h-14 opacity-50'
          } ${isClicking ? 'scale-150 bg-blue-300/60' : 'scale-100'}`}
        />

        {/* INNER CORE (The Source) */}
        <div 
          className={`absolute rounded-full bg-white transition-all duration-150 shadow-[0_0_15px_rgba(255,255,255,0.8)] ${
            isClicking ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'
          } ${isHovered ? 'scale-150' : 'scale-100'}`}
        />

        {/* INTERACTIVE RING */}
        <div 
          className={`absolute rounded-full border border-blue-400/50 transition-all duration-500 ease-out ${
            isHovered ? 'w-16 h-16 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-50'
          }`}
        />
      </div>
    </div>
  );
};

export default CustomCursor;