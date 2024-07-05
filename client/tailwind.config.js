/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#20232B",
        "dark": "#000000",
        "icons": "#858585",
        "secondary": "#131319",
        "inputs": "#15171C",
        "accent": "#F2FC89"
      }
    },
  },
  plugins: [],
}