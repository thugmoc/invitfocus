import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Outcomes from '@/components/Outcomes'
import AISimulationSuite from '@/components/AISimulationSuite'
import UseCases from '@/components/UseCases'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />

      {/* Add padding for fixed header */}
      <div className="pt-16">
        <Hero />
        <Problem />
        <Solution />
        <Outcomes />
        <AISimulationSuite />
        <UseCases />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </div>

      <Footer />
    </main>
  )
}
