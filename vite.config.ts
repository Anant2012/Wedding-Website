import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    __HAS_INVITATION_MUSIC__: JSON.stringify(existsSync(fileURLToPath(new URL('./public/assets/audio/song.mp3', import.meta.url)))),
  },
})
