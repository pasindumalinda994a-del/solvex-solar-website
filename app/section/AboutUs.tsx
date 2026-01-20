'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlus, FaPercent } from 'react-icons/fa';
import Button from './components/Button';
import StatsAnimation from './components/StatsAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const aboutTagRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const image1ContainerRef = useRef<HTMLDivElement>(null);
  const image2ContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const image1ArrowLeftRef = useRef<HTMLSpanElement>(null);
  const image1ArrowRightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get all elements, filtering out null values
      const aboutTag = aboutTagRef.current;
      const heading = headingRef.current;
      const buttons = buttonsRef.current;
      const image1Container = image1ContainerRef.current;
      const image2Container = image2ContainerRef.current;
      const image1 = image1Ref.current;
      const image2 = image2Ref.current;
      const paragraph = paragraphRef.current;
      const section = heading?.closest('section');

      if (!section) return;

      // Set initial states for text/content elements
      gsap.set([aboutTag, heading, buttons].filter(Boolean), {
        opacity: 0,
        y: 30
      });

      // Set initial states for image containers (opacity)
      gsap.set([image1Container, image2Container].filter(Boolean), {
        opacity: 0
      });

      // Set initial states for images (start with larger scale for scroll effect)
      gsap.set([image1, image2].filter(Boolean), {
        scale: 1.2
      });

      // Set initial state for paragraph
      gsap.set(paragraph, {
        opacity: 0,
        y: 20
      });

      // Main content timeline - About tag, heading, and buttons
      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heading?.parentElement || section,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
          once: false,
        }
      });

      // Animate about tag and heading together
      if (aboutTag && heading) {
        contentTimeline.to([aboutTag, heading], {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15
        });
      }

      // Animate buttons
      if (buttons) {
        contentTimeline.to(buttons, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.25');
      }

      // Images timeline - separate scroll trigger for better control
      const imagesTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: image1Container?.parentElement || section,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
          once: false,
        }
      });

      // Animate image containers opacity with stagger (scale handled separately via scroll on img elements)
      const imageContainers = [image1Container, image2Container].filter(Boolean);
      if (imageContainers.length > 0) {
        imagesTimeline.to(imageContainers, {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2
        });
      }

      // Scroll-triggered scale down animations for image elements only (Hero-style effect)
      if (image1 && image1Container) {
        gsap.to(image1, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image1Container.parentElement || section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }

      if (image2 && image2Container) {
        gsap.to(image2, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image2Container.parentElement || section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }

      // Paragraph timeline - separate scroll trigger
      if (paragraph) {
        gsap.to(paragraph, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: paragraph.parentElement || section,
            start: 'top 90%',
            end: 'top 70%',
            toggleActions: 'play none none reverse',
            once: false,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Arrow hover animation for image 1
  useEffect(() => {
    const image1Container = image1ContainerRef.current;
    const image1 = image1Ref.current;
    const leftArrow = image1ArrowLeftRef.current;
    const rightArrow = image1ArrowRightRef.current;

    if (!image1Container || !leftArrow || !rightArrow || !image1) return;

    // Set initial state
    gsap.set(leftArrow, { x: 0, opacity: 1 });
    gsap.set(rightArrow, { x: "100%", opacity: 1 });
    gsap.set(image1, { scale: 1, filter: "blur(0px)" });

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
        image1,
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
        image1,
        {
          scale: 1,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "power2.out",
        },
        "<"
      );
    };

    image1Container.addEventListener("mouseenter", handleMouseEnter);
    image1Container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      image1Container.removeEventListener("mouseenter", handleMouseEnter);
      image1Container.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  return (
    <section className="w-full py-8 md:py-12 lg:py-16">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-2">
        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3">
          {/* About Section - spans 5 columns on large screens, full width on mobile */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
            {/* About Tag Button */}
            <button
              ref={aboutTagRef}
              className="mb-6 px-4 py-2 bg-[#DFFFEA]/50 text-black text-sm font-regular rounded-xs w-fit"
            >
              ABOUT
            </button>

            {/* Main Heading */}
            <h2 
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tighter tracking-tight mb-4"
            >
              Switch to <span style={{ color: '#09DFAB' }}>Solar</span> & Enjoy Energy Independence
            </h2>


            {/* Buttons */}
            <div ref={buttonsRef} className="flex items-center gap-4">
              <Button variant="primary" showArrow>
                START A PROJECT
              </Button>
            </div>
          </div>

          {/* Image Container 1 - spans 3 columns on large screens */}
          <div className="col-span-12 lg:col-span-3 mt-6 lg:mt-0">
            <div 
              ref={image1ContainerRef}
              className="rounded-md overflow-hidden h-[150px] md:h-[250px] lg:h-[350px] relative"
            >
              <img 
                ref={image1Ref}
                src="/images/about-image-2.jpg" 
                alt="Solar panel installation" 
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              {/* Arrow icon with white background */}
              <div className="absolute bottom-4 right-4 bg-white rounded-xs w-10 h-10 flex items-center justify-center overflow-hidden">
                <span className="relative inline-block overflow-hidden w-full h-full">
                  <span className="block relative w-full h-full">
                    <span
                      ref={image1ArrowLeftRef}
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
                      ref={image1ArrowRightRef}
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

          {/* Image Container 2 - spans 4 columns on large screens */}
          <div className="col-span-12 lg:col-span-4 mt-6 lg:mt-0">
            <div 
              ref={image2ContainerRef}
              className="rounded-md overflow-hidden h-[200px] md:h-[200px] lg:h-[250px] relative"
            >
              <img 
                ref={image2Ref}
                src="/images/about-image-1.jpg" 
                alt="Solar panel installation" 
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Paragraph below 4-column image container */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 -mt-2 lg:-mt-24">
            <p 
              ref={paragraphRef}
              className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black"
            >
              <span className="pl-2">Reliable solar solutions that cut your bills and reduce your carbon footprint.</span> Reliable solar solutions that cut your bills and reduce your carbon footprint.
            </p>
          </div>

          {/* Stats Cards - spans full 12 columns */}
          <div 
            ref={statsRef}
            className="bg-[#09DFAB] rounded-md col-span-12 mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <StatsAnimation value={500} label="RESIDENTIAL HOMES" icon={<FaPlus />} />
            <StatsAnimation value={10} label="YEARS EXPERIENCE" icon={<FaPlus />} />
            <StatsAnimation value={98} label="CUSTOMER SATISFACTION" icon={<FaPercent />} />
            <StatsAnimation formattedValue="24/7" label="SUPPORT AVAILABLE" />
          </div>
        </div>
      </div>
    </section>
  );
}
