# How to use these two files

1. **Stitch** → paste `02-ui-prompt.md` in. This gets you the visual design/mockup (layout, colors, 3D-futuristic feel, light beige theme).
2. **Antigravity** → paste `01-master-prompt.md` in, and tell it to follow the Stitch design as closely as possible for styling while implementing the structure/tech/security/deploy requirements in the prompt.
3. Before final deploy, search the generated code for these placeholders and replace them:
   - `[GOOGLE_FORM_LINK]`
   - `[SIH_PROBLEM_STATEMENT_LINK]`
   - `/src/assets/logos/` — drop your logo files in here and wire them into Navbar/Footer
   - `[EDIT ME]` — guideline text, dates, contact info, social links
4. **Vercel** → import the GitHub repo, framework preset "Vite," default build settings work. No environment variables needed since there's no backend.

## Notes
- The site never stores or transmits registration data itself — it only links out to your Google Form — so there's no user data to secure on your end, no database, and no API keys involved.
- If you later decide you *do* want to embed the Google Form (iframe) instead of linking out, say so — it changes the CSP/security headers and is a quick follow-up.
