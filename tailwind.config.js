/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 70s linear infinite",
        "bounce-slow": "bounce 13s linear infinite",
      },
    },
  },
  plugins: [],
};
