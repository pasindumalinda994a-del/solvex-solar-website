'use client';

import { forwardRef, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';

interface ServiceCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  points: string[];
  imageContainerRef?: React.RefObject<HTMLDivElement | null>;
  imageRef?: React.RefObject<HTMLImageElement | null>;
  imageClassName?: string;
  contentClassName?: string;
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ imageSrc, imageAlt, title, description, points, imageContainerRef, imageRef, imageClassName = '', contentClassName = 'mt-3 lg:mt-4' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    // Use provided refs or fallback to internal refs
    const finalContainerRef = imageContainerRef || containerRef;
    const finalImageRef = imageRef || imgRef;

    useEffect(() => {
      const container = finalContainerRef.current;
      const image = finalImageRef.current;

      if (!container || !image) return;

      // Set initial state
      gsap.set(image, {
        scale: 1,
        filter: 'blur(0px)',
      });

      let hoverTimeline: gsap.core.Timeline | null = null;

      const handleMouseEnter = () => {
        if (hoverTimeline) hoverTimeline.kill();

        hoverTimeline = gsap.timeline();
        
        hoverTimeline.to(image, {
          scale: 1.1,
          filter: 'blur(2px)',
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        if (hoverTimeline) hoverTimeline.kill();

        hoverTimeline = gsap.timeline();
        
        hoverTimeline.to(image, {
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
    }, [finalContainerRef, finalImageRef]);

    return (
      <>
        {/* Image Container */}
        <div className={`col-span-6 lg:col-span-3 ${imageClassName}`}>
          <div
            ref={finalContainerRef}
            className="rounded-md overflow-hidden h-[150px] md:h-[250px] lg:h-[350px] relative cursor-pointer"
            data-cursor-hover="service-image"
          >
            <img
              ref={finalImageRef}
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover will-change-transform"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl pointer-events-none"></div>
          </div>
        </div>

        {/* Content */}
        <div className={`col-span-6 lg:col-span-3 ${contentClassName} lg:ml-4 flex flex-col justify-center`}>
          <h3 className="text-2xl md:text-3xl lg:text-2xl font-bold leading-tighter tracking-tight mb-4">
            {title}
          </h3>

          <p className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black mb-6">
            {description}
          </p>

          {/* Points List */}
          <div className="flex flex-col gap-4 mb-6">
            {points.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                    viewBox="0 -960 960 960"
                    fill="#09DFAB"
                  >
                    <path d="m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
                  </svg>
                </div>
                <p className="text-md md:text-md lg:text-md font-normal leading-normal tracking-tight text-black/80">
                  {point}
                </p>
              </div>
            ))}
          </div>

          
        </div>
      </>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
