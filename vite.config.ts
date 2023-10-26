import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],

  build: {
    outDir: './dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'wayfinder',
      fileName: (format) => `wayfinder.${format}.js`
    },
    rollupOptions: {
      external: ['react'],
      output: { globals: { react: 'React' } }
    }
  }
})
