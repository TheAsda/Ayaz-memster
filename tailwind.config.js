/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      data: {
        loading: 'loading~="true"',
      },
    },
  },
  plugins: [],
};
