import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ServicesSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
