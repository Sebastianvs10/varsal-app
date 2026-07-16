import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProductsSection from '@/components/sections/ProductsSection'
import ProcessSection from '@/components/sections/ProcessSection'
import WhySection from '@/components/sections/WhySection'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProductsSection />
        <ProcessSection />
        <WhySection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
