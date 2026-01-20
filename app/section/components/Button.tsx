"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  showArrow = false,
  className = '',
  onClick 
}: ButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);
  const leftArrowRef = useRef<HTMLSpanElement>(null);
  const rightArrowRef = useRef<HTMLSpanElement>(null);
  const isInitialMount = useRef(true);

  // Set initial state
  useEffect(() => {
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    if (!topText || !bottomText) return;

    if (isInitialMount.current) {
      gsap.set(topText, { y: 0, opacity: 1 });
      gsap.set(bottomText, { y: "-100%", opacity: 1 });
      
      if (showArrow && leftArrow && rightArrow) {
        gsap.set(leftArrow, { x: 0, opacity: 1 });
        gsap.set(rightArrow, { x: "100%", opacity: 1 });
      }
      
      isInitialMount.current = false;
    }
  }, [showArrow]);

  // Hover animations
  useEffect(() => {
    const container = containerRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    if (!container || !topText || !bottomText) return;

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      hoverTimeline.to(topText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

      hoverTimeline.to(
        bottomText,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1"
      );

      // Arrow animation
      if (showArrow && leftArrow && rightArrow) {
        hoverTimeline.to(leftArrow, {
          x: "-100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }, "<");

        hoverTimeline.to(
          rightArrow,
          {
            x: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "<0.1"
        );
      }
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      hoverTimeline.to(bottomText, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

      hoverTimeline.to(
        topText,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1"
      );

      // Arrow animation
      if (showArrow && leftArrow && rightArrow) {
        hoverTimeline.to(rightArrow, {
          x: "100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }, "<");

        hoverTimeline.to(
          leftArrow,
          {
            x: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "<0.1"
        );
      }
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, [showArrow]);

  // Primary button (START A PROJECT) - used in Header
  const primaryClasses = "px-4 py-3 bg-[#09DFAB] text-black text-sm font-sans font-regular rounded-sm flex items-center gap-3";
  
  // Secondary button (LEARN MORE) - used in Hero
  const secondaryClasses = "px-6 py-3 bg-transparent text-white text-sm font-sans font-regular rounded-md";
  
  const buttonClasses = variant === 'primary' ? primaryClasses : secondaryClasses;
  
  // Arrow path component
  const ArrowPath = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M7.5 15L12.5 10L7.5 5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <button 
      ref={containerRef}
      className={`${buttonClasses} ${className}`}
      onClick={onClick}
    >
      <span className="relative inline-block overflow-hidden">
        <span className="block relative">
          <span
            ref={topTextRef}
            className="block"
          >
            {children}
          </span>
          <span
            ref={bottomTextRef}
            className="block absolute top-0 left-0 w-full"
          >
            {children}
          </span>
        </span>
      </span>
      {showArrow && (
        <div className="relative bg-white rounded-xs w-5 h-5 flex items-center justify-center overflow-hidden">
          <span className="relative inline-block overflow-hidden w-full h-full">
            <span className="block relative w-full h-full">
              <span
                ref={leftArrowRef}
                className="block w-full h-full flex items-center justify-center"
              >
                <ArrowPath />
              </span>
              <span
                ref={rightArrowRef}
                className="block absolute top-0 left-0 w-full h-full flex items-center justify-center"
              >
                <ArrowPath />
              </span>
            </span>
          </span>
        </div>
      )}
    </button>
  );
}
