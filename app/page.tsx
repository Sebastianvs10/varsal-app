import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProductsSection from '@/components/sections/ProductsSection'
import TechSection from '@/components/sections/TechSection'
import CasesSection from '@/components/sections/CasesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BlogSection from '@/components/sections/BlogSection'
import CTASection from '@/components/sections/CTASection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProductsSection />
        <TechSection />
        <CasesSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
