import Hero from "./section/Hero";
import Header from "./section/Header";
import CompanyLogo from "./section/CompanyLogo";
import AboutUs from "./section/AboutUs";
import Services from "./section/Services";
import WhyUs from "./section/WhyUs";
import Blog from "./section/Blog";
import Testimonials from "./section/Testimonials";
import FAQ from "./section/FAQ";
import Footer from "./section/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <CompanyLogo />
      <AboutUs />
      <Services />
      <WhyUs />
      <Blog />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
