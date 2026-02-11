
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
        // High-performance movement using translate3d
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

    window.addEventListener('mousemove', onMouseMove);
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
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
      style={{ willChange: 'transform' }}
    >
      <div className="relative flex items-center justify-center">
        
        {/* The "Blurred Light" Aura */}
        <div 
          className={`absolute rounded-full transition-all duration-300 ease-out bg-blue-500/20 ${
            isHovered ? 'w-16 h-16 blur-[20px]' : 'w-12 h-12 blur-[15px]'
          } ${isClicking ? 'scale-150 bg-blue-400/40' : 'scale-100'}`}
        />

        {/* Small Central Core (Optional for a sharp "light source" feel) */}
        <div 
          className={`absolute rounded-full bg-white/30 blur-[4px] transition-all duration-150 ${
            isClicking ? 'w-4 h-4 opacity-80' : 'w-2 h-2 opacity-40'
          }`}
        />

        {/* Click Flash Burst */}
        <div 
          className={`absolute w-12 h-12 rounded-full border border-white/40 transition-all duration-300 pointer-events-none ${
            isClicking ? 'scale-[2.5] opacity-0' : 'scale-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default CustomCursor;
