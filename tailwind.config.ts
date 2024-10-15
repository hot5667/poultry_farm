import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/react-calendar-heatmap/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        main: '#000000',
        primary: '#72BF78', // 초록
        soft: '#A0D683', //연두
        accent: '#FEFF9F', //노랑
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
