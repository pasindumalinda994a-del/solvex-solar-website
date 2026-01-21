import Button from "./components/Button";
import AnimatedNavLink from "./components/AnimatedNavLink";

// Content Configuration - Easy to customize
const headerContent = {
  logo: 'Solvex',
  logoLink: '/',
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ],
  ctaButtonText: 'START A PROJECT',
};

export default function Header() {
  return (
    <header className="w-full py-2 md:py-3">
      {/* Container with max-width 1440px, centered, and 8px horizontal padding */}
      <div className="mx-auto max-w-[1440px] px-2">
        {/* 12-column CSS Grid */}
        <div className="grid grid-cols-12 gap-2 md:gap-2 lg:gap-3 items-center">
          {/* Logo/Brand - spans 3 columns */}
          <div className="col-span-3 md:col-span-2 lg:col-span-2">
            <a href={headerContent.logoLink} className="flex items-center">
              <span className="text-xl md:text-2xl font-bold font-heading text-black">
                {headerContent.logo}
              </span>
            </a>
          </div>

          {/* Navigation Menu and CTA Button - aligned to right */}
          <div className="col-span-9 md:col-span-10 lg:col-span-10 flex items-center justify-end gap-6 lg:gap-8">
            <nav className="hidden md:flex items-center">
              <ul className="flex items-center gap-6 lg:gap-8">
                {headerContent.navigation.map((link, index) => (
                  <li key={index}>
                    <AnimatedNavLink 
                      href={link.href} 
                      className="text-sm lg:text-md font-regular text-black hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </AnimatedNavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Button variant="primary" showArrow>
              {headerContent.ctaButtonText}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}