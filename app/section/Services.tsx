'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './components/Button';
import ServiceCard from './components/ServiceCard';

gsap.registerPlugin(ScrollTrigger);

// Service data
const servicesData = [
  {
    imageSrc: '/images/service-1.jpg',
    imageAlt: 'Residential solar panel installation',
    title: 'Residential Solar Installation',
    description: 'Custom residential solar systems that maximize energy savings. Expert installation from assessment to completion.',
    points: [
      'Free site assessment and energy analysis',
      'Professional installation with warranty coverage',
      'Reduce electricity bills by up to 90%',
    ],
  },
  {
    imageSrc: '/images/service-2.jpg',
    imageAlt: 'Commercial solar power plant',
    title: 'Commercial Solar Solutions',
    description: 'Scalable commercial solar solutions that reduce costs and boost sustainability. Turnkey systems tailored to your business needs.',
    points: [
      'Custom system design for your facility',
      'Significant ROI with tax incentives available',
      'Enhanced brand reputation and ESG compliance',
    ],
  },
  {
    imageSrc: '/images/service-3.jpg',
    imageAlt: 'Energy storage systems',
    title: 'Energy Storage Systems',
    description: 'Advanced battery storage for uninterrupted power and energy independence. Seamlessly integrates with your solar system.',
    points: [
      'Backup power during grid outages',
      'Store excess solar energy for later use',
      'Long-lasting lithium-ion technology',
    ],
  },
  {
    imageSrc: '/images/service-4.jpg',
    imageAlt: 'Solar panel maintenance and support',
    title: 'Maintenance & Support',
    description: 'Comprehensive maintenance and 24/7 monitoring to keep your system at peak performance. Protect your investment for years to come.',
    points: [
      '24/7 remote monitoring and alerts',
      'Regular cleaning and performance checks',
      'Priority support and rapid response',
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  
  // Refs for text content animations
  const tagRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  // Refs for service images and containers
  const image1ContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2ContainerRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const image3ContainerRef = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLImageElement>(null);
  const image4ContainerRef = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const leftSide = leftSideRef.current;
      const rightSide = rightSideRef.current;

      if (!section || !leftSide || !rightSide) return;

      const rightContent = rightSide.querySelector('.right-content') as HTMLElement;
      if (!rightContent) return;

      // Get text content elements
      const tag = tagRef.current;
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const buttons = buttonsRef.current;

      // Get image elements
      const image1 = image1Ref.current;
      const image2 = image2Ref.current;
      const image3 = image3Ref.current;
      const image4 = image4Ref.current;
      const image1Container = image1ContainerRef.current;
      const image2Container = image2ContainerRef.current;
      const image3Container = image3ContainerRef.current;
      const image4Container = image4ContainerRef.current;

      // Set initial states for text/content elements
      gsap.set([tag, heading, buttons].filter(Boolean), {
        opacity: 0,
        y: 30
      });

      // Set initial state for paragraph
      gsap.set(paragraph, {
        opacity: 0,
        y: 20
      });

      // Main content timeline - Tag, heading and buttons
      const contentTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heading?.parentElement || section,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
          once: false,
        }
      });

      // Animate tag and heading together
      if (tag && heading) {
        contentTimeline.to([tag, heading], {
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

      // Set initial scale state for all images (start with larger scale for scroll effect)
      const allImages = [image1, image2, image3, image4].filter(Boolean);
      gsap.set(allImages, {
        scale: 1.2
      });

      // Calculate the scroll distance needed for right side
      const rightContentHeight = rightContent.scrollHeight;
      const rightContainerHeight = rightSide.clientHeight;
      const rightScrollDistance = rightContentHeight - rightContainerHeight;

      // Calculate the scroll distance needed for left side to align to center
      if (rightScrollDistance <= 0) return;

      // Use the right side scroll distance
      const maxScrollDistance = rightScrollDistance;

      // Create ScrollTrigger to pin the section and animate both sides
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${maxScrollDistance}`,
        pin: true,
        anticipatePin: 1,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Animate right side content
          gsap.set(rightContent, {
            y: -progress * rightScrollDistance
          });
        }
      });

      // Scroll-triggered scale down animations for each service image
      // Each image scales down as it enters the viewport during the pinned scroll
      if (image1 && image1Container) {
        gsap.to(image1, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image1Container,
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
            trigger: image2Container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }

      if (image3 && image3Container) {
        gsap.to(image3, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image3Container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      }

      if (image4 && image4Container) {
        gsap.to(image4, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: image4Container,
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

  return (
    <section ref={sectionRef} className="w-full h-screen overflow-hidden">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-2 h-full">
        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3 h-full">
          {/* Services Section - spans 5 columns on large screens, full width on mobile */}
          <div ref={leftSideRef} className="col-span-12 lg:col-span-5 flex flex-col justify-start h-full pt-6 md:pt-6 lg:pt-8">
            {/* Services Tag Button */}
            <button
              ref={tagRef}
              className="mb-6 px-4 py-2 bg-[#DFFFEA]/50 text-black text-sm font-regular rounded-xs w-fit"
            >
              SERVICES
            </button>

            {/* Main Heading */}
            <h2 
              ref={headingRef}
              className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tighter tracking-tight mb-4"
            >
              Switch to <span style={{ color: '#09DFAB' }}>Solar</span> & Enjoy Energy Independence
            </h2>

            {/* Paragraph */}
            <p 
              ref={paragraphRef}
              className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black mb-6 max-w-lg"
            >
              <span className="pl-2">Reliable solar solutions that cut your bills and reduce your carbon footprint.</span> Reliable solar solutions that cut your bills and reduce your carbon footprint.
            </p>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex items-center gap-4">
              <Button variant="primary" showArrow>
                START A PROJECT
              </Button>
            </div>
          </div>

          {/* Right Side - All Service Cards Container - spans 7 columns on large screens */}
          <div ref={rightSideRef} className="col-span-12 lg:col-span-7 mt-6 lg:mt-0 h-full overflow-hidden">
            {/* Nested grid for service cards within the 6-column space */}
            <div className="right-content grid grid-cols-6 gap-2 md:gap-2 lg:gap-3">
              {/* Service Cards */}
              <ServiceCard
                {...servicesData[0]}
                imageContainerRef={image1ContainerRef}
                imageRef={image1Ref}
                imageClassName=""
                contentClassName=""
              />
              <ServiceCard
                {...servicesData[1]}
                imageContainerRef={image2ContainerRef}
                imageRef={image2Ref}
                imageClassName="mt-4"
                contentClassName="mt-3 lg:mt-4"
              />
              <ServiceCard
                {...servicesData[2]}
                imageContainerRef={image3ContainerRef}
                imageRef={image3Ref}
                imageClassName="mt-4"
                contentClassName="mt-3 lg:mt-4"
              />
              <ServiceCard
                {...servicesData[3]}
                imageContainerRef={image4ContainerRef}
                imageRef={image4Ref}
                imageClassName="mt-4"
                contentClassName="mt-3 lg:mt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
