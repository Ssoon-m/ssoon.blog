import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            'code::before': false,
            'code::after': false,
            code: {
              backgroundColor: theme('colors.gray[200]'),
              padding: '0.2em 0.4em',
              borderRadius: '5px',
              fontWeight: 500,
              fontSize: '90%',
            },
          },
        },
        invert: {
          css: {
            code: {
              backgroundColor: theme('colors.gray[800]'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
