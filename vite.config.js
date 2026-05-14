import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': env.VITE_API_URL || 'http://localhost:5000',
        '/uploads': env.VITE_API_URL || 'http://localhost:5000',
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about-us.html'),
          menu: resolve(__dirname, 'menu.html'),
          blogs: resolve(__dirname, 'blogs.html'),
          faq: resolve(__dirname, 'faq.html'),
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react-quill-new')) {
                return 'editor';
              }
              if (id.includes('framer-motion')) {
                return 'motion';
              }
              if (id.includes('lucide-react')) {
                return 'icons';
              }
              if (id.includes('react') || id.includes('redux') || id.includes('axios')) {
                return 'vendor';
              }
              return 'vendor';
            }
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    },
  }
})
