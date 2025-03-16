import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
  build: {
    sourcemap: false,
    outDir: 'dist', // Render yêu cầu thư mục build là 'dist'
  },
})
