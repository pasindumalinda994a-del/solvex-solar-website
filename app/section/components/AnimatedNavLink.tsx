"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export default function AnimatedNavLink({
  href,
  children,
  className = "",
  isActive = false,
}: AnimatedNavLinkProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);
  const isInitialMount = useRef(true);

  // Set initial state and animate on active state change (click)
  useEffect(() => {
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (!topText || !bottomText) return;

    // Set initial state without animation on first mount
    if (isInitialMount.current) {
      if (isActive) {
        gsap.set(topText, { y: "-100%", opacity: 1 });
        gsap.set(bottomText, { y: 0, opacity: 1 });
      } else {
        gsap.set(topText, { y: 0, opacity: 1 });
        gsap.set(bottomText, { y: "-100%", opacity: 1 });
      }
      isInitialMount.current = false;
      return;
    }

    // Animate on subsequent changes
    const timeline = gsap.timeline();

    if (isActive) {
      // Clicked: show bottom text
      timeline.to(topText, {
        y: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      timeline.to(
        bottomText,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1"
      );
    } else {
      // Not clicked: show top text
      timeline.to(bottomText, {
        y: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
      timeline.to(
        topText,
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1"
      );
    }

    return () => {
      timeline.kill();
    };
  }, [isActive]);

  // Hover animations (only when not active)
  useEffect(() => {
    const container = containerRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (!container || !topText || !bottomText) return;

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (isActive) return; // Don't animate on hover if clicked
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
    };

    const handleMouseLeave = () => {
      if (isActive) return; // Don't animate on hover if clicked
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
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, [isActive]);


  return (
    <a
      ref={containerRef}
      href={href}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ fontFamily: "var(--font-figtree)" }}
    >
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
    </a>
  );
}
