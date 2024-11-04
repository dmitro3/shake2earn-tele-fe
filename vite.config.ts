import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY),
    },
    plugins: [react(), nodePolyfills(), tsconfigPaths()],
    base: ((process.env.GITHUB_REPOSITORY ?? '') + '/').match(/(\/.*)/)?.[1],
  };
});
