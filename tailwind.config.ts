import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
  plugins: [],
};
export default config;
