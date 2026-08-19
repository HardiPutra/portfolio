import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Split the three big dependency groups into their own chunks so a
        // content edit only invalidates the small app bundle, not React.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('motion') || id.includes('framer')) return 'motion';
          if (id.includes('react')) return 'react';
          return 'vendor';
        },
      },
    },
  },
});
