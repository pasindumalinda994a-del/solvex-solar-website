'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedHeaderSectionProps {
  subTitle: string;
  title: string;
  text: string;
  textColor?: string;
  withScrollTrigger?: boolean;
}

export default function AnimatedHeaderSection({
  subTitle,
  title,
  text,
  textColor = 'text-black',
  withScrollTrigger = true,
}: AnimatedHeaderSectionProps) {
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const subTitle = subTitleRef.current;
      const title = titleRef.current;
      const text = textRef.current;
      const section = title?.closest('section');

      if (!section) return;

      gsap.set([subTitle, title, text].filter(Boolean), { opacity: 0, y: 24 });

      if (withScrollTrigger) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to([subTitle, title, text].filter(Boolean), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.12,
        });
      } else {
        gsap.to([subTitle, title, text].filter(Boolean), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.12,
        });
      }
    });

    return () => ctx.revert();
  }, [withScrollTrigger]);

  return (
    <div className="px-10 pt-20 pb-12">
      <p
        ref={subTitleRef}
        className={`mb-4 text-sm font-regular ${textColor}/60`}
      >
        {subTitle}
      </p>
      <h2
        ref={titleRef}
        className={`text-4xl lg:text-5xl font-bold mb-6 ${textColor}`}
      >
        {title}
      </h2>
      <p ref={textRef} className={`text-lg lg:text-xl ${textColor}/80 leading-relaxed`}>
        {text}
      </p>
    </div>
  );
}
