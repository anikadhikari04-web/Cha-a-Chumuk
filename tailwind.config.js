/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: { 900: '#0a0a12', 800: '#12121f', 700: '#1a1a2e', 600: '#24243e', 500: '#2e2e4a' },
        accent: { DEFAULT: '#f5c518', light: '#ffd700', dark: '#d4a017', 50: 'rgba(245,197,24,0.1)', 100: 'rgba(245,197,24,0.2)' },
        neon: { purple: '#a855f7', blue: '#3b82f6', pink: '#ec4899' },
      },
      fontFamily: { bengali: ['"Hind Siliguri"', 'sans-serif'], display: ['Inter', 'sans-serif'] },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-15px)' } },
        floatSlow: { '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' }, '50%': { transform: 'translateY(-10px) rotate(3deg)' } },
        glow: { '0%': { boxShadow: '0 0 5px rgba(245,197,24,0.3)' }, '100%': { boxShadow: '0 0 20px rgba(245,197,24,0.6)' } },
      },
    },
  },
  plugins: [],
}
