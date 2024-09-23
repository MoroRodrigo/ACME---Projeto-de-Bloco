import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Certifique-se de que isso esteja presente
    globals: true, // Adiciona suporte a globals como describe e it
  },
  server: {
    host: '0.0.0.0',
  },
});
