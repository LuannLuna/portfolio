import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b7c6',
          400: '#838ca5',
          500: '#626c87',
          600: '#4d556d',
          700: '#3f4659',
          800: '#363c4b',
          900: '#0f1320',
          950: '#080a13',
        },
        accent: {
          DEFAULT: '#6366f1',
          50:  '#eef0ff',
          100: '#e0e3ff',
          200: '#c4caff',
          300: '#a3a8ff',
          400: '#8189ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(99,102,241,0.15), 0 20px 60px -20px rgba(99,102,241,0.35)',
      },
      backgroundImage: {
        'grid-light': 'radial-gradient(circle at 1px 1px, rgba(15,19,32,0.06) 1px, transparent 0)',
        'grid-dark':  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [typography],
}
