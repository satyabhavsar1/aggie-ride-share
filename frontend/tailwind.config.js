/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js Pages Router
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Blue theme
        secondary: "#F8FAFC", // White theme
      },
    },
  },
  plugins: [],
};
