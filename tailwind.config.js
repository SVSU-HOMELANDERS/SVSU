/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        navy: {
          950: '#0a1330',
          900: '#0f1f4b',
          800: '#142761',
          700: '#19327d',
          600: '#1e3e9d',
          500: '#2563eb',
          100: '#e8ecf8',
          50: '#f2f4fc',
        },
        crimson: {
          900: '#7f1d1d',
          800: '#991b1b',
          700: '#b91c1c',
          600: '#c51d34',
          500: '#dc2626',
          100: '#fee2e2',
          50: '#fef2f2',
        },
        gold: {
          600: '#d97706',
          500: '#f59e0b',
          400: '#fbbf24',
          300: '#fcd34d',
          100: '#fef3c7',
        },
        warm: {
          50: '#faf9f5',
          100: '#f4f2ea',
          200: '#eae5d8',
          300: '#ded7c3',
          800: '#2c2d30',
          900: '#1c1d20',
        },
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'popup-in': 'popupIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'popup-out': 'popupOut 0.35s cubic-bezier(0.7, 0, 0.84, 0) forwards',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        popupIn: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        popupOut: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(24px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
