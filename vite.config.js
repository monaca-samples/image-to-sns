
import path from 'path';
import react from '@vitejs/plugin-react';


const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);
const HOST = process.env.MONACA_SERVER_HOST || '0.0.0.0';
export default async () => {

  return  {
    plugins: [
      react(),

    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      target: ['es2017'], // support Monaca Localkit (older browser)
      assetsInlineLimit: 0,
      emptyOutDir: false,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      },
      cssMinify: false, // support Monaca Localkit (older browser)
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
  server: {
    host: HOST,
    port: 8080,
  },

  };
}
