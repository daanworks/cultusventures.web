import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000011',
      blue: '#003096',
      green: '#99D6B5'
    },
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        serif: ["Times Now", "serif"]
      },
      borderWidth: {
        1: "1px",
      },
    }
  },
  plugins: [],
};
export default config;
