'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LogoLoop, LogoItem } from './CompanyLogo';
import TestimonialCard, { Testimonial } from './components/TestimonialCard';
import Button from './components/Button';

gsap.registerPlugin(ScrollTrigger);

// Content Configuration - Easy to customize
const testimonialsContent = {
  tag: 'TESTIMONIALS',
  heading: 'What Our Customers Say',
  headingHighlight: 'Customers',
  paragraph: 'Hear from satisfied customers who have made the switch to solar energy with Solvex Solar.',
  rating: {
    value: 4.9,
    maxValue: 5,
    reviewCount: 280,
  },
  achievements: [
    { text: '56+ solar installations delivered' },
    { text: '100% safe installations with certified professionals' },
    { text: '5+ years of solar energy experience' },
  ],
  cta: {
    heading: "Ready to plan your own journey?",
    subheading: "Let's get started!",
    buttonText: 'START A PROJECT',
  },
  quote: '"The best investment we made for our future."',
  image: '/images/testimonial.jpg',
  imageAlt: 'Solar panel installation testimonial',
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Homeowner',
      company: 'Residential Customer',
      image: '/images/customer-1.jpeg',
      rating: 5,
      text: 'Switching to solar with Solvex Solar was the best decision we made. Our energy bills have dropped significantly, and the installation process was smooth and professional. Highly recommend!'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      company: 'Commercial Client',
      image: '/images/customer-2.jpeg',
      rating: 5,
      text: 'The team at Solvex Solar exceeded our expectations. They provided excellent service from consultation to installation, and we\'re already seeing great savings on our monthly energy costs.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      company: 'Commercial Client',
      image: '/images/customer-3.jpeg',
      rating: 5,
      text: 'Outstanding service and quality workmanship. The solar panels look great and are performing even better than expected. Our tenants love the green energy initiative!'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Homeowner',
      company: 'Residential Customer',
      image: '/images/customer-1.jpeg',
      rating: 5,
      text: 'Professional team, excellent communication throughout the process, and fantastic results. Our energy independence journey started with Solvex Solar!'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Business Owner',
      company: 'Commercial Client',
      image: '/images/customer-2.jpeg',
      rating: 5,
      text: 'The ROI on our solar investment has been incredible. Solvex Solar made the entire process seamless from start to finish. Highly recommended for any business!'
    },
  ],
};

const testimonials: Testimonial[] = testimonialsContent.testimonials;

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const tag = tagRef.current;
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const image = imageRef.current;
      const imageContainer = imageContainerRef.current;
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;

      if (!section) return;

      // Set initial states for header elements
      gsap.set([tag, heading].filter(Boolean), {
        opacity: 0,
        y: 30
      });

      // Set initial state for paragraph
      gsap.set(paragraph, {
        opacity: 0,
        y: 20
      });

      // Set initial states for cards
      gsap.set([leftCard, rightCard].filter(Boolean), {
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

      // Cards timeline
      if (leftCard && rightCard) {
        gsap.to([leftCard, rightCard], {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: leftCard.parentElement || section,
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

  return (
    <section ref={sectionRef} className="w-full py-8 md:py-12 lg:py-16">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-2">
        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3">
          {/* Section Header */}
          <div className="col-span-12 mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3 items-start">
              {/* Left side - Tag and Heading */}
              <div className="col-span-12 lg:col-span-6">
                <button
                  ref={tagRef}
                  className="mb-4 md:mb-6 px-4 py-2 bg-[#DFFFEA]/50 text-black text-sm font-regular rounded-xs w-fit"
                >
                  {testimonialsContent.tag}
                </button>
                <h2 
                  ref={headingRef}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tighter tracking-tight text-left"
                >
                  {testimonialsContent.heading.split(testimonialsContent.headingHighlight).map((part, index, array) => 
                    index < array.length - 1 ? (
                      <span key={index}>
                        {part}
                        <span style={{ color: '#09DFAB' }}>{testimonialsContent.headingHighlight}</span>
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
                </h2>
              </div>
              {/* Right side - Paragraph */}
              <div className="col-span-12 lg:col-span-6 flex items-start justify-end">
                <p 
                  ref={paragraphRef}
                  className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black/80 max-w-lg text-justify"
                >
                  <span className="pl-2">{testimonialsContent.paragraph}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Left Corner Section - spans 4 columns */}
          <div ref={leftCardRef} className="col-span-12 lg:col-span-4 mb-8 lg:mb-0">
            <div className="h-full bg-white p-6 md:p-8 flex flex-col">
              {/* Section 1: Top Section - Rating and Achievements */}
              <div className="flex flex-col">
                {/* Rating Display */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl font-bold leading-none">{testimonialsContent.rating.value}</span>
                  <span className="text-lg md:text-xl font-normal text-black/60">/{testimonialsContent.rating.maxValue}</span>
                </div>
                
                {/* Rating Context */}
                <p className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black/80 mb-6">
                  Based on <strong>{testimonialsContent.rating.reviewCount}+</strong> verified customer reviews
                </p>

                {/* Achievements List */}
                <div className="flex flex-col gap-4">
                  {testimonialsContent.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                        <svg className="w-full h-full text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black/80">
                        {achievement.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Middle Section - Spacer */}
              <div className="flex-grow"></div>

              {/* Section 3: Bottom Section - CTA */}
              <div className="flex flex-col">
                <p className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black mb-2">
                  {testimonialsContent.cta.heading}
                </p>
                <p className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black mb-6">
                  {testimonialsContent.cta.subheading}
                </p>
                
                {/* Button */}
                <div className="flex items-center">
                  <Button variant="primary" showArrow={true}>
                    {testimonialsContent.cta.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Image Container - spans 4 columns */}
          <div className="col-span-12 lg:col-span-4 mb-8 lg:mb-0">
            <div 
              ref={imageContainerRef}
              className="h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-md overflow-hidden relative flex flex-col"
            >
              {/* Quote above the image, aligned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 lg:p-8 flex flex-col items-start">
                <div className="text-white mb-2">
                  <svg className="w-8 h-8 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>
                <p className="text-white text-lg md:text-xl lg:text-lg font-medium leading-relaxed italic">
                  {testimonialsContent.quote}
                </p>
              </div>
              <img 
                ref={imageRef}
                src={testimonialsContent.image} 
                alt={testimonialsContent.imageAlt} 
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Testimonial Cards Marquee - spans 4 columns, inline-block, right side */}
          <div ref={rightCardRef} className="col-span-12 lg:col-span-4 inline-block w-full">
            <div className="h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden w-full testimonial-marquee">
              
              <LogoLoop
                logos={testimonials.map((testimonial) => ({
                  node: <TestimonialCard testimonial={testimonial} />
                })) as LogoItem[]}
                speed={60}
                direction="up"
                gap={-110}
                logoHeight={180}
                pauseOnHover={true}
                fadeOut={true}
                scaleOnHover={false}
                width="100%"
                ariaLabel="Customer testimonials"
                className="h-full w-full"
                style={{ 
                  height: '100%', 
                  width: '100%', 
                  
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
