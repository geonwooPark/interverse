/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        neodgm: ['neodgm'],
      },
      keyframes: {
        myRoomBgKeyframes: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% + 360px))' },
        },
      },
      animation: {
        myRoomBg: 'myRoomBgKeyframes 5s linear infinite',
      },
      cursor: {
        default: 'url(/assets/cursor/Point.png), default',
        pointer: 'url(/assets/cursor/hand.png), pointer',
      },
      boxShadow: {
        level1: '0px 2px 20px 2px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
