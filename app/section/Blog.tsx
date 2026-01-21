'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Button from './components/Button';
import BlogCard from './components/BlogCard';

gsap.registerPlugin(ScrollTrigger);

// Content Configuration - Easy to customize
const blogContent = {
  tag: 'BLOG',
  heading: 'Latest News & Insights',
  headingHighlight: 'News',
  buttonText: 'View All Posts',
  buttonLink: '/blog',
  posts: [
    {
      image: '/images/about-image-1.jpg',
      alt: 'Blog post',
      date: 'MARCH 15, 2024',
      category: 'TECHNOLOGY',
      title: 'The Future of Solar Energy',
      description: 'Discover how solar technology is evolving and what it means for homeowners looking to make the switch.',
      bloggerName: 'John Smith',
      readingTime: '5 min read',
      profileImage: '/images/customer-1.jpeg',
    },
    {
      image: '/images/about-image-2.jpg',
      alt: 'Blog post',
      date: 'MARCH 10, 2024',
      category: 'TIPS',
      title: 'Maximizing Your Solar Investment',
      description: 'Learn about the best practices for maintaining your solar panels and ensuring optimal energy production.',
      bloggerName: 'Sarah Johnson',
      readingTime: '7 min read',
      profileImage: '/images/customer-2.jpeg',
    },
    {
      image: '/images/about-image-1.jpg',
      alt: 'Blog post',
      date: 'MARCH 5, 2024',
      category: 'FINANCE',
      title: 'Solar Energy Tax Credits Explained',
      description: 'A comprehensive guide to understanding solar tax incentives and how they can reduce your installation costs.',
      bloggerName: 'Michael Chen',
      readingTime: '6 min read',
      profileImage: '/images/customer-3.jpeg',
    },
  ],
};

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const tag = tagRef.current;
      const heading = headingRef.current;
      const button = buttonRef.current;
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean);

      if (!section) return;

      // Set initial states for header elements
      gsap.set([tag, heading, button].filter(Boolean), {
        opacity: 0,
        y: 30
      });

      // Set initial states for cards
      gsap.set(cards, {
        opacity: 0,
        y: 40
      });

      // Main content timeline - Tag, heading, and button
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

      // Animate button
      if (button) {
        headerTimeline.to(button, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.25');
      }

      // Cards timeline - staggered animation
      if (cards.length > 0) {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.2,
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
      {/* Container with max-width 1440px, centered */}
      <div className="mx-auto max-w-[1440px]">
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
                  {blogContent.tag}
                </button>
                <h2 
                  ref={headingRef}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tighter tracking-tight text-left"
                >
                  {blogContent.heading.split(blogContent.headingHighlight).map((part, index, array) => 
                    index < array.length - 1 ? (
                      <span key={index}>
                        {part}
                        <span style={{ color: '#09DFAB' }}>{blogContent.headingHighlight}</span>
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
                </h2>
              </div>
              
              {/* Right side - Button */}
              <div ref={buttonRef} className="col-span-12 lg:col-span-6 flex items-end justify-end lg:justify-end mt-4 lg:mt-0">
                <Link href={blogContent.buttonLink}>
                  <Button variant="primary" showArrow={true}>
                    {blogContent.buttonText}
                  </Button>
                </Link>
              </div>
             
            </div>
          </div>

          {/* Blog Posts */}
          {blogContent.posts.map((post, index) => {
            const cardRefs = [card1Ref, card2Ref, card3Ref];
            return (
              <div key={index} ref={cardRefs[index]} className="col-span-12 md:col-span-6 lg:col-span-4">
                <BlogCard
                  image={post.image}
                  alt={post.alt}
                  date={post.date}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  bloggerName={post.bloggerName}
                  readingTime={post.readingTime}
                  profileImage={post.profileImage}
                />
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
