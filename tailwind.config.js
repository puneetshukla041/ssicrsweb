/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}",      // Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx}"  // All components
  ],
  theme: {
    extend: {
      spacing: {
        '50': '12.5rem', // example if you want ml-50, mr-60 etc.
        '60': '15rem',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'], // optional, if using Tailwind font
      },
    },
  },
  plugins: [],
};
