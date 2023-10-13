import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'font-medium',
    'font-normal',
    'font-light',
    'text-5xl',
    'text-[40px]',
    'text-4xl',
    'text-[32px]',
    'text-2xl',
    'text-xl',
    'text-base',
    'text-sm',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c2c2c',
        secondary: '#e3c496',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: '#2c2c2c',
            },

            secondary: {
              DEFAULT: '#e3c496',
            },
          },
        },
      },
    }),
  ],
};
