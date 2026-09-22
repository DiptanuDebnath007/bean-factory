import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-scroll-frames',
      configureServer(server) {
        server.middlewares.use('/frames', (req, res, next) => {
          const filePath = path.join(__dirname, 'scroll assets', decodeURIComponent(req.url).replace(/^\//, ''));
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
