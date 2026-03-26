import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'TS6133') return
        if (warning.code === 'TS7006') return
        if (warning.code === 'TS2339') return
        if (warning.code === 'TS2307') return
        if (warning.code === 'TS7016') return
        warn(warning)
      }
    }
  },
  esbuild: {
    logOverride: {
      'ts-6133': 'silent',
      'ts-7006': 'silent',
      'ts-2339': 'silent',
      'ts-2307': 'silent',
      'ts-7016': 'silent'
    }
  }
})