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
    chunkSizeWarningLimit: 2000
  }
});
