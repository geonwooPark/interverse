import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@constants', replacement: '/src/constants' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@games', replacement: '/src/games' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@layouts', replacement: '/src/layouts' },
      { find: '@lib', replacement: '/src/lib' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@providers', replacement: '/src/providers' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@store', replacement: '/src/store' },
      { find: '@utils', replacement: '/src/utils' },
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
