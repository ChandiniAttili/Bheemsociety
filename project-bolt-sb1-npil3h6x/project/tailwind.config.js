/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: '#800000', // Define the maroon color
      },
      animation: {
        scroll: 'scroll 15s linear infinite', // scrolling animation
        blink: 'blink 1s step-start infinite', // custom blink animation
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        blink: {
          '0%, 100%': { opacity: 2 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
