import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const config: Config = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        Anuphan: ["Anuphan", "sans-serif"],
      },
      colors: {
        "main-color": "#10316B",
        "second-color": "#FFE867",
        "background-color": "#F4F8FF",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".btn-download": {
          "@apply flex items-center justify-center gap-1 rounded-md bg-yellow-300 px-3 py-1 font-semibold shadow-md transition duration-100 hover:bg-yellow-400 active:scale-105 active:ring-1 active:ring-black":
            {},
        },
      });
    }),
  ],
};
export default config;
