/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  screens: {

    xxxl: { max: '1535px' },
    // => @media (max-width: 1535px) { ... }

    xl: { max: '1279px' },
    // => @media (max-width: 1279px) { ... }

    lg: { max: '1025px' },
    // => @media (max-width: 1025px) { ... }

    md: { max: '767px' },
    // => @media (max-width: 767px) { ... }

    sm: { max: '639px' },
    // => @media (max-width: 639px) { ... }

    lp: { max: '375px' },
    // => @media (max-width: 639px) { ... }
  },
  plugins: [],
}