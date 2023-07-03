/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-strong": "#07484A",
        "green-soft": "#70908B",
        "green-footer": "#F3F6F5",
        "green-button": "#00CB45",
        "yellow-active": "#FFC107",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
