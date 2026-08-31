/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch design system — Jabin Internal Hackathon 2026
        primary: "#000613",
        "on-primary": "#ffffff",
        "primary-container": "#001f3f",
        "on-primary-container": "#6f88ad",
        "inverse-primary": "#afc8f0",
        secondary: "#0c6780",
        "on-secondary": "#ffffff",
        "secondary-container": "#9ae1ff",
        "on-secondary-container": "#09657f",
        "primary-fixed": "#d4e3ff",
        "primary-fixed-dim": "#afc8f0",
        "on-primary-fixed": "#001c3a",
        "on-primary-fixed-variant": "#2f486a",
        "secondary-fixed": "#baeaff",
        "secondary-fixed-dim": "#89d0ed",
        "on-secondary-fixed": "#001f29",
        "on-secondary-fixed-variant": "#004d62",
        surface: "#f9f9f9",
        "surface-dim": "#dadada",
        "surface-bright": "#f9f9f9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f3f4",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "surface-container-highest": "#e2e2e2",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#43474e",
        "inverse-surface": "#2f3131",
        "inverse-on-surface": "#f0f1f1",
        outline: "#74777f",
        "outline-variant": "#c4c6cf",
        background: "#f9f9f9",
        "on-background": "#1a1c1c",
        "surface-variant": "#e2e2e2",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        // Custom extras
        beige: "#F5F5F0",
        navy: "#001F3F",
        skyblue: "#87CEEB",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        sm: "0.5rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0px 10px 30px rgba(0, 31, 63, 0.05)",
        "card-hover": "0px 20px 40px rgba(0, 31, 63, 0.10)",
        navbar: "0px 10px 30px rgba(0, 31, 63, 0.08)",
        cta: "0px 20px 40px rgba(0, 31, 63, 0.15)",
      },
      backgroundImage: {
        "grid-pattern": `
          linear-gradient(to right, rgba(0, 31, 63, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 31, 63, 0.05) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
}
