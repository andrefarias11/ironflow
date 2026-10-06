/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ios: {
          bg: "#000000",
          card: "#121214",
          cardElevated: "#1C1C1E",
          cardHighlight: "#2C2C2E",
          subtle: "#3A3A3C",
          separator: "#2C2C2E",
          textSecondary: "#8E8E93",
          accent: "#D4FF00",
          accentGreen: "#30D158",
          accentBlue: "#0A84FF",
          accentOrange: "#FF9F0A"
        }
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'SF Pro Text'",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      },
      boxShadow: {
        'glow-accent': '0 0 20px -3px rgba(212, 255, 0, 0.25)',
        'glow-green': '0 0 20px -3px rgba(48, 209, 88, 0.3)',
      }
    },
  },
  plugins: [],
}

