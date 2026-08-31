import { Suspense } from 'react'
import { motion } from 'framer-motion'
import ThreeDBackground from './ThreeDBackground'

const REGISTER_URL = 'https://forms.gle/EEJkLAPL4BbryiQ9A'   // [GOOGLE_FORM_LINK]
const SIH_URL = 'https://sih.gov.in/sih2026PS'                // [SIH_PROBLEM_STATEMENT_LINK]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '100px' }}
    >
      {/* Warm beige → white gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(160deg, #F5F5F0 0%, #ffffff 60%, #EBF6FB 100%)',
        }}
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,31,63,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,31,63,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Sky-blue ambient glow blobs */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/4 w-[520px] h-[520px] -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(135,206,235,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -10%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 bottom-0 w-[360px] h-[360px] -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,31,63,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-20%, 20%)',
        }}
      />

      {/* 3D Futuristic Background — isolated, removable */}
      <Suspense fallback={null}>
        <ThreeDBackground />
      </Suspense>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col items-center text-center">

        {/* Event badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-[rgba(0,31,63,0.15)]
            bg-white/70 backdrop-blur-sm text-sm font-inter font-semibold text-[#0c6780] tracking-widest uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0c6780] animate-pulse" />
          KLE Society's P.C. Jabin Science College
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="font-montserrat font-black text-[#000613] leading-[1.05] tracking-tight mb-6
            text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Internal{' '}
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #001F3F 30%, #0c6780 70%, #87CEEB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hackathon
          </span>
          <br />
          2026
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-inter text-xl md:text-2xl text-on-surface-variant max-w-2xl mb-4 leading-relaxed"
        >
          Innovate. Build. Compete.
        </motion.p>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="font-inter text-lg md:text-xl text-on-surface-variant/80 max-w-3xl mb-12 leading-relaxed"
        >
          {/* [EDIT ME] — Replace with actual event description */}
          Build real-world solutions using Smart India Hackathon problem statements. Form your team of
          exactly&nbsp;<strong className="text-navy">6 students</strong> from the same department and compete in an&nbsp;
          <strong className="text-navy">8-hour sprint</strong> of innovation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-register-btn"
            className="btn-primary text-lg md:text-xl px-10 md:px-12 py-5 shadow-cta"
          >
            <span className="material-symbols-outlined text-2xl">how_to_reg</span>
            Register Now
          </a>
          <a
            href={SIH_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-sih-btn"
            className="btn-outline text-lg md:text-xl px-10 md:px-12 py-5"
          >
            <span className="material-symbols-outlined text-2xl">open_in_new</span>
            View Problem Statements
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex flex-col items-center gap-2 text-on-surface-variant/50"
        >
          <span className="text-xs font-inter uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
