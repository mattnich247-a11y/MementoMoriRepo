import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function apkDownloadPlugin() {
  return {
    name: 'apk-download-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url?.split('?')[0];
        if (url && (url.endsWith('.apk') || url.includes('MementoMori.apk') || url.includes('memento-mori.apk'))) {
          const apkName = url.includes('memento-mori.apk') ? 'memento-mori.apk' : 'MementoMori.apk';
          const filePath = path.resolve(process.cwd(), 'public', apkName);
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
              'Content-Type': 'application/vnd.android.package-archive',
              'Content-Length': stat.size,
              'Content-Disposition': `attachment; filename="${apkName}"`,
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-cache',
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      apkDownloadPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        manifestFilename: 'manifest.json',
        useCredentials: true,
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg', 'manifest.json', 'manifest.webmanifest', 'screenshot-desktop.png', 'screenshot-mobile.png', 'MementoMori.apk', 'memento-mori.apk'],
        manifest: {
          id: '/',
          name: 'Memento Mori — Intentional Life Countdown & Mortality Compass',
          short_name: 'Memento Mori',
          description: 'A profound life countdown and intentional living dashboard. Transform finite time into daily clarity with live mortality countdowns, 4,000 weeks Memento Mori, loved ones relationship time, and daily reflections.',
          dir: 'ltr',
          lang: 'en',
          theme_color: '#0c0a09',
          background_color: '#0c0a09',
          display: 'standalone',
          orientation: 'portrait',
          start_url: '/',
          scope: '/',
          categories: ['lifestyle', 'productivity', 'utilities'],
          prefer_related_applications: false,
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any',
            },
            {
              src: '/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png',
              purpose: 'any',
            },
          ],
          screenshots: [
            {
              src: '/screenshot-desktop.png',
              sizes: '1280x720',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Spark Desktop Dashboard',
            },
            {
              src: '/screenshot-mobile.png',
              sizes: '540x960',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Spark Mobile Mortality Countdown',
            },
          ],
          shortcuts: [
            {
              name: 'Life Countdown',
              short_name: 'Countdown',
              description: 'View live mortality countdown and vital metrics',
              url: '/',
            },
            {
              name: 'Memento Mori Grid',
              short_name: 'Weeks Grid',
              description: 'View your 4,000 weeks life journey grid',
              url: '/',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/.*\.apk$/],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
