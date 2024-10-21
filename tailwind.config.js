import { radixThemePreset } from 'radix-themes-tw';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [
    {
      'postcss-import': {},
    },
  ],
  presets: [radixThemePreset],
  theme: {
    extend: {},
  },
};
