import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000011',
      blue: '#003096',
      green: '#99D6B5',
      grey: {
        DEFAULT: '#BFBFBF',
        100: '#FFFFFF',
        200: '#FCFCFC',
        300: '#E8E8E8',
        400: '#D3D3D3',
        500: '#BFBFBF',
        600: '#A3A3A3',
        700: '#878787',
        800: '#6B6B6B',
        900: '#4F4F4F',
        950: '#414141',
      },
      red: '#D99A9A',
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Times Now', 'serif'],
      },
      borderWidth: {
        1: '1px',
      },
      backgroundImage: {
        gradient:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700'%3E%3Cdefs%3E%3ClinearGradient gradientTransform='rotate(125, 0.5, 0.5)' x1='50%25' y1='0%25' x2='50%25' y2='100%25' id='ffflux-gradient'%3E%3Cstop stop-color='%2399D6B5' stop-opacity='1' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23003096' stop-opacity='1' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3Cfilter id='ffflux-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.003 0.002' numOctaves='2' seed='23' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeGaussianBlur stdDeviation='69 0' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' edgeMode='duplicate' result='blur'%3E%3C/feGaussianBlur%3E%3CfeBlend mode='hard-light' x='0%25' y='0%25' width='100%25' height='100%25' in='SourceGraphic' in2='blur' result='blend'%3E%3C/feBlend%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='url(%23ffflux-gradient)' filter='url(%23ffflux-filter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
export default config
