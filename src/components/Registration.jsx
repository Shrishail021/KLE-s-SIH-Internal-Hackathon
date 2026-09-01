import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const REGISTER_URL = 'https://forms.gle/EEJkLAPL4BbryiQ9A' // [GOOGLE_FORM_LINK]

// [EDIT ME] — Update deadline, contact, and team details
const STEPS = [
  {
    id: 1,
    icon: 'group_add',
    title: 'Form Your Team',
    description: 'Gather exactly 6 students from your department. At least one female team member is mandatory.Choose your strongest combination of skills — coding, design, and domain knowledge.',
  },
  {
    id: 2,
    icon: 'search',
    title: 'Choose a Problem Statement',
    description:
      'Browse the official SIH 2026 problem statements and pick one that excites your team. You\'ll specify your selection in the form.',
  },
  {
    id: 3,
    icon: 'edit_document',
    title: 'Fill the Registration Form',
    description:
      'Complete the Google Form with your team details, selected problem statement, and a brief idea summary before 08-09-2026 3.00pm.',
  },
  {
    id: 4,
    icon: 'celebration',
    title: 'Confirm & Compete',
    description:
      'Once you complete filling the Google form you\'ll get a WhatsApp group link there. You must join and further updates will be posted in WhatsApp.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Registration() {
  const { ref, inView } = useInView({ threshold: 0.1, once: true })

  return (
    <section id="registration" className="py-16 md:py-24 px-5 md:px-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Elevated card with light-blue tint */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-cta"
          style={{ background: 'linear-gradient(135deg, #EBF6FB 0%, #d4f1fb 40%, #c9eefc 100%)' }}
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-72 h-72 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(135,206,235,0.45) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 w-64 h-64 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0,31,63,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20">
            {/* Header */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14"
            >
              <span className="inline-block font-inter text-xs font-semibold tracking-[0.15em] uppercase text-[#0c6780] mb-4">
                Join the Hackathon
              </span>
              <h2 className="section-title text-4xl md:text-5xl mb-4">
                Ready to Innovate?
              </h2>
              <p className="font-inter text-on-surface-variant text-xl max-w-2xl mx-auto">
                {/* [EDIT ME] */}
                Registration is free. Follow the steps below and submit your team details via Google
                Form before the deadline.
              </p>
            </motion.div>

            {/* Steps */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14"
            >
              {STEPS.map((step) => (
                <motion.div
                  key={step.id}
                  id={`reg-step-${step.id}`}
                  variants={stepVariants}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 flex items-start gap-5
                    border border-white/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Step number + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1">
                    <div className="w-11 h-11 rounded-xl bg-navy flex items-center justify-center shadow-card">
                      <span className="material-symbols-outlined text-xl text-white">{step.icon}</span>
                    </div>
                    <span className="font-montserrat text-xs font-black text-navy/40">
                      0{step.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-base text-navy mb-1.5">
                      {step.title}
                    </h3>
                    <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Registration Deadline Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center mb-12"
            >
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-navy/10 shadow-sm">
                <span className="material-symbols-outlined text-2xl text-[#e63946]">alarm</span>
                <span className="font-inter text-base md:text-lg text-on-surface-variant">
                  Registration Deadline: <strong className="text-[#e63946] font-bold">08-09-2026 3.00pm</strong>
                </span>
              </div>
            </motion.div>

            {/* Main CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <a
                href={REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="reg-cta-btn"
                className="btn-primary text-lg md:text-xl px-12 py-5 shadow-cta"
              >
                <span className="material-symbols-outlined text-xl">how_to_reg</span>
                Register Your Team
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
