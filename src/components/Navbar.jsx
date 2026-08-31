import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import kleLogo from '../assets/logos/KLE_logo.png'

const NAV_LINKS = [
  { label: 'Home', href: '#home', external: false },
  { label: 'Guidelines', href: '#guidelines', external: false },
  {
    label: 'Problem Statement',
    href: '#problem-statement',
    external: false,
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500
        w-[95%] max-w-7xl rounded-full
        ${scrolled ? 'glass-navbar-scrolled' : 'glass-navbar'}
      `}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
        {/* Logo + Title */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group"
          aria-label="KLE Jabin Hackathon Home"
        >
          {/* KLE Society Logo */}
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden border border-white/60">
            <img
              src={kleLogo}
              alt="KLE Society logo"
              className="w-8 h-8 md:w-12 md:h-12 object-contain drop-shadow-sm"
              draggable={false}
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-montserrat font-bold text-base text-navy leading-tight block tracking-tight">
              KLE Society's P.C. Jabin Science College,Hubballi
            </span>
            <span className="font-inter text-sm text-on-surface-variant leading-tight block">
              Internal Hackathon 2026
            </span>
          </div>
          <span className="sm:hidden font-montserrat font-bold text-sm text-navy tracking-tight">
            Jabin H'26
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-5 py-2.5 rounded-full font-inter text-base font-medium text-on-surface-variant
                hover:text-navy hover:bg-white/60 transition-all duration-200 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          {/* Problem Statement external link */}
          <a
            href="https://sih.gov.in/sih2026PS"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full font-inter text-base font-medium text-on-surface-variant
              hover:text-navy hover:bg-white/60 transition-all duration-200 whitespace-nowrap hidden lg:inline-flex items-center gap-1"
          >
            SIH Portal
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
          {/* Register CTA */}
          <a
            href="https://forms.gle/EEJkLAPL4BbryiQ9A"
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-register-btn"
            className="ml-3 btn-primary text-base px-6 py-3 shadow-card"
          >
            Register
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full hover:bg-white/40 transition-colors gap-1.5 p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-navy rounded-full transition-all duration-300 origin-center
              ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-navy rounded-full transition-all duration-300
              ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-navy rounded-full transition-all duration-300 origin-center
              ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden rounded-b-3xl"
          >
            <nav className="flex flex-col px-5 pb-5 pt-2 gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-2xl font-inter text-sm font-medium text-on-surface-variant
                    hover:text-navy hover:bg-white/70 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://sih.gov.in/sih2026PS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-2xl font-inter text-sm font-medium text-on-surface-variant
                  hover:text-navy hover:bg-white/70 transition-all duration-200 flex items-center gap-1"
              >
                SIH Portal
                <span className="material-symbols-outlined text-xs">open_in_new</span>
              </a>
              <div className="pt-2">
                <a
                  href="https://forms.gle/EEJkLAPL4BbryiQ9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="mobile-register-btn"
                  className="btn-primary w-full text-center text-sm"
                >
                  Register Your Team
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
