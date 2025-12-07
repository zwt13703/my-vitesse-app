export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,md}',
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1800px', // 自定义断点
      'tablet': '768px', // 自定义命名
    },
  },
  plugins: [],
}
