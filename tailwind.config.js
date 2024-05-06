const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    flowbite.content(),
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {},
    screens: {
      'tablet': {'min': '768px', 'max': '1023px'},
      'laptop': '1024px',
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
};