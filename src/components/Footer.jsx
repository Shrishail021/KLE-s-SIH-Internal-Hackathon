// TODO: replace with real logos from /src/assets/logos/
const LogoRow = () => (
  <div className="flex items-center gap-4 flex-wrap">
    {['KLE Society', 'P.C. Jabin', 'Dept'].map((name) => (
      <div
        key={name}
        className="w-10 h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/40 text-[9px] font-montserrat font-bold tracking-wide"
        title={`${name} logo placeholder`}
      >
        {name.slice(0, 3).toUpperCase()}
      </div>
    ))}
  </div>
)

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Guidelines', href: '#guidelines' },
  { label: 'Problem Statements', href: '#problem-statement' },
  { label: 'Registration', href: '#registration' },
]

const handleNavClick = (e, href) => {
  e.preventDefault()
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-navy text-white" aria-label="Site footer">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* College Info */}
          <div className="lg:col-span-2">
            <LogoRow />
            <div className="mt-4">
              <h3 className="font-montserrat font-bold text-base text-white mb-1">
                KLE Society's P.C. Jabin Science College
              </h3>
              <p className="font-inter text-sm text-white/60 leading-relaxed">

                Hubli, Karnataka — 580031<br />

              </p>
            </div>
            <div className="mt-4 flex gap-3">
              {/* Social placeholders — [EDIT ME] replace # with real URLs */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                  text-white/60 hover:text-white hover:border-white/60 transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                  text-white/60 hover:text-white hover:border-white/60 transition-all duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-bold text-sm text-white/90 mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-inter text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-bold text-sm text-white/90 mb-4 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:hackathon@jabinsciencecollege.edu.in"  // [EDIT ME]
                  className="font-inter text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm text-skyblue">mail</span>
                  {/* [EDIT ME] */}
                  hackathon@jabinsciencecollege.edu.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+910000000000"  // [EDIT ME]
                  className="font-inter text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm text-skyblue">phone</span>
                  {/* [EDIT ME] */}
                  +91 00000-00000
                </a>
              </li>
              <li className="font-inter text-sm text-white/60 flex items-start gap-2">
                <span className="material-symbols-outlined text-sm text-skyblue mt-0.5">location_on</span>
                {/* [EDIT ME] */}
                P.C. Jabin Science College, Vidyanagar, Hubli-580031
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-white/40">
            © {year} KLE Society's P.C. Jabin Science College. All rights reserved.
          </p>
          <p className="font-inter text-xs text-white/30">
            Built with ❤️ for Internal Hackathon 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
