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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — needed on every route, so eagerly modulepreloaded on purpose.
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // No manual 'mapbox' entry here on purpose (F5/D8): mapbox-gl and
          // react-map-gl/mapbox are only ever reached via InteractiveMap.jsx's
          // dynamic import(), triggered on demand from LocationPage. Rollup's
          // automatic chunking already isolates them into their own chunk in
          // that case — but naming them explicitly in this map makes Vite treat
          // that chunk as reachable from the entry and modulepreload it (~1MB)
          // on every route regardless. Leave this alone unless you also change
          // how the map is loaded.
        },
      },
    },
  },
})