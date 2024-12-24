/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {   extend: {
      transform: {
        "rotate-y-3d": "rotateY(10deg)",
      },
      perspective: {
        500: "500px",
      },
    },
  },
  variants: {
    extend: {},
  },
  },
  plugins: [],
}

