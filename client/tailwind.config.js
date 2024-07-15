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
        spotifyBlack : 'hsl(0, 11%, 9%)',
        spotifyBg : 'hsl(0, 0%, 7%)',
        spotifyDarkGrey: 'hsl(0, 0%, 18%)',
        textDark: 'hsl(218, 11%, 65%)',
        textLight: 'hsl(216, 12%, 84%)',
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

