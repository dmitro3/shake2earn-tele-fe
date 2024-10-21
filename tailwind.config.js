import { radixThemePreset } from 'radix-themes-tw'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  presets: [radixThemePreset],
  plugins: [{
    "postcss-import": {},
  }],
}