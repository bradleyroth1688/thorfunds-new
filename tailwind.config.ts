import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f7',
          100: '#d9e1eb',
          200: '#b3c3d7',
          300: '#8da5c3',
          400: '#6787af',
          500: '#41699b',
          600: '#34547c',
          700: '#273f5d',
          800: '#1a365d', // Primary Navy
          900: '#0d1b2e',
          950: '#060d17',
        },
        gold: {
          50: '#fdf9ed',
          100: '#f9efd1',
          200: '#f3dfa3',
          300: '#eccf75',
          400: '#e5bf47',
          500: '#d69e2e', // Primary Gold
          600: '#ab7f25',
          700: '#805f1c',
          800: '#554013',
          900: '#2b200a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
