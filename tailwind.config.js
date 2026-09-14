/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#09090B',
        surface: '#111114',
        'surface-elevated': '#18181C',
        'surface-highlight': '#222228',
        border: {
          DEFAULT: '#27272A',
          subtle: '#1E1E22',
          light: '#3F3F46',
        },
        editorial: {
          white: '#F4F4F5',
          light: '#E4E4E7',
          gray: '#A1A1AA',
          muted: '#71717A',
          dark: '#27272A',
          black: '#09090B',
        },
        data: {
          cyan: '#06B6D4',
          emerald: '#10B981',
          blue: '#3B82F6',
          amber: '#F59E0B',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        display: ['Syne', 'Bebas Neue', 'Anton', 'sans-serif'],
        condensed: ['Bebas Neue', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        'tighter-editorial': '-0.04em',
        'tight-editorial': '-0.02em',
        'wide-editorial': '0.15em',
        'widest-editorial': '0.25em',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
