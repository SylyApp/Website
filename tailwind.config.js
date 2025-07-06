/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'scale-pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: '0.33', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scale-pulse': 'scale-pulse 0.6s ease-in-out',
        'fade-up': 'fade-in 0.3s ease-out forwards',
      },
      scale: {
        '120': '1.2',  // 1.6x skalieren
        '180': '1.8',  // 1.8x skalieren
        '200': '2',    // 2x skalieren
        '220': '2.2',  // 2.2x skalieren
      },
    },
  },
  plugins: [],
};
