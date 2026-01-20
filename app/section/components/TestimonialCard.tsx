import React from 'react';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-full max-w-full p-4 md:p-5 rounded-md bg-[#DFFFEA]/50 flex flex-col flex-shrink-0 box-border">
      {/* Rating Stars */}
      <div className="mb-3 md:mb-4 flex items-center gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-[#FACC15] flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-sm md:text-sm font-normal leading-normal tracking-tight text-black/80 mb-4 md:mb-5 flex-grow">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-base md:text-base font-bold leading-tighter tracking-tight">
            {testimonial.name}
          </h3>
          <p className="text-xs md:text-sm font-normal leading-normal tracking-tight text-black/60">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
