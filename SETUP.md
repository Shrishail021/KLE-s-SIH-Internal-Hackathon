# KLE Jabin Internal Hackathon 2026 — Setup & Deployment Guide

---

## 📦 Project Summary

| Item | Detail |
|------|--------|
| Framework | Vite + React 18 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| 3D Hero | React Three Fiber + Three.js |
| Hosting | Vercel (static, free tier) |
| Backend | None — 100% static |

---

## ✅ Prerequisites

Before running locally, you need:

1. **Node.js** v18 or higher — [Download from nodejs.org](https://nodejs.org)
   - After installing, verify by opening any terminal and typing:
     ```
     node --version
     npm --version
     ```
   - Both should print a version number (e.g. `v20.17.0`)

2. **Git** (optional, for Vercel deploy) — [Download from git-scm.com](https://git-scm.com)

---

## 🚀 Running Locally

### Method 1 — One-click (Windows)

1. Open this folder in File Explorer
2. Double-click **`start.bat`**
3. The script auto-installs dependencies (first run, ~1-2 min) and starts the server
4. Open **http://localhost:5173** in your browser

---

### Method 2 — Terminal (recommended)

Open CMD, PowerShell, or VS Code terminal in this folder:

```bash
# Step 1 — Install dependencies (only once)
npm install

# Step 2 — Start dev server with hot-reload
npm run dev
```

Other commands:
```bash
npm run build    # Build production → dist/
npm run preview  # Preview production build locally
```

---

## 📁 Project Structure

```
├── index.html                    ← HTML entry (Google Fonts, SEO meta)
├── vite.config.js
├── tailwind.config.js            ← Design system colors from Stitch MCP
├── vercel.json                   ← Security headers
├── package.json
├── start.bat                     ← Windows one-click runner
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── App.jsx                   ← Root — all 5 sections
    ├── index.css                 ← Global styles + glassmorphism
    ├── components/
    │   ├── Navbar.jsx            ← Floating glass navbar + hamburger
    │   ├── Hero.jsx              ← Full-viewport hero + CTAs
    │   ├── ThreeDBackground.jsx  ← Three.js wireframe (isolated/removable)
    │   ├── Guidelines.jsx        ← 4-card rules grid
    │   ├── ProblemStatement.jsx  ← SIH themed accordions
    │   ├── Registration.jsx      ← Registration steps + CTA
    │   └── Footer.jsx            ← Dark navy footer
    ├── hooks/
    │   ├── useInView.js          ← Scroll trigger
    │   └── useMediaQuery.js      ← Responsive helper
    └── assets/logos/             ← Drop real logos here
```

---

## ✏️ Placeholders to Replace

Search `Ctrl+Shift+F` in VS Code for these:

| Token | Replace With |
|-------|-------------|
| `https://forms.gle/EEJkLAPL4BbryiQ9A` | Your Google Form URL |
| `https://sih.gov.in/sih2026PS` | Official SIH 2026 PS URL |
| `[EDIT ME]` | Real dates, contacts, descriptions |
| `/src/assets/logos/` | Drop `.png`/`.svg` logos and update Navbar/Footer |
| Social `href="#"` in Footer | Real Instagram/LinkedIn URLs |

---

## 🌐 Hosting on Vercel (Step-by-Step)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — KLE Jabin Hackathon 2026"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to **[vercel.com](https://vercel.com)** → Sign in with GitHub
2. Click **"Add New Project"** → **"Import Git Repository"**
3. Select your repo
4. Confirm these auto-detected settings:

   | Setting | Value |
   |---------|-------|
   | Framework Preset | **Vite** |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

5. Click **"Deploy"** — live in ~60 seconds at `https://your-project.vercel.app`

### 3. Auto-Redeploy on Push

Any `git push` to `main` triggers an automatic redeploy on Vercel. No extra steps.

### 4. Custom Domain (optional)

Vercel Dashboard → Project → **Settings → Domains** → Add your domain → Follow DNS instructions.

---

## 🔒 Security (pre-configured in vercel.json)

- `X-Frame-Options: DENY` — prevents clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` — Google Fonts + self only
- `Permissions-Policy` — camera/mic/geolocation disabled

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm: not found` | Install Node.js from nodejs.org, open new terminal |
| Missing `node_modules` | Run `npm install` |
| Port 5173 busy | `npm run dev -- --port 3000` |
| 3D not showing | Enable WebGL in browser / hardware acceleration |
| Build fails | Check `postcss.config.js` exists |

---

## 📋 Pre-Launch Checklist

- [ ] `npm run build` passes with no errors
- [ ] All `[EDIT ME]` tokens replaced
- [ ] Google Form URL updated
- [ ] SIH PS link updated
- [ ] Real logos in `/src/assets/logos/`
- [ ] Contact email/phone updated in Footer
- [ ] Social links updated in Footer
- [ ] Mobile tested at 375px — hamburger works, 3D degrades gracefully
- [ ] `vercel.json` security headers in place ✅
- [ ] `.gitignore` excludes `node_modules`, `dist`, `.env*` ✅
