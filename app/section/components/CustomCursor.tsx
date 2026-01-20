'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show cursor on devices with a mouse (not touch devices)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const updateCursor = () => {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (cursor) {
        cursor.style.left = `${currentX}px`;
        cursor.style.top = `${currentY}px`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Check for service or blog images
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering over service or blog image container
      const serviceImageContainer = target.closest('[data-cursor-hover="service-image"]');
      const blogImageContainer = target.closest('[data-cursor-hover="blog-image"]');
      
      setIsHovering(!!serviceImageContainer || !!blogImageContainer);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible]);

  // Don't render on touch devices
  if (typeof window !== 'undefined') {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Fully rounded cursor circle */}
          <div
            className={`rounded-full bg-[#09DFAB] border-1 border-white transition-all duration-300 flex items-center justify-center ${
              isHovering ? 'w-15 h-15' : 'w-5 h-5'
            }`}
          />
          
          {/* SEE MORE text - only visible when hovering */}
          {isHovering && (
            <span className="absolute text-black text-[8px] font-regular whitespace-nowrap uppercase tracking-[0.08em] pointer-events-none">
              SEE MORE
            </span>
          )}
        </div>
      </div>

    </>
  );
}