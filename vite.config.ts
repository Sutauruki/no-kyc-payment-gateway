import { defineConfig } from 'vite'
import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  publicDir: 'public',
  server: {
    allowedHosts: ['no-kyc-payment-gateway.onrender.com'],
  },
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    react(),
    adonisjs({ entrypoints: ['inertia/app/app.tsx'], reload: ['resources/views/**/*.edge'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend codeimport { Button } from '~/components/ui/button'

   */
  resolve: {
    alias: {
      '~': `${getDirname(import.meta.url)}/inertia/`,
    },
  },
})
