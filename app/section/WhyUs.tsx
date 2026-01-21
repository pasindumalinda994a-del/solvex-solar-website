'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Content Configuration - Easy to customize
const whyUsContent = {
  tag: 'WHY US',
  heading: 'Why Choose Solvex Solar',
  headingHighlight: 'Solvex Solar',
  paragraph: 'Experience the difference with our proven expertise, quality service, and commitment to your energy independence.',
  benefits: [
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960" 
          className="w-8 h-8 md:w-10 md:h-10 text-[#09DFAB]" 
          fill="currentColor"
        >
          <path d="M42-120v-92q0-34 16-56.5t45-36.5q54-26 115.5-43T358-365q78 0 139.5 17T613-305q29 14 45 36.5t16 56.5v92H42Zm60-60h512v-32q0-15-8.5-24.5T585-251q-43-19-96-36.5T358-305q-78 0-131 17.5T131-251q-12 5-20.5 14.5T102-212v32Zm256-245q-66 0-108-43t-42-107h-10q-8 0-14-6t-6-14q0-8 6-14t14-6h10q0-40 20-72t52-52v39q0 6 4.5 10.5T295-685q7 0 11-4.5t4-10.5v-52q8-2 22-3.5t27-1.5q13 0 27 1.5t22 3.5v52q0 6 4 10.5t11 4.5q6 0 10.5-4.5T438-700v-39q32 20 51 52t19 72h10q8 0 14 6t6 14q0 8-6 14t-14 6h-10q0 64-42 107t-108 43Zm0-60q42 0 66-25t24-65H268q0 40 24 65t66 25Zm302 124-2-29q-7-4-14.5-9T630-409l-26 14-22-32 26-19q-2-4-2-7.5v-15q0-3.5 2-7.5l-26-19 22-32 26 14 14-10q7-5 14-9l2-29h40l2 29q7 4 14 9l14 10 26-14 22 32-26 19q2 4 2 7.5v15q0 3.5-2 7.5l26 19-22 32-26-14q-6 5-13.5 10t-14.5 9l-2 29h-40Zm20-62q16 0 27-11t11-27q0-16-11-27t-27-11q-16 0-27 11t-11 27q0 16 11 27t27 11Zm88-155-9-35q-10-4-20.5-11T721-639l-44 16-20-35 35-28q-2-5-3.5-11t-1.5-12q0-6 1.5-12t3.5-11l-35-28 20-35 44 16q7-8 17.5-15.5T759-805l9-35h38l9 35q10 3 20.5 10.5T853-779l44-16 20 35-35 28q2 5 3.5 11t1.5 12q0 6-1.5 12t-3.5 11l35 28-20 35-44-16q-7 8-17.5 15T815-613l-9 35h-38Zm19-73q25 0 41.5-16.5T845-709q0-25-16.5-41.5T787-767q-25 0-41.5 16.5T729-709q0 25 16.5 41.5T787-651ZM358-180Z"/>
        </svg>
      ),
      title: 'Expert Installation',
      description: 'Certified professionals with years of experience ensure your solar system is installed to the highest standards.',
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960" 
          className="w-8 h-8 md:w-10 md:h-10 text-[#09DFAB]" 
          fill="currentColor"
        >
          <path d="M640-520q17 0 28.5-11.5T680-560q0-17-11.5-28.5T640-600q-17 0-28.5 11.5T600-560q0 17 11.5 28.5T640-520ZM320-620h200v-60H320v60ZM180-120q-34-114-67-227.5T80-580q0-92 64-156t156-64h200q29-38 70.5-59t89.5-21q25 0 42.5 17.5T720-820q0 6-1.5 12t-3.5 11q-4 11-7.5 22.5T702-751l91 91h87v279l-113 37-67 224H480v-80h-80v80H180Zm45-60h115v-80h200v80h115l63-210 102-35v-175h-52L640-728q1-25 6.5-48.5T658-824q-38 10-72 29.5T534-740H300q-66.29 0-113.14 46.86Q140-646.29 140-580q0 103.16 29 201.58Q198-280 225-180Zm255-322Z"/>
        </svg>
      ),
      title: 'Cost Savings',
      description: 'Reduce your energy bills significantly with high-efficiency solar panels and enjoy long-term savings on electricity costs.',
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960" 
          className="w-8 h-8 md:w-10 md:h-10 text-[#09DFAB]" 
          fill="currentColor"
        >
          <path d="m436-347 228-228-42-41-183 183-101-101-44 44 142 143Zm44 266q-140-35-230-162.5T160-523v-238l320-120 320 120v238q0 152-90 279.5T480-81Zm0-62q115-38 187.5-143.5T740-523v-196l-260-98-260 98v196q0 131 72.5 236.5T480-143Zm0-337Z"/>
        </svg>
      ),
      title: '25-Year Warranty',
      description: 'Comprehensive warranty coverage protects your investment with peace of mind for decades to come.',
    },
    {
      icon: (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960" 
          className="w-8 h-8 md:w-10 md:h-10 text-[#09DFAB]" 
          fill="currentColor"
        >
          <path d="M213-175q-43.59-45-68.3-104Q120-338 120-400q0-73 25.5-133.5T222-645q35-35 87-59t122.5-37.5Q502-755 591-758.5t198 3.5q8 108 5.5 197.5t-16 160.75q-13.5 71.25-38 124.56Q716-218.87 680-183q-51 51-110 77T444-80q-69 0-126.5-23.5T213-175Zm103 0q25 17 58 26t69.92 9Q497-140 547-162t91-64q27-27 46-70.5t31-103Q727-459 731-534t0-165q-94-2-168.5 2.5T431-680q-57 12-98 30.5T266-604q-42 43-64 91t-22 98q0 48 20.5 100.5T251-230q53-98 127-176t157-123q-87 75-141 162.5T316-175Zm0 0Zm0 0Z"/>
        </svg>
      ),
      title: 'Eco-Friendly',
      description: 'Contribute to a sustainable future by reducing your carbon footprint with clean, renewable solar energy.',
    },
  ],
};

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const tag = tagRef.current;
      const heading = headingRef.current;
      const paragraph = paragraphRef.current;
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);

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
      gsap.set(cards, {
        opacity: 0,
        y: 40
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

      // Cards timeline - staggered animation
      if (cards.length > 0) {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cards[0]?.parentElement || section,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
            once: false,
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
          {/* Section Header - tag and h2 aligned left, paragraph aligned right */}
          <div className="col-span-12 mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3 items-start">
              {/* Left side - Tag and Heading */}
              <div className="col-span-12 lg:col-span-6">
                <button
                  ref={tagRef}
                  className="mb-4 md:mb-6 px-4 py-2 bg-[#DFFFEA]/50 text-black text-sm font-regular rounded-xs w-fit"
                >
                  {whyUsContent.tag}
                </button>
                <h2 
                  ref={headingRef}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tighter tracking-tight text-left"
                >
                  {whyUsContent.heading.split(whyUsContent.headingHighlight).map((part, index, array) => 
                    index < array.length - 1 ? (
                      <span key={index}>
                        {part}
                        <span style={{ color: '#09DFAB' }}>{whyUsContent.headingHighlight}</span>
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
                  className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black max-w-lg text-justify"
                >
                  <span className="pl-2">{whyUsContent.paragraph}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Benefit Cards */}
          {whyUsContent.benefits.map((benefit, index) => {
            const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];
            return (
              <div key={index} ref={cardRefs[index]} className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="h-full p-6 md:p-8 rounded-md bg-[#DFFFEA]/50">
                  <div className="w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-6 rounded-md flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <h3 
                    className="text-xl md:text-2xl font-bold leading-tighter tracking-tight mb-3 md:mb-4"
                  >
                    {benefit.title}
                  </h3>
                  <p 
                    className="text-md font-normal leading-normal tracking-tight text-black/80"
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
