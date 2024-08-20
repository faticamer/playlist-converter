/** @type {import('tailwindcss').Config} */
export default {
  content: [    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    screen : {
      sm : '480px',
      md : '768px',
      lg : '976px',
      xl : '1440px'
    },
    extend: {
      colors : {
        spotifyGreen : 'hsl(141,75.5%, 48%)',
        spotifyBlack : 'hsl(240, 4%, 5%)',
        spotifyDarkGrey: 'hsl(0, 0%, 10%)',
        textDark: 'hsl(218, 11%, 65%)',
        textLight: 'hsl(200, 1%,60%)',
        textLighter: 'hsl(200, 1%,70%)',
        darkGreen: 'hsl(159, 92%, 10%)'
      },
      keyframes: {
        gradient: {
          "0%": {backgroundPosition: "0% 50%"},
          "100%": {backgroundPosition: "100% 50%"},
        },
      },
      animation: {
        gradient: "gradient 4s linear infinite",
      }
    },
  },
  plugins: [],
}

