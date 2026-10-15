/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1E8265", // One shade lighter, vibrant luxury British racing / forest green
          light: "#289B77",
          dark: "#14634B",
          glow: "rgba(30, 130, 101, 0.35)",
        },
        obsidian: {
          DEFAULT: "#FFFFFF",
          surface: "#F8F9FA",
          card: "#FFFFFF",
          hover: "#F1F3F5",
        },
        graphite: {
          DEFAULT: "#111827",
          light: "#374151",
          dark: "#030712",
        },
        wolf: {
          white: "#0A0A0A", // Jet luxury black for headlines
          muted: "#4B5563",
          paper: "#FFFFFF",
          light: "#FAFAFA",
        },
        silver: {
          DEFAULT: "#4B5563",
          light: "#6B7280",
          dark: "#1F2937",
        },
        crimson: {
          DEFAULT: "#E32119", // Ferrari Rosso Corsa red
          light: "#F87171",
          dark: "#B91C1C",
        },
        muted: {
          border: "#E5E7EB",
          surface: "#F9FAFB",
          subtle: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest: "0.22em",
        extreme: "0.32em",
      },
      boxShadow: {
        'forest-glow': '0 4px 20px -2px rgba(30, 130, 101, 0.35)',
        'crimson-glow': '0 4px 20px -2px rgba(227, 33, 25, 0.35)',
        'ferrari-card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        'ferrari-elevated': '0 20px 40px -10px rgba(0, 0, 0, 0.12)',
        'obsidian-deep': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '2px',
        md: '4px',
        lg: '6px',
        xl: '8px',
        '2xl': '10px',
      },
    },
  },
  plugins: [],
};
