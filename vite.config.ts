import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
      stream: 'stream-browserify'
    }
  },
  define: {
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          core: ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react-lite', 'axios', 'bignumber.js'],
          ethers: ['ethers', '@web3-react/core', '@web3-react/injected-connector']
        }
      }
    },
    chunkSizeWarningLimit: 2000
  }
});
