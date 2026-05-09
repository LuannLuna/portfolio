import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE_PATH at build time for project-page deployments.
// Example: BASE_PATH=/portfolio/ npm run build
// For <username>.github.io repos, leave it as "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
