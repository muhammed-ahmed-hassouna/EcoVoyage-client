/** @type {import('tailwindcss').Config}           */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Base-color": "#0369a1",
        // "second-color": "#FFFFFF",
        "Base-color": "#115e59",//green
        "second-color": "#F2F2F2",//offwhite
        "third-color": "#0f766e",//lighter green
        "fourth-color": "#be123c",//orange
        "transparent-first-color": "#0F766E1A",//transparent light green
        "transparent-second-color": "#00000099",//transparent black
        "transparent-third-color": "#0F766E99",//transparent green
        "transparent-fourth-color": "#0000004D",//transparent lighter black
        "light-pink": "#fb7185",
        "yellow": "#ffdb6e",
      },
      fontFamily: {
        "grape-nuts": ["Grape Nuts", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
