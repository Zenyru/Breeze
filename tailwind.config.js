/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 70s linear infinite",
        "bounce-moderate": "bounce 1.5s ease-in-out infinite",
        "bounce-slow": "bounce 13s linear infinite",

      },
    },
  },
  plugins: [],
};
