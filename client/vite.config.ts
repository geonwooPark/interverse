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
      { find: '@managers', replacement: '/src/managers' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@providers', replacement: '/src/providers' },
      { find: '@services', replacement: '/src/services' },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@hocs', replacement: '/src/hocs' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@store', replacement: '/src/store' },
    ],
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
