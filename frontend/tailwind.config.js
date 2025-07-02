/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'audiowide': ['Audiowide', 'monospace'],
        'exo': ['Exo 2', 'sans-serif'],
      },
      colors: {
        'neon-cyan': '#00ffe7',
        'ice-blue': '#aaffff',
        'electric-purple': '#4411ff',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'spin-reverse': 'spin 3s linear infinite reverse',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float 3s ease-in-out infinite 1.5s',
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'scan-line': 'scan-line 6s linear infinite',
        'waveform': 'waveform 0.5s ease-in-out infinite alternate',
        'wireframe-build': 'wireframe-build 4s ease-out forwards',
        'light-approach': 'light-approach 2s ease-in-out forwards',
        'energy-expand': 'energy-expand 1.5s ease-out forwards',
        'triangle-fill': 'triangle-fill 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)', opacity: '1' },
          '100%': { transform: 'rotate(360deg)', opacity: '0.3' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'waveform': {
          '0%': { height: '8px' },
          '100%': { height: '32px' },
        },
        'wireframe-build': {
          '0%': { 
            strokeDasharray: '0 2000',
            opacity: '0'
          },
          '30%': {
            opacity: '1'
          },
          '100%': { 
            strokeDasharray: '2000 0',
            opacity: '1'
          },
        },
        'light-approach': {
          '0%': { 
            transform: 'scale(0) translateY(-100px)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(1) translateY(0)',
            opacity: '1'
          },
        },
        'energy-expand': {
          '0%': { 
            transform: 'scale(0)',
            opacity: '0'
          },
          '50%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '0.8'
          },
        },
        'triangle-fill': {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.5)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};