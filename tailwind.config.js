/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "3xl": { max: "1536px" },

      "2xl": { max: "1458px" },

      xl: { max: "1280px" },

      lg: { max: "1024px" },

      md: { max: "768px" },

      sm: { max: "640px" },

      xs: { max: "475px" },

      xxs: { max: "395px" },
    },
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
