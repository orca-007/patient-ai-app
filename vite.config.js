// vite.config.js
import path from "path"; // <-- Add this line
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // <-- Add this 'resolve' section
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});