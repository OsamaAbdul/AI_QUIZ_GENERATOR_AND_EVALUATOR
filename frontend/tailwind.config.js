/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB', // Refined blue for buttons
        secondary: '#1E40AF', // Darker blue for hover states
        darkBg: '#1E1E2F', // Dark background
        textGray: '#D1D5DB', // Light gray for secondary text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};