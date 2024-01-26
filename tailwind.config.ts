import type { Config } from 'tailwindcss';
import unimportant from 'tailwindcss-unimportant';
import colors from 'tailwindcss/colors';
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
const customFontSize = {
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
};

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: customFontSize,
    spacing: customSpacing,
    right: customSpacing,
    left: customSpacing,
    top: customSpacing,
    bottom: customSpacing,
    listStyleImage: {
      quill: 'url("/quill.png")'
    },
    extend: {
      colors: {
        testColor: '#1ba227',
        earth: {
          DEFAULT: '#1ba227',
          light: '#6db06e'
        },
        desert: {
          DEFAULT: '#f4b53c',
          light: '#c2a978'
        },
        ocean: {
          DEFAULT: '#0072ff',
          light: '#6a8cbf'
        }
      }
    }
  },
  plugins: [unimportant],
  safelist: [
    { pattern: /(bg|stroke|border)-(desert|earth|ocean)/ },
    { pattern: /(bg|stroke|border)-(desert|earth|ocean)-light/ }
  ]
};

export default config;
