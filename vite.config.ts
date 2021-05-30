import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, 'src')
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
          ethers: ['ethers', 'ethers-multicall', '@ethersproject/providers', '@web3-react/core', '@web3-react/injected-connector']
        }
      }
    },
    chunkSizeWarningLimit: 2000
  }
});
