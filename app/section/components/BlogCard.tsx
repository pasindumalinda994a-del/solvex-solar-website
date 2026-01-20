'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BlogCardProps {
  image: string;
  alt: string;
  date: string;
  category: string;
  title: string;
  description: string;
  bloggerName: string;
  readingTime: string;
  profileImage: string;
}

export default function BlogCard({
  image,
  alt,
  date,
  category,
  title,
  description,
  bloggerName,
  readingTime,
  profileImage,
}: BlogCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imageRef.current;
    const container = imageContainerRef.current;

    if (!img || !container) return;

    // Set initial state
    gsap.set(img, {
      scale: 1,
      filter: 'blur(0px)',
    });

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();
      
      hoverTimeline.to(img, {
        scale: 1.1,
        filter: 'blur(2px)',
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();
      
      hoverTimeline.to(img, {
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  return (
    <article className="h-full flex flex-col rounded-md overflow-hidden bg-white">
      {/* Image Container */}
      <div
        ref={imageContainerRef}
        className="relative h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-md cursor-pointer"
        data-cursor-hover="blog-image"
      >
        <img
          ref={imageRef}
          src={image}
          alt={alt}
          className="w-full h-full object-cover rounded-t-md will-change-transform"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-md"></div>
      </div>
      {/* Content */}
      <div className="py-2 md:py-4 flex flex-col flex-grow">
        <div className="mb-1 flex items-center gap-2">
        <span className="px-3 py-1.5 bg-[#09DFAB] text-black text-xs md:text-xs font-regular rounded-xs">
            {category}
          </span>
          <span className="text-xs md:text-sm text-black/60 font-medium">{readingTime}</span>
          
        </div>
        <h3 className="text-xl md:text-2xl font-bold leading-tighter tracking-tight mb-1 md:mb-2">
          {title}
        </h3>
        <p className="text-md font-normal leading-normal tracking-tight text-black/80 mb-3 md:mb-4 flex-grow">
          {description}
        </p>
        {/* Profile Card */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={profileImage}
              alt={bloggerName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-black">{bloggerName}</span>
            <span className="text-xs text-black/60">{date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
