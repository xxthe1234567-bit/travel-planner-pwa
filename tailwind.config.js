/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EB',
        'cream-dark': '#E8E4DA',
        'cream-light': '#FAF8F3',
        sage: '#9CAF88',
        'sage-light': '#C5D1B0',
        'sage-dark': '#7A9068',
        earth: '#B5A689',
        'earth-dark': '#8B7355',
        warm: '#E8DCC8',
        'warm-dark': '#D4C4A8',
        coral: '#E57373',
        'coral-light': '#FFAB91',
        sky: '#64B5F6',
        'sky-light': '#90CAF9',
        forest: '#81C784',
        'forest-light': '#A5D6A7',
        lavender: '#BA68C8',
        'lavender-light': '#CE93D8',
        orange: '#FFB74D',
        'orange-light': '#FFCC80',
      },
      boxShadow: {
        'soft': '4px 4px 0px #E0E5D5',
        'soft-sm': '2px 2px 0px #E0E5D5',
        'soft-hover': '6px 6px 0px #D8DED0',
        'soft-lg': '8px 8px 0px #E0E5D5',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        sans: ['Noto Sans TC', 'Nunito', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dot-pattern': 'radial-gradient(circle, #D4D0C8 1px, transparent 1px)',
        'grid-pattern': 'linear-gradient(to right, #E8E4DA 1px, transparent 1px), linear-gradient(to bottom, #E8E4DA 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot': '20px 20px',
        'grid': '24px 24px',
      },
    },
  },
  plugins: [],
}