import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // optimizeDeps: {
  //   include: ['react-vertical-timeline-component']
  // },
  server: {
    host: '0.0.0.0',
    port: 5174,
  }
})

