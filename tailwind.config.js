/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0F1E',
          surface: '#11172E',
          card: 'rgba(18, 24, 48, 0.75)',
          cardLight: 'rgba(25, 34, 66, 0.85)',
          border: 'rgba(255, 255, 255, 0.09)',
          borderGlow: 'rgba(124, 58, 237, 0.4)',
          purple: '#7C3AED',
          magenta: '#EC4899',
          gold: '#FFC83D',
          goldEnd: '#FF8A00',
          green: '#22C55E',
          red: '#EF4444',
          violet: '#8B5CF6',
          cyan: '#06B6D4',
        }
      },
      backgroundImage: {
        'primary-grad': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'gold-grad': 'linear-gradient(135deg, #FFC83D 0%, #FF8A00 100%)',
        'gold-grad-subtle': 'linear-gradient(135deg, rgba(255,200,61,0.15) 0%, rgba(255,138,0,0.15) 100%)',
        'card-grad': 'linear-gradient(180deg, rgba(24, 32, 64, 0.75) 0%, rgba(13, 18, 38, 0.9) 100%)',
        'card-grad-hover': 'linear-gradient(180deg, rgba(34, 45, 88, 0.85) 0%, rgba(17, 23, 49, 0.95) 100%)',
        'green-grad': 'linear-gradient(135deg, #22C55E 0%, #15803D 100%)',
        'red-grad': 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
        'violet-grad': 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
      },
      boxShadow: {
        'glow-primary': '0 0 25px -4px rgba(236, 72, 153, 0.45)',
        'glow-purple': '0 0 25px -4px rgba(124, 58, 237, 0.5)',
        'glow-gold': '0 0 25px -4px rgba(255, 170, 0, 0.5)',
        'glow-green': '0 0 20px -3px rgba(34, 197, 94, 0.45)',
        'glow-red': '0 0 20px -3px rgba(239, 68, 68, 0.45)',
        'card-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        num: ['Rajdhani', 'Orbitron', 'sans-serif'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shine': 'shine 2.5s ease-in-out infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
