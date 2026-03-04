import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [animate],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geologica", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config
