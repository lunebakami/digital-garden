import type { Config } from "tailwindcss";

export default {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'Fira Code'", "monospace"],
        display: ["'Courier Prime'", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
