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
      keyframes: {
        shake: {
          '0%,50%,100%': { transform: 'rotate(0deg)' },
          '10%,30%': { transform: 'rotate(-10deg)' },
          '20%': { transform: 'rotate(12deg)' },
          '40%': { transform: 'rotate(9deg)' },
        },
      },
      animation: {
        shake: 'shake 2.5s infinite',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      backgroundColor: {
        'glass-light': 'var(--glass-bg-light)',
        'glass-medium': 'var(--glass-bg-medium)',
        'glass-heavy': 'var(--glass-bg-heavy)',
      },
      borderColor: {
        'glass-light': 'var(--glass-border-light)',
        'glass-medium': 'var(--glass-border-medium)',
        'glass-strong': 'var(--glass-border-strong)',
      },
      boxShadow: {
        'glass-light': 'var(--glass-shadow-light)',
        'glass-medium': 'var(--glass-shadow-medium)',
        'glass-heavy': 'var(--glass-shadow-heavy)',
        'glass-floating': 'var(--glass-shadow-floating)',
      },
      backgroundImage: {
        'glass-gradient-light': 'var(--glass-gradient-light)',
        'glass-gradient-medium': 'var(--glass-gradient-medium)',
      },
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
