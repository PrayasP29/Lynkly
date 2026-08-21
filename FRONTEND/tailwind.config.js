/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-brand-primary)',
          primaryHover: 'var(--color-brand-primary-hover)',
          bg: 'var(--color-brand-bg)',
          surface: 'var(--color-brand-surface)',
          text: 'var(--color-brand-text)',
          textMuted: 'var(--color-brand-text-muted)',
          border: 'var(--color-brand-border)',
        },
        // Existing dark theme extended
        navy: {
          50: '#0a0e17',
          100: '#101520',
          200: '#1a1f2e',
          300: '#252a3a',
          400: '#303545',
          500: '#3a4050',
          600: '#454a5c',
          700: '#50556a',
          800: '#5b607a',
          900: '#666b85',
        },
        teal: {
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // primary accent
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fec8d8',
          300: '#fda4af',
          400: '#fb923b',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#702a14',
        },
      },
      fontFamily: {
        // Keep system fonts, no new font family needed
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
        xs: '0.125rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        navy: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 0 1px rgba(0, 0, 0, 0.02)',
        teal glow: '0 0 20px rgba(18, 233, 188, 0.15)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0a0e17 0%, #101520 100%)',
        'teal-gradient': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-height)' },
          to: { height: '0' },
        },
        'caret': { animation: 'caret 1s step-end infinite' },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-small': {
          '0%, 100%': { transform: 'translateY(-2px) scale(1)' },
          '50%': { transform: 'translateY(0) scale(1.05)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'blob': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'bounce-small': 'bounce-small 0.3s ease-out',
        'gradient-x': 'gradient-x 15s ease infinite',
        'blob': 'blob 7s ease infinite',
      },
    },
  },
  plugins: [
    // framer-motion plugin if needed, but we'll use custom keyframes
  ],
}