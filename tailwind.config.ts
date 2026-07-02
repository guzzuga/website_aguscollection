import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient':
          'linear-gradient(135deg, #d4af4f 0%, #c9a84c 50%, #b8942f 100%)',
        'navy-gradient':
          'linear-gradient(180deg, #0a0a2e 0%, #14143f 50%, #0a0a2e 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        navy: {
          DEFAULT: '#0a0a2e',
          50: '#e8e8f5',
          100: '#c5c5e0',
          200: '#9d9dc8',
          300: '#7474b0',
          400: '#4c4c98',
          500: '#2e2e6e',
          600: '#1f1f54',
          700: '#14143f',
          800: '#0a0a2e',
          900: '#06061f',
        },
        gold: {
          DEFAULT: '#c9a84c',
          50: '#fbf7ec',
          100: '#f5ebcc',
          200: '#ecd999',
          300: '#e0c466',
          400: '#d4af4f',
          500: '#c9a84c',
          600: '#b8942f',
          700: '#947424',
          800: '#705420',
          900: '#523f18',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#d97706',
          foreground: '#ffffff',
        },
        error: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        chart: {
          '1': '12 76% 61%',
          '2': '173 58% 39%',
          '3': '197 37% 24%',
          '4': '43 74% 66%',
          '5': '27 87% 67%',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
        'orb-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'orb-pulse': 'orb-pulse 8s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 2s infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      boxShadow: {
        'gold-glow': '0 0 30px -5px rgba(201, 168, 76, 0.4)',
        'gold-glow-lg': '0 0 50px -10px rgba(201, 168, 76, 0.5)',
        'navy-glow': '0 0 40px -10px rgba(10, 10, 46, 0.4)',
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'soft-lg': '0 10px 40px -5px rgba(15, 23, 42, 0.12)',
        'soft-xl': '0 20px 60px -10px rgba(15, 23, 42, 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
