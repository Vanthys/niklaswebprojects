import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import dayjs from 'dayjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),   tailwindcss()],
  base: '/niklaswebprojects/',
  resolve: {
    alias: {
      // force Vite to pull in the static index.mjs (no dynamic chunks)
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    },
  },
  define: {
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss')),
  },
})
