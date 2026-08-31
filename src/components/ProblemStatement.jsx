import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const SIH_URL = 'https://sih.gov.in/sih2026PS' // [SIH_PROBLEM_STATEMENT_LINK]

// SIH 2026 problem statement themes — grouped by category
// [EDIT ME] — Update with real PS titles/descriptions once SIH releases final list
const THEMES = [
  {
    id: 'agriculture',
    icon: 'agriculture',
    theme: 'Agriculture & Rural Development',
    color: '#2d6a4f',
    bgColor: 'rgba(45, 106, 79, 0.10)',
    glowColor: 'rgba(45, 106, 79, 0.06)',
    problems: [
      {
        id: 'ag-1',
        title: 'Smart Crop Monitoring System',
        description:
          'IoT-based solution to monitor soil health, moisture, and crop growth in real time, providing actionable insights to farmers.',
      },
      {
        id: 'ag-2',
        title: 'Cold Chain Logistics Optimisation',
        description:
          'Platform to reduce post-harvest losses by optimising cold chain logistics for perishable agricultural produce.',
      },
    ],
  },
  {
    id: 'health',
    icon: 'health_and_safety',
    theme: 'Health & Wellness',
    color: '#e63946',
    bgColor: 'rgba(230, 57, 70, 0.10)',
    glowColor: 'rgba(230, 57, 70, 0.06)',
    problems: [
      {
        id: 'hc-1',
        title: 'Rural Telemedicine Access',
        description:
          'Low-bandwidth telemedicine solution enabling rural patients to consult specialists and receive prescriptions digitally.',
      },
      {
        id: 'hc-2',
        title: 'Mental Health Early Detection',
        description:
          'AI-driven tool to detect early signs of mental health disorders through behavioural patterns and anonymised interactions.',
      },
    ],
  },
  {
    id: 'education',
    icon: 'menu_book',
    theme: 'Education & Skill Development',
    color: '#0c6780',
    bgColor: 'rgba(12, 103, 128, 0.10)',
    glowColor: 'rgba(12, 103, 128, 0.06)',
    problems: [
      {
        id: 'edu-1',
        title: 'Personalised Learning Paths',
        description:
          "Adaptive learning platform that tailors content and assessments to each student's proficiency level.",
      },
      {
        id: 'edu-2',
        title: 'Vernacular Skill Training App',
        description:
          'Offline-capable mobile app delivering vocational training in regional languages for underserved communities.',
      },
    ],
  },
  {
    id: 'environment',
    icon: 'eco',
    theme: 'Environment & Climate',
    color: '#3a7d44',
    bgColor: 'rgba(58, 125, 68, 0.10)',
    glowColor: 'rgba(58, 125, 68, 0.06)',
    problems: [
      {
        id: 'env-1',
        title: 'Urban Air Quality Dashboard',
        description:
          'Real-time dashboard aggregating pollution data from distributed sensors to help city planners act.',
      },
      {
        id: 'env-2',
        title: 'Plastic Waste Tracking System',
        description:
          'System to track and incentivise plastic waste segregation and recycling at the household level.',
      },
    ],
  },
  {
    id: 'smart-cities',
    icon: 'location_city',
    theme: 'Smart Cities & Infrastructure',
    color: '#001F3F',
    bgColor: 'rgba(0, 31, 63, 0.08)',
    glowColor: 'rgba(0, 31, 63, 0.04)',
    problems: [
      {
        id: 'sc-1',
        title: 'Predictive Road Maintenance',
        description:
          'Computer vision and historical data to predict road deterioration and schedule maintenance automatically.',
      },
      {
        id: 'sc-2',
        title: 'Integrated Public Transport App',
        description:
          'Unified mobility platform for bus, metro, and auto-rickshaw with live tracking and fare comparison.',
      },
    ],
  },
  {
    id: 'fintech',
    icon: 'payments',
    theme: 'FinTech & Digital Economy',
    color: '#6a0572',
    bgColor: 'rgba(106, 5, 114, 0.10)',
    glowColor: 'rgba(106, 5, 114, 0.06)',
    problems: [
      {
        id: 'ft-1',
        title: 'Financial Literacy for Rural Users',
        description:
          'Gamified mobile app teaching financial literacy to first-time banking and UPI users in rural India.',
      },
      {
        id: 'ft-2',
        title: 'MSME Credit Scoring Tool',
        description:
          'Alternative credit scoring model for micro and small enterprises using non-traditional data signals.',
      },
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function ThemeCard({ theme }) {
  return (
    <motion.a
      href={SIH_URL}
      target="_blank"
      rel="noopener noreferrer"
      id={`theme-card-${theme.id}`}
      variants={cardVariants}
      // Pure CSS hover via .theme-card class — no React state needed
      className="theme-card"
      style={{ '--theme-color': theme.color }}
    >
      {/* ── Animated top stripe (expands from 36% → 100% on hover via CSS) ── */}
      <div
        className="stripe"
        style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}99)` }}
      />

      {/* ── Card body ── */}
      <div className="p-6">

        {/* Icon + title row */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="icon-bubble w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: theme.bgColor }}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ color: theme.color }}
            >
              {theme.icon}
            </span>
          </div>
          <div>
            <h3
              className="theme-title font-montserrat font-bold text-sm md:text-base leading-snug mb-1"
              style={{ color: theme.color }}
            >
              {theme.theme}
            </h3>
            <span className="font-inter text-xs text-on-surface-variant/60 uppercase tracking-widest">
              {theme.problems.length} problems
            </span>
          </div>
        </div>

        {/* Problem list */}
        <div className="flex flex-col gap-3 mb-5">
          {theme.problems.map((p) => (
            <div
              key={p.id}
              id={`ps-${p.id}`}
              className="problem-border pl-3"
              style={{ borderColor: `${theme.color}55` }}
            >
              <p
                className="font-montserrat font-semibold text-xs leading-snug mb-0.5"
                style={{ color: theme.color }}
              >
                {p.title}
              </p>
              <p className="font-inter text-xs text-on-surface-variant/70 leading-relaxed line-clamp-2">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* SIH Portal link — slides in from left on hover via CSS */}
        <div
          className="sih-link flex items-center gap-1.5 font-inter font-semibold text-xs"
          style={{ color: theme.color }}
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          View on SIH Portal →
        </div>
      </div>

      {/* Glow overlay — fades in on hover via CSS */}
      <div
        className="card-glow"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${theme.glowColor} 0%, transparent 75%)`,
        }}
      />
    </motion.a>
  )
}

export default function ProblemStatement() {
  const { ref, inView } = useInView({ threshold: 0.05, once: true })

  return (
    <section
      id="problem-statement"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #EBF6FB 35%, #F5F5F0 100%)' }}
      />
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,31,63,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Ambient glow blob */}
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-20 w-[560px] h-[560px] -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(135,206,235,0.18) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <span className="inline-block font-inter text-xs font-semibold tracking-[0.15em] uppercase text-[#0c6780] mb-4">
            Smart India Hackathon 2026
          </span>
          <h2 className="section-title text-4xl md:text-5xl mb-4">
            Problem Statements
          </h2>
          <p className="font-inter text-on-surface-variant text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Pick a challenge from the official SIH 2026 portal. Hover any theme below to explore
            problems — each card links directly to the SIH website.
          </p>
        </motion.div>

        {/* ── Primary CTA button ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-14"
        >
          <a
            href={SIH_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="ps-sih-main-btn"
            className="btn-primary inline-flex text-base px-8 py-4 shadow-cta"
          >
            <span className="material-symbols-outlined text-xl">open_in_new</span>
            View All Problems on SIH Portal
          </a>
        </motion.div>

        {/* ── 3-column Theme Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {THEMES.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center font-inter text-base md:text-lg text-on-surface-variant/80 mt-10 max-w-3xl mx-auto"
        >
          Problem statements shown are representative examples.{' '}
          <a
            href={SIH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0c6780] font-semibold underline underline-offset-4 hover:text-navy transition-colors"
          >
            Visit the official SIH portal
          </a>{' '}
          for the complete and authoritative list.
        </motion.p>

      </div>
    </section>
  )
}
