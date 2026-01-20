'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './components/Button';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const trustedByRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states for content elements
      gsap.set([headingRef.current, paragraphRef.current, buttonsRef.current], { 
        opacity: 0, 
        y: 500 
      });
      // Set initial state for trusted by section (animate from top)
      gsap.set(trustedByRef.current, {
        opacity: 0,
        y: -100
      });
      // Set initial scale for hero image
      gsap.set(heroImageRef.current, {
        scale: 1.25
      });

      // Create master timeline
      const tl = gsap.timeline();

      // Animate trusted by section and heading simultaneously
      tl.to([trustedByRef.current, headingRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
      // Animate paragraph and buttons simultaneously with reduced delay
      .to([paragraphRef.current, buttonsRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      // Scroll-triggered image scale animation
      gsap.to(heroImageRef.current, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImageRef.current?.parentElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    });

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full pt-0 md:pt-2 lg:pt-4 pb-0 md:pb-2 lg:pb-4">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px]">
        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3">
          {/*image container*/}
          <div className="col-span-12 rounded-md overflow-hidden h-[75vh] md:h-[80vh] lg:h-[85vh] relative">
            <img 
              ref={heroImageRef}
              src="/images/hero-image.webp" 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-transparent rounded-xl"></div>
            {/* Trusted by section - top right */}
            <div 
              ref={trustedByRef}
              className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5"
            >
              <div className="flex items-center -space-x-3">
                <div className="w-10 h-10 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                  <img src="/images/customer-1.jpeg" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                  <img src="/images/customer-2.jpeg" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-10 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-300">
                  <img src="/images/customer-3.jpeg" alt="Customer" className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-white text-xs md:text-sm font-medium font-['Onest'] leading-normal tracking-tight">
                <span className="pl-2">Trusted by +500</span><br />
                residential homes
              </p>
            </div>
            {/* Hero Content */}
            <div ref={heroContentRef} className="absolute inset-0 flex items-end">
              <div className="p-8 text-left max-w-4xl">
                <h1 
                  ref={headingRef}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tighter tracking-tight mb-4 text-white"
                >
                  Switch to <span style={{ color: '#09DFAB' }}>Solar</span> & Enjoy Energy Independence
                </h1>
                <p 
                  ref={paragraphRef}
                  className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-white/90 max-w-2xl mb-6 max-w-lg"
                >
                  <span className="pl-2">Reliable solar solutions that cut your bills and reduce your carbon footprint.</span> Reliable solar solutions that cut your bills and reduce your carbon footprint.
                </p>
                <div ref={buttonsRef} className="flex items-center gap-4">
                  <Button variant="secondary">
                    LEARN MORE
                  </Button>
                  <Button variant="primary" showArrow>
                    START A PROJECT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
