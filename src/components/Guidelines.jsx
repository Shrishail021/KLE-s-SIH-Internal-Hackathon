import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

// [EDIT ME] — Replace these with real hackathon rules
const GUIDELINES = [
  {
    id: 'team-size',
    icon: 'groups',
    title: 'Team Size',
    description:
      'Each team must consist of exactly 6 members. At least one female  team member is mandatory.',
    color: '#0c6780',
    bgColor: 'rgba(154, 225, 255, 0.15)',
  },
  {
    id: 'eligibility',
    icon: 'school',
    title: 'Eligibility',
    description:
      'All 6 members must be from the same department. Interdepartmental teams are not permitted for this edition.',
    color: '#001F3F',
    bgColor: 'rgba(0, 31, 63, 0.06)',
  },
  {
    id: 'submission',
    icon: 'timer',
    title: 'Build Duration',
    description:
      'Teams have exactly 8 hours to design, develop, and present a working prototype of their solution.',
    color: '#0c6780',
    bgColor: 'rgba(135, 206, 235, 0.15)',
  },
  {
    id: 'code-of-conduct',
    icon: 'verified',
    title: 'Code of Conduct',
    description:
      'No plagiarism. Respect all teams. Mandatory attendance at both the opening and closing ceremonies.',
    color: '#001F3F',
    bgColor: 'rgba(0, 31, 63, 0.06)',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Guidelines() {
  const { ref, inView } = useInView({ threshold: 0.1, once: true })

  return (
    <section id="guidelines" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <span className="inline-block font-inter text-xs font-semibold tracking-[0.15em] uppercase text-[#0c6780] mb-4">
          Rules &amp; Eligibility
        </span>
        <h2 className="section-title text-4xl md:text-5xl mb-5">
          Guidelines
        </h2>
        <p className="font-inter text-on-surface-variant text-xl max-w-2xl mx-auto">
          {/* [EDIT ME] */}
          Everything you need to know before you register. Read carefully.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {GUIDELINES.map((g) => (
          <motion.div
            key={g.id}
            id={`guideline-${g.id}`}
            variants={cardVariants}
            className="card-lift bg-white rounded-2xl p-8 flex flex-col items-start gap-4
              shadow-card border border-[rgba(0,31,63,0.06)]"
          >
            {/* Icon bubble */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: g.bgColor }}
            >
              <span
                className="material-symbols-outlined text-2xl"
                style={{ color: g.color }}
              >
                {g.icon}
              </span>
            </div>

            <div>
              <h3
                className="font-montserrat font-bold text-lg text-navy mb-2 leading-snug"
              >
                {g.title}
              </h3>
              <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
                {g.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative bottom accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 h-px bg-gradient-to-r from-transparent via-[rgba(0,31,63,0.15)] to-transparent origin-left"
      />
    </section>
  )
}
