// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import federation from '@originjs/vite-plugin-federation'

// export default defineConfig({
//   plugins: [
//     react(),
//     federation({
//       name: 'container',
//       remotes: {
//         // In local dev, we fetch the remote from the dev server:
//         music_lib: 'http://localhost:5174/assets/remoteEntry.js'
//       },
//       shared: ['react', 'react-dom']
//     })
//   ],
//   build: {
//     target: 'esnext',
//     modulePreload: false,
//     minify: false,
//     cssCodeSplit: true
//   },
//   server: {
//     port: 5173
//   }
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import federation from '@originjs/vite-plugin-federation'

// export default defineConfig({
//   plugins: [
//     react(),
//     federation({
//       name: 'container',
//       remotes: {
//         music_lib: 'http://localhost:5174/assets/remoteEntry.js'
//       },
//       // Make React a singleton across apps to prevent duplicate React errors
//       shared: {
//         react: { singleton: true, requiredVersion: '^18.3.1' },
//         'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
//       }
//     })
//   ],
//   // ⬇️ Prevent optimizeDeps from touching the federated import
//   optimizeDeps: {
//     exclude: ['music_lib/MusicLibrary', 'music_lib']
//   },
//   build: {
//     target: 'esnext',
//     modulePreload: false,
//     minify: false,
//     cssCodeSplit: true
//   },
//   server: { port: 5173 }
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import federation from '@originjs/vite-plugin-federation'

// export default defineConfig({
//   plugins: [
//     react(),
//     federation({
//       name: 'container',
//       remotes: {
//         // 👇 SAME-ORIGIN URL (served by THIS dev server via proxy)
//         music_lib: '/remotes/music-lib/assets/remoteEntry.js'
//       },
//       shared: {
//         react: { singleton: true, requiredVersion: '^18.3.1' },
//         'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
//       }
//     })
//   ],
//   optimizeDeps: {
//     exclude: ['music_lib/MusicLibrary', 'music_lib']
//   },
//   server: {
//     port: 5173,
//     // 👇 proxy to the remote dev server
//     proxy: {
//       '/remotes/music-lib': {
//         target: 'http://localhost:5174',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/remotes\/music-lib/, '')
//       }
//     }
//   },
//   build: {
//     target: 'esnext',
//     modulePreload: false,
//     minify: false,
//     cssCodeSplit: true
//   }
// })

// main-app/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        music_lib: 'http://127.0.0.1:5174/assets/remoteEntry.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' }
      }
    })
  ],
  optimizeDeps: { exclude: ['music_lib/MusicLibrary', 'music_lib'] },
  server: { port: 5173 },
  build: { target: 'esnext', modulePreload: false, minify: false, cssCodeSplit: true }
})
