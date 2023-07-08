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
      12: '12px',
      14: '14px',
      16: '16px',
      18: '18px',
      20: '20px',
      24: '24px',
      30: '30px',
      36: '36px',
      48: '48px',
      64: '64px'
    },
    spacing: customSpacing,
    right: customSpacing,
    left: customSpacing,
    top: customSpacing,
    bottom: customSpacing,
    listStyleImage: {
      quill: 'url("/quill.png")'
    }
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
