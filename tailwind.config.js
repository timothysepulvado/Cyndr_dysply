/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#0e0d1d',
        'lead-white': '#fff6ec',
        'catalyst-neon': '#eeff00',
        'oxidized-green': '#025f1d',
        heat: '#ff3800',
        verdigris: '#64ccc9',
        'manganese-violet': '#c964cf',
      },
      fontFamily: {
        headline: ['Oswald', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
