// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// __define-ocg__: Vite config with React, React Refresh & SVGR
export default defineConfig({
  build: {
    outDir: 'build', // output directory
    sourcemap: true,
  },
  plugins: [
    react(), // enables Fast Refresh with the new React plugin
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }), // import SVGs as React components
  ],
  server: {
    port: 3000,
    host: true, // allows access from external IPs
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
