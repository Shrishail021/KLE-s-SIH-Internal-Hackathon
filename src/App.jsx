import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Guidelines from './components/Guidelines'
import ProblemStatement from './components/ProblemStatement'
import Registration from './components/Registration'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-beige bg-grid overflow-x-hidden">
      {/* Sticky Glassmorphism Navbar */}
      <Navbar />

      {/* ── Sections ── */}
      <main>
        {/* 1. Hero — full viewport, 3D background */}
        <Hero />

        {/* 2. Guidelines — card grid with scroll animations */}
        <Guidelines />

        {/* 3. Problem Statement — themed accordion */}
        <ProblemStatement />

        {/* 4. Registration — elevated CTA card */}
        <Registration />
      </main>

      {/* 5. Footer — dark navy */}
      <Footer />
    </div>
  )
}
