/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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
    'md:text-xl',
    'md:text-5xl',
    'md:text-[40px]',
    'md:text-4xl',
    'md:text-[32px]',
    'md:text-2xl',
    'md:text-base',
    'md:text-sm',
    'basis-1/5',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c2c2c',
        secondary: '#e3c496',
      },
      screens: {},
    },
  },
  darkMode: 'class',
  plugins: [require('tailwind-scrollbar')],
};
