/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  //   xl:
  // lg:
  // sm:
  safelist: [
    'font-medium',
    'font-normal',
    'font-light',
    'xl:text-5xl',
    'xl:text-[40px]',
    'xl:text-4xl',
    'xl:text-[32px]',
    'xl:text-2xl',
    'xl:text-xl',
    'xl:text-base',
    'xl:text-sm',
    'lg:text-5xl',
    'lg:text-[40px]',
    'lg:text-4xl',
    'lg:text-[32px]',
    'lg:text-2xl',
    'lg:text-xl',
    'lg:text-base',
    'lg:text-sm',
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
    'sm:text-xl',
    'sm:text-5xl',
    'sm:text-[40px]',
    'sm:text-4xl',
    'sm:text-[32px]',
    'sm:text-2xl',
    'sm:text-base',
    'sm:text-sm',
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
