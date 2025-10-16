/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/globals.css",  // <-- include this if you're applying utilities there
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2b0c7a",
      },
    },
  },
  plugins: [],
};
