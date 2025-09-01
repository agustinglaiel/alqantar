import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // NO incluyas 'react-map-gl' a secas
    include: ['mapbox-gl', 'react-map-gl/mapbox'],
    exclude: ['react-map-gl'], // opcional, por si otro plugin lo mete
  },
})