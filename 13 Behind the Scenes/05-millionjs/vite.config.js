import million from 'million/compiler';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// million js replace react virtual dom with another dom faster than 70%
export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
});
