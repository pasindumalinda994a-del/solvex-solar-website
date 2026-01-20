import AnimatedNavLink from "./components/AnimatedNavLink";

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
              src="/images/hero-image.webp"
              alt="Desert landscape"
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
                  Solvex
                </h2>
              </div>
              <p className="max-w-md text-xs md:text-sm lg:text-base leading-relaxed text-white/85 mt-2 md:mt-3 lg:mt-4">
                Discover AlUla through journeys that stay in your stories that
                live beyond the desert.
              </p>
            </div>

            {/* Right content: navigation and social links */}
            <div className="col-span-12 md:col-span-6 flex items-center md:justify-end md:pr-12 lg:pr-16">
              <div className="grid grid-cols-2 gap-x-16 md:gap-x-20 lg:gap-x-24 gap-y-4 text-right">
                {/* Navigation */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-white/70 tracking-tight">
                    Navigation
                  </p>
                  <ul className="space-y-1.5 text-sm md:text-base">
                    <li>
                      <AnimatedNavLink href="#home" className="text-white/70 hover:text-white transition-colors">
                        Home
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#tours" className="text-white/70 hover:text-white transition-colors">
                        Tours
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#about" className="text-white/70 hover:text-white transition-colors">
                        About
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#blog" className="text-white/70 hover:text-white transition-colors">
                        Blog
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#gallery" className="text-white/70 hover:text-white transition-colors">
                        Gallery
                      </AnimatedNavLink>
                    </li>
                  </ul>
                </div>

                {/* Social */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-white/70 tracking-tight">
                    Social
                  </p>
                  <ul className="space-y-1.5 text-sm md:text-base">
                    <li>
                      <AnimatedNavLink href="#tiktok" className="text-white/70 hover:text-white transition-colors">
                        Tiktok
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#instagram" className="text-white/70 hover:text-white transition-colors">
                        Instagram
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#threads" className="text-white/70 hover:text-white transition-colors">
                        Threads
                      </AnimatedNavLink>
                    </li>
                    <li>
                      <AnimatedNavLink href="#linkedin" className="text-white/70 hover:text-white transition-colors">
                        LinkedIn
                      </AnimatedNavLink>
                    </li>
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
              © 2025 Marwa. All rights reserved.
            </p>

            <div className="flex items-center gap-6 ml-auto">
              <a href="#privacy" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:underline">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

