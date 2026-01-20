"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Why should I switch to solar energy?',
    answer:
      'Solar energy helps you reduce monthly electricity bills, protect yourself from rising utility rates, and lower your carbon footprint while increasing the value of your property.'
  },
  {
    id: 2,
    question: 'How long does a typical installation take?',
    answer:
      'For most residential projects, installation can be completed within 1–3 days once permits and approvals are in place. Larger commercial systems may take longer depending on size and complexity.'
  },
  {
    id: 3,
    question: 'Will solar panels work on cloudy days?',
    answer:
      'Yes. Solar panels still generate electricity on cloudy or rainy days, although at a reduced output. Your system is designed to perform efficiently across different weather conditions throughout the year.'
  },
  {
    id: 4,
    question: 'What kind of maintenance do solar panels require?',
    answer:
      'Solar systems require very little maintenance. Periodic cleaning and routine inspections are usually enough to keep your panels operating at peak efficiency.'
  },
  {
    id: 5,
    question: 'Is my roof suitable for solar panels?',
    answer:
      'Most roofs are compatible with solar, but we evaluate roof condition, orientation, shading, and available space to recommend the best solution for your home or business.'
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const faqItemsRef = useRef<HTMLDivElement[]>([]);
  const faqArrowLeftRef = useRef<HTMLSpanElement>(null);
  const faqArrowRightRef = useRef<HTMLSpanElement>(null);
  const faqIconRefs = useRef<{ left: HTMLSpanElement | null; right: HTMLSpanElement | null }[]>([]);
  const faqAnswerRefs = useRef<HTMLDivElement[]>([]);
  const faqContainerRefs = useRef<HTMLDivElement[]>([]);
  const faqAnimationsRef = useRef<{ [key: number]: gsap.core.Timeline | null }>({});

  const toggleItem = (id: number) => {
    const index = faqs.findIndex(item => item.id === id);
    const iconRefs = faqIconRefs.current[index];
    const answerRef = faqAnswerRefs.current[index];
    const isOpening = activeId !== id;
    
    // Kill any existing animation for this item
    if (faqAnimationsRef.current[id]) {
      faqAnimationsRef.current[id]?.kill();
      faqAnimationsRef.current[id] = null;
    }
    
    if (!answerRef) {
      setActiveId(isOpening ? id : null);
      return;
    }
    
    // Create new timeline for smooth coordinated animation
    const timeline = gsap.timeline();
    
    if (isOpening) {
      // Opening animation
      // Ensure answer is visible in DOM first
      setActiveId(id);
      
      // Use next tick to ensure DOM has updated
      requestAnimationFrame(() => {
        if (!answerRef) return;
        
        // Temporarily set to auto to get natural height
        gsap.set(answerRef, { 
          height: "auto", 
          overflow: "hidden",
          opacity: 0,
          y: -10
        });
        const naturalHeight = answerRef.scrollHeight;
        
        // Reset to collapsed state
        gsap.set(answerRef, {
          height: 0,
          opacity: 0,
          y: -10,
          overflow: "hidden"
        });
        
        // Animate arrow
        if (iconRefs && iconRefs.left && iconRefs.right) {
          timeline.to(iconRefs.left, {
            x: "-100%",
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          }, 0);
          timeline.to(iconRefs.right, {
            x: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.inOut",
          }, 0.1);
        }
        
        // Animate height expansion
        timeline.to(answerRef, {
          height: naturalHeight,
          duration: 0.4,
          ease: "power2.out",
        }, 0.2);
        
        // Animate content fade and slide in
        timeline.to(answerRef, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        }, 0.25);
        
        // After animation completes, set to auto for responsive behavior
        timeline.call(() => {
          gsap.set(answerRef, { height: "auto" });
        }, undefined, ">");
        
        // Store animation for cleanup
        faqAnimationsRef.current[id] = timeline;
      });
    } else {
      // Closing animation
      // First, get the current height - handle "auto" case
      gsap.set(answerRef, { overflow: "hidden" });
      
      // Get accurate height (may be "auto" from opening animation)
      let currentHeight = answerRef.scrollHeight;
      
      // If scrollHeight is 0, try offsetHeight
      if (currentHeight === 0) {
        currentHeight = answerRef.offsetHeight;
      }
      
      // Set explicit pixel height for smooth animation
      gsap.set(answerRef, { 
        height: currentHeight,
        overflow: "hidden"
      });
      
      // Animate arrow
      if (iconRefs && iconRefs.left && iconRefs.right) {
        timeline.to(iconRefs.right, {
          x: "100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }, 0);
        timeline.to(iconRefs.left, {
          x: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }, 0.1);
      }
      
      // Animate content fade and slide out
      timeline.to(answerRef, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
      }, 0);
      
      // Animate height collapse
      timeline.to(answerRef, {
        height: 0,
        duration: 0.4,
        ease: "power2.in",
      }, 0.1);
      
      // Update state after animation completes
      timeline.call(() => {
        setActiveId(null);
        // Reset to collapsed state
        gsap.set(answerRef, { 
          height: 0,
          opacity: 0,
          y: -10,
          overflow: "hidden"
        });
      }, undefined, ">");
      
      // Store animation for cleanup
      faqAnimationsRef.current[id] = timeline;
    }
  };

  // Effect to initialize FAQ items state on mount
  useEffect(() => {
    // Set initial states for all FAQ items after DOM is ready
    const timer = setTimeout(() => {
      faqIconRefs.current.forEach((iconRefs, idx) => {
        if (iconRefs?.left && iconRefs?.right) {
          const isItemActive = faqs[idx]?.id === activeId;
          const answerRef = faqAnswerRefs.current[idx];
          
          if (isItemActive && answerRef) {
            // Active item: show up arrow (right arrow visible)
            gsap.set(iconRefs.left, { x: "-100%", opacity: 1 });
            gsap.set(iconRefs.right, { x: 0, opacity: 1 });
            // Set answer to visible state (initial state)
            gsap.set(answerRef, {
              height: "auto",
              opacity: 1,
              y: 0,
              overflow: "hidden"
            });
          } else {
            // Inactive item: show down arrow (left arrow visible)
            gsap.set(iconRefs.left, { x: 0, opacity: 1 });
            gsap.set(iconRefs.right, { x: "100%", opacity: 1 });
            if (answerRef) {
              gsap.set(answerRef, {
                height: 0,
                opacity: 0,
                y: -10,
                overflow: "hidden"
              });
            }
          }
        }
      });
    }, 100);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const tag = tagRef.current;
      const heading = headingRef.current;
      const image = imageRef.current;
      const imageContainer = imageContainerRef.current;
      const faqItems = faqItemsRef.current.filter(Boolean);

      if (!section) return;

      // Set initial states for header elements
      gsap.set([tag, heading].filter(Boolean), {
        opacity: 0,
        y: 30
      });

      // Set initial states for FAQ items
      gsap.set(faqItems, {
        opacity: 0,
        y: 30
      });

      // Main content timeline - Tag and heading
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
          once: false,
        }
      });

      // Animate tag and heading together
      if (tag && heading) {
        headerTimeline.to([tag, heading], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15
        });
      }

      // FAQ items timeline - staggered animation
      if (faqItems.length > 0) {
        gsap.to(faqItems, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: faqItems[0]?.parentElement || section,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            once: false,
          }
        });
      }

      // Image animation (existing)
      if (image && imageContainer) {
        // Set initial scale state (start with larger scale for scroll effect)
        gsap.set(image, {
          scale: 1.2
        });

        // Scroll-triggered scale down animation for image
        gsap.to(image, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      Object.values(faqAnimationsRef.current).forEach((anim) => {
        if (anim) anim.kill();
      });
    };
  }, []);

  // Arrow hover animation for FAQ image
  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    const image = imageRef.current;
    const leftArrow = faqArrowLeftRef.current;
    const rightArrow = faqArrowRightRef.current;

    if (!imageContainer || !leftArrow || !rightArrow || !image) return;

    // Set initial state
    gsap.set(leftArrow, { x: 0, opacity: 1 });
    gsap.set(rightArrow, { x: "100%", opacity: 1 });
    gsap.set(image, { filter: "blur(0px)" });

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Animate arrow
      hoverTimeline.to(leftArrow, {
        x: "-100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

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

      // Animate image scale up and blur
      hoverTimeline.to(
        image,
        {
          scale: 1.1,
          filter: "blur(2px)",
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Animate arrow back
      hoverTimeline.to(rightArrow, {
        x: "100%",
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });

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

      // Animate image scale back and remove blur
      hoverTimeline.to(
        image,
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );
    };

    imageContainer.addEventListener("mouseenter", handleMouseEnter);
    imageContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainer.removeEventListener("mouseenter", handleMouseEnter);
      imageContainer.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-8 md:py-12 lg:py-16">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-2">
        {/* Header row above grid: Tag left, Heading right */}
        <div className="mb-8 lg:mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button ref={tagRef} className="px-4 py-2 bg-[#DFFFEA]/50 text-black text-sm font-regular rounded-xs w-fit">
              FAQ
            </button>
            <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tighter tracking-tight text-right">
              Answers to Your <span style={{ color: '#09DFAB' }}>Solar</span> Questions
            </h2>
          </div>
        </div>

        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3">
          {/* Left side: Image container spanning 5 columns */}
          <div className="col-span-12 lg:col-span-5 mb-8 lg:mb-0">
            <div 
              ref={imageContainerRef}
              className="h-[160px] md:h-[200px] lg:h-[430px] rounded-md overflow-hidden relative cursor-pointer"
            >
              <img
                ref={imageRef}
                src="/images/about-image-2.jpg"
                alt="Solar FAQ background"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {/* Arrow icon with white background */}
              <div className="absolute bottom-4 right-4 bg-white rounded-xs w-10 h-10 flex items-center justify-center overflow-hidden">
                <span className="relative inline-block overflow-hidden w-full h-full">
                  <span className="block relative w-full h-full">
                    <span
                      ref={faqArrowLeftRef}
                      className="block w-full h-full flex items-center justify-center"
                    >
                      <svg 
                        width="24" 
                        height="24" 
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
                    </span>
                    <span
                      ref={faqArrowRightRef}
                      className="block absolute top-0 left-0 w-full h-full flex items-center justify-center"
                    >
                      <svg 
                        width="24" 
                        height="24" 
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
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Right side: FAQ list spanning 7 columns */}
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3">
              {/* We keep FAQ content within full width of this area for clean alignment */}
              <div className="col-span-12">
                <div className="flex flex-col gap-2 md:gap-2">
                  {faqs.map((item, index) => {
                    const isActive = item.id === activeId;
                    
                    // Initialize icon refs if not already set
                    if (!faqIconRefs.current[index]) {
                      faqIconRefs.current[index] = { left: null, right: null };
                    }
                    
                    return (
                      <div 
                        key={item.id} 
                        ref={(el) => {
                          if (el) {
                            faqItemsRef.current[index] = el;
                            faqContainerRefs.current[index] = el;
                          }
                        }}
                        className="px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 bg-[#DFFFEA]/50 rounded-md overflow-hidden"
                      >
                        <button
                          type="button"
                          className="w-full flex items-center justify-between gap-3 text-left"
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={isActive}
                        >
                          <span className="text-base md:text-md lg:text-md font-semibold leading-tight tracking-tight text-black">
                            {item.question}
                          </span>
                          <div className="relative bg-white rounded-xs w-6 h-6 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <span className="relative inline-block overflow-hidden w-full h-full">
                              <span className="block relative w-full h-full">
                                <span
                                  ref={(el) => {
                                    if (faqIconRefs.current[index]) {
                                      faqIconRefs.current[index].left = el;
                                    }
                                  }}
                                  className="block w-full h-full flex items-center justify-center"
                                >
                                  <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 20 20" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path 
                                      d="M5 12.5L10 7.5L15 12.5" 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                                <span
                                  ref={(el) => {
                                    if (faqIconRefs.current[index]) {
                                      faqIconRefs.current[index].right = el;
                                    }
                                  }}
                                  className="block absolute top-0 left-0 w-full h-full flex items-center justify-center"
                                >
                                  <svg 
                                    width="16" 
                                    height="16" 
                                    viewBox="0 0 20 20" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path 
                                      d="M5 7.5L10 12.5L15 7.5" 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </span>
                            </span>
                          </div>
                        </button>
                        <div 
                          ref={(el) => {
                            if (el) faqAnswerRefs.current[index] = el;
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 md:mt-4">
                            <p className="text-sm md:text-md lg:text-md font-normal leading-normal tracking-tight text-black/80">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

