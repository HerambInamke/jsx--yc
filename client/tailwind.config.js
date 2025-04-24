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
            light: '#8A2BE2',
            DEFAULT: '#510378',
            dark: '#3D025A',
            darker: '#2A013F',
          },
          secondary: {
            light: '#FF69B4',
            DEFAULT: '#FF1493',
            dark: '#C71585',
          },
          text: {
            light: '#F7FCFE',
            gray: '#6B7280',
          }
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}