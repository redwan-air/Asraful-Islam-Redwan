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
        // Direct DOM update for 1:1 mouse tracking (Zero Latency)
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
        {/* Layer 1: Wide Soft Aura */}
        <div 
          className={`absolute rounded-full bg-blue-600/10 transition-all duration-700 ease-out ${
            isHovered ? 'w-40 h-40 blur-[50px]' : 'w-24 h-24 blur-[30px]'
          }`}
        />

        {/* Layer 2: Intensifying Mid Glow (Brighter and Brighter Pulse) */}
        <div 
          className={`absolute rounded-full bg-blue-400/30 blur-[20px] animate-pulse-slow transition-all duration-300 ${
            isHovered ? 'w-28 h-28 opacity-90' : 'w-16 h-16 opacity-60'
          } ${isClicking ? 'scale-150 bg-blue-300/50' : 'scale-100'}`}
        />

        {/* Layer 3: Sharp White Core */}
        <div 
          className={`absolute rounded-full bg-white transition-all duration-150 shadow-[0_0_20px_rgba(255,255,255,0.9)] ${
            isClicking ? 'w-3 h-3' : 'w-1.5 h-1.5'
          } ${isHovered ? 'scale-150' : 'scale-100'}`}
        />

        {/* Outer Contact Ring */}
        <div 
          className={`absolute rounded-full border border-blue-400/40 transition-all duration-500 ease-out ${
            isHovered ? 'w-16 h-16 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-50'
          }`}
        />
      </div>
    </div>
  );
};

export default CustomCursor;