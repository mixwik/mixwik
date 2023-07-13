/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        cyan: '#00ffff',
        aero: '#00b9dc',
        aeroTransparent: '#00b7dc51',
        frenchBlue: '#d6dadd',
        pennBlue: '#000038',
        pennBlueTransparent: '#00003884',
        white: '#FFF',
        black: '#000',
        blackTransparent: 'rgba(0, 0, 0, 0.474)',
        orange: '#fdb100',
        unavailable: 'rgba(128, 128, 128, 0.611)'
      }
    },
    plugins: []
  }
}
