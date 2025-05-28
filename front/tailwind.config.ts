import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C9DABF",
        secondary: "#9CA986",
        tertary: "#808D7C",
        quaternary: "#5F6F65",
        
     
      },
    },
  },
  plugins: [],
};
export default config;
