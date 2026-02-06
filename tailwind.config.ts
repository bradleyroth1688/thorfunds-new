import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
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
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(214, 158, 46, 0.4)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(214, 158, 46, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(214, 158, 46, 0.3)',
        'glow-lg': '0 0 40px rgba(214, 158, 46, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(214, 158, 46, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'radial-gradient(ellipse at 20% 0%, rgba(214, 158, 46, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(26, 54, 93, 0.3) 0%, transparent 50%), linear-gradient(to bottom right, #152c4a, #0e1f36)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.gold.600'),
              '&:hover': {
                color: theme('colors.gold.700'),
              },
            },
            h1: {
              color: theme('colors.navy.800'),
            },
            h2: {
              color: theme('colors.navy.800'),
            },
            h3: {
              color: theme('colors.navy.800'),
            },
            h4: {
              color: theme('colors.navy.800'),
            },
            strong: {
              color: theme('colors.navy.800'),
            },
            blockquote: {
              borderLeftColor: theme('colors.gold.500'),
              backgroundColor: theme('colors.gold.50'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.gold.400'),
              '&:hover': {
                color: theme('colors.gold.300'),
              },
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            strong: {
              color: theme('colors.white'),
            },
            blockquote: {
              borderLeftColor: theme('colors.gold.500'),
              backgroundColor: theme('colors.navy.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
