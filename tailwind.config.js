const theme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
const customSpacing = {
  0: '0',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  28: '28px',
  32: '32px',
  36: '36px',
  40: '40px',
  44: '44px',
  48: '48px',
  52: '52px',
  56: '56px',
  60: '60px',
  64: '64px'
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '64px'
    },
    spacing: customSpacing,
    maxWidth: customSpacing,
    right: customSpacing,
    left: customSpacing,
    top: customSpacing,
    bottom: customSpacing
  },
  extend: {
    width: customSpacing,
    height: customSpacing,
    gap: theme => theme('spacing'),
    fontSize: {
      '7xl': '80px',
      '8xl': '96px'
    },
    transitionProperty: {
      height: 'height'
    }
  },
  plugins: []
};
