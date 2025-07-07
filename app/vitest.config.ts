import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

dotenv.config({ path: './../.env' })

export default defineConfig({
  test: {
    fileParallelism: false,
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    isolate: false,
  },
  plugins: [
    tsconfigPaths()
  ]
})