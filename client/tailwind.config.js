import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festival: {
          primary: {
            light: '#7407AA26', // 15% opacity of #7407AA
            DEFAULT: '#510378', // 100% opacity
            dark: '#3D025A',
            darker: '#2A013F',
          },
          text: {
            light: '#F7FCFE',
            gray: '#6B7280',
          }
        },
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAD8/vz08vT09PT8/Pz///+Vc3ZvAAAABnRSTlMCAgICAgLp/qWRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIElEQVQ4jWNgQAP8/PyYwMDAQBPEP6o4qqKhpYhaTgAAE+gLdFnwgYMAAAAASUVORK5CYII=')",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}