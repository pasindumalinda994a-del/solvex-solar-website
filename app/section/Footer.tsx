import AnimatedNavLink from "./components/AnimatedNavLink";

// Content Configuration - Easy to customize
const footerContent = {
  companyName: 'Solvex',
  description: 'Discover AlUla through journeys that stay in your stories that live beyond the desert.',
  backgroundImage: '/images/hero-image.webp',
  backgroundImageAlt: 'Desert landscape',
  navigation: {
    title: 'Navigation',
    links: [
      { href: '/', label: 'Home' },
      { href: '/services', label: 'Services' },
      { href: '/about', label: 'About' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  social: {
    title: 'Social',
    links: [
      { href: '#tiktok', label: 'Tiktok' },
      { href: '#instagram', label: 'Instagram' },
      { href: '#threads', label: 'Threads' },
      { href: '#linkedin', label: 'LinkedIn' },
    ],
  },
  copyright: '© 2025 Solvex. All rights reserved.',
  legalLinks: [
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full py-8 md:py-12 lg:py-16">
      {/* Outer container: centered with max-width 1440px */}
      <div className="mx-auto max-w-[1440px]">
        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3">
          {/* Card container with background image, rounded corners, and dark overlay */}
          <div className="col-span-12 relative overflow-hidden rounded-3xl md:rounded-lg h-[260px] md:h-[320px] lg:h-[360px]">
            {/* Background image */}
            <img
              src={footerContent.backgroundImage}
              alt={footerContent.backgroundImageAlt}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />

            {/* Content using 12-column CSS Grid */}
            <div className="relative z-10 h-full grid grid-cols-12 gap-x-6 lg:gap-x-10 px-6 md:px-10 lg:px-14 py-8 md:py-10 lg:py-12 text-white">
            {/* Left content: title and description */}
            <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
                  {footerContent.companyName}
                </h2>
              </div>
              <p className="max-w-md text-xs md:text-sm lg:text-base leading-relaxed text-white/85 mt-2 md:mt-3 lg:mt-4">
                {footerContent.description}
              </p>
            </div>

            {/* Right content: navigation and social links */}
            <div className="col-span-12 md:col-span-6 flex items-center md:justify-end md:pr-12 lg:pr-16">
              <div className="grid grid-cols-2 gap-x-16 md:gap-x-20 lg:gap-x-24 gap-y-4 text-right">
                {/* Navigation */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-white/70 tracking-tight">
                    {footerContent.navigation.title}
                  </p>
                  <ul className="space-y-1.5 text-sm md:text-base">
                    {footerContent.navigation.links.map((link, index) => (
                      <li key={index}>
                        <AnimatedNavLink href={link.href} className="text-white/70 hover:text-white transition-colors">
                          {link.label}
                        </AnimatedNavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-white/70 tracking-tight">
                    {footerContent.social.title}
                  </p>
                  <ul className="space-y-1.5 text-sm md:text-base">
                    {footerContent.social.links.map((link, index) => (
                      <li key={index}>
                        <AnimatedNavLink href={link.href} className="text-white/70 hover:text-white transition-colors">
                          {link.label}
                        </AnimatedNavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip below image container */}
        <div className="col-span-12 mt-4 flex flex-col gap-3 pt-4 text-xs md:text-sm text-black">
          <div className="flex w-full flex-col gap-3 items-start justify-between md:flex-row md:items-center">
            <p className="tracking-tight">
              {footerContent.copyright}
            </p>

            <div className="flex items-center gap-6 ml-auto">
              {footerContent.legalLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:underline">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

