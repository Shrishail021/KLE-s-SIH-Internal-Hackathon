# MASTER PROMPT — Paste this into Antigravity

## Project
Build a **single-page website** for:
**"KLE Society's P.C. Jabin Science College — Internal Hackathon 2026 — Team Registration"**

This is a static, single-page application (SPA) with an in-page navigation bar. Clicking a nav item either **smooth-scrolls to a section on the same page** OR **opens an external link in a new tab** (for Registration and Problem Statement). No multi-page routing is needed.

---

## Tech Stack (required)
- **Vite + React** (JavaScript, not TypeScript unless you prefer — either is fine)
- **Tailwind CSS** for styling
- **Framer Motion** for scroll/entrance animations
- **React Three Fiber + drei** (three.js wrapper) for a subtle 3D/futuristic hero element — keep it lightweight, no heavy geometry, must not tank mobile performance
- **react-scroll** (or native `scrollIntoView` with `scroll-behavior: smooth`) for in-page nav
- No backend, no database, no server — 100% static output, deployable as-is to **Vercel**

---

## Folder Structure
```
/src
  /components
    Navbar.jsx
    Hero.jsx
    Guidelines.jsx
    ProblemStatement.jsx
    Registration.jsx
    Footer.jsx
    ThreeDBackground.jsx   (the 3D futuristic element, isolated so it can be swapped/removed easily)
  /assets
    logos/                (empty folder, placeholder — logos added later)
  App.jsx
  main.jsx
  index.css
vite.config.js
vercel.json
package.json
```

---

## Navigation Bar
Sticky top navbar, translucent/glassmorphism on scroll (backdrop-blur), containing:
1. **Logo placeholder** (left) — use a simple placeholder box/text "LOGO" with a comment `{/* TODO: replace with college logo from /src/assets/logos */}`
2. Event title / short name (center or next to logo)
3. Nav links (right):
   - **Home** → smooth scroll to Hero section
   - **Guidelines** → smooth scroll to Guidelines section
   - **Problem Statement** → external link, opens in new tab: `[SIH_PROBLEM_STATEMENT_LINK:https://sih.gov.in/sih2026PS]` — add `target="_blank" rel="noopener noreferrer"`
   - **Register** → external link, opens in new tab: `[GOOGLE_FORM_LINK:https://forms.gle/EEJkLAPL4BbryiQ9A]` — styled as a prominent CTA button, `target="_blank" rel="noopener noreferrer"`
4. Mobile: collapses into a hamburger menu with a smooth slide/fade animation.

---

## Sections (in order)

### 1. Hero
- Full-viewport height.
- Event name, college name, tagline (e.g. "Innovate. Build. Compete.") — use placeholder copy, easy to edit.
- Subtle animated 3D futuristic element in background (via `ThreeDBackground.jsx`) — e.g. a slowly rotating abstract geometric shape, low-poly network/particle mesh, or floating wireframe — in light blue / navy tones against the beige/white background. Must feel premium, not distracting.
- Primary CTA button: "Register Now" → external Google Form link (placeholder), opens new tab.
- Secondary CTA/link: "View Problem Statements" → external SIH link (placeholder), opens new tab.

### 2. Guidelines
- Card-based or timeline layout listing hackathon rules (team size : 6 exactly, eligibility : must be from same depertment , submission rules: hackathon project can be build in 8hrs , code of conduct: no plagiarism, respect other teams, participate in opening and closing ceremony).
- Use placeholder guideline text so it's easy for the user to replace with real rules later.
- Subtle scroll-in animations (fade + slide) per card via Framer Motion.

### 3. Problem Statement
- Short explanatory text: "All teams must select their problem statement from the official Smart India Hackathon portal."
- scrape All the problems with there title and description from https://sih.gov.in/sih2026PS. make into group based on themes.
- also Add button to official site 
- Do NOT embed/iframe the SIH page — just link out (SIH content isn't ours to embed, and it avoids clickjacking/CSP issues).

### 4. Registration
- Short instructions on how to register (team size, deadline placeholder, contact for queries).
- Large CTA button: "Register Your Team" → `[https://forms.gle/EEJkLAPL4BbryiQ9A]`, opens new tab.
- Do NOT iframe-embed the Google Form (keeps the page fast, avoids third-party cookie/CSP issues) — link out instead unless the user later asks to embed it.

### 5. Footer
- College name, department name (placeholder), address (placeholder).
- Contact email/phone placeholders.
- Social links placeholders (Instagram/LinkedIn — leave as `#` until provided).
- Small logos row (placeholder boxes, `{/* TODO: logos */}`).
- Copyright line with current year.

---

## Design Direction
Follow the companion **UI prompt (02-ui-prompt.md)** ( refer stitch MCP already made: Jabin Internal Hackathon 2026)for exact visual style. In short: light theme, beige/white base, white + dark blue + light blue accents, modern, futuristic, subtle 3D touches — **not a dark theme**.


---

## Security requirements (must implement)
- All external links use `target="_blank" rel="noopener noreferrer"`.
- Add a `vercel.json` with security headers:
  - `Content-Security-Policy` (allow self + necessary CDN/font sources only)
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` restricting camera/mic/geolocation (not needed by this site)
- No inline `eval`, no third-party scripts beyond what's explicitly needed (fonts/three.js).
- No forms collecting data directly on this site (registration happens via Google Form externally) — so there's no user data to secure/store on our side, which is intentionally the simplest and safest option.
- `.gitignore` should exclude `node_modules`, `.env*`, `dist`.
- No API keys or secrets required anywhere in this project — flag it clearly if any get introduced later, since a static site should not need them.

---

## Deployment (Vercel)
- Vite default build (`npm run build` → `dist/`) works out of the box on Vercel — no special config needed beyond the `vercel.json` headers above.
- Add a root `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```
- Confirm `package.json` has correct `build` and `preview` scripts for Vite.

---

## Placeholders to replace later (search for these exact tokens)
- `[GOOGLE_FORM_LINK]` — registration Google Form URL
- `[SIH_PROBLEM_STATEMENT_LINK]` — Smart India Hackathon problem statement page URL
- `/src/assets/logos/` — college logo, department logo, event logo, sponsor logos
- `[EDIT ME]` — guideline text, contact details, deadline dates, social links

---

## Acceptance checklist for Antigravity to self-verify before finishing
- [ ] Single page , all 5 sections present, nav scrolls correctly to each
- [ ] Registration and Problem Statement nav items open external links in a new tab
- [ ] Light/beige theme with white + dark blue + light blue accents — no dark-mode-only design
- [ ] 3D hero element renders and doesn't break on mobile (test at 375px width)
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] `vercel.json` present with security headers
- [ ] No console errors, no broken imports
- [ ] All placeholders clearly marked and easy to find/replace
