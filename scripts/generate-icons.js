import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Spark brand SVG (standard / any purpose)
const sparkSvgStandard = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#0c0a09"/>
  <circle cx="256" cy="256" r="210" stroke="#292524" stroke-width="2" stroke-dasharray="6 6"/>
  
  <!-- Outer subtle radiant aura -->
  <circle cx="256" cy="256" r="140" fill="url(#sparkAura)" opacity="0.3"/>

  <!-- Golden geometric diamond ring -->
  <rect x="256" y="156" width="141.42" height="141.42" rx="20" transform="rotate(45 256 156)" stroke="url(#goldGrad)" stroke-width="4" fill="#1c1917" fill-opacity="0.8"/>
  
  <!-- Inner core flame / spark star -->
  <path d="M256 160 C256 220 270 256 330 256 C270 256 256 292 256 352 C256 292 242 256 182 256 C242 256 256 220 256 160 Z" fill="url(#flameGrad)" />

  <!-- Core hot spark center -->
  <circle cx="256" cy="256" r="14" fill="#fffbeb" filter="drop-shadow(0 0 8px #f59e0b)"/>

  <!-- Compass / memento mori tick marks -->
  <circle cx="256" cy="116" r="4" fill="#d97706"/>
  <circle cx="256" cy="396" r="4" fill="#78716c"/>
  <circle cx="116" cy="256" r="4" fill="#78716c"/>
  <circle cx="396" cy="256" r="4" fill="#78716c"/>

  <defs>
    <radialGradient id="sparkAura" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0c0a09" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldGrad" x1="256" y1="120" x2="256" y2="390" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="40%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="flameGrad" x1="256" y1="160" x2="256" y2="352" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="25%" stop-color="#fbbf24"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
  </defs>
</svg>
`;

// Spark maskable SVG (strictly inside the 80% safe zone with full-bleed background)
const sparkSvgMaskable = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Full bleed background to canvas edge -->
  <rect width="512" height="512" fill="#0c0a09"/>
  
  <!-- Subtle circular track within safe zone -->
  <circle cx="256" cy="256" r="160" stroke="#292524" stroke-width="2" stroke-dasharray="6 6"/>
  <circle cx="256" cy="256" r="110" fill="url(#sparkAuraM)" opacity="0.3"/>

  <!-- Centered emblem scaled to safe-zone (inner 70%) -->
  <rect x="256" y="176" width="113.14" height="113.14" rx="16" transform="rotate(45 256 176)" stroke="url(#goldGradM)" stroke-width="4" fill="#1c1917" fill-opacity="0.9"/>
  
  <path d="M256 180 C256 226 268 256 314 256 C268 256 256 286 256 332 C256 286 244 256 198 256 C244 256 256 226 256 180 Z" fill="url(#flameGradM)" />
  <circle cx="256" cy="256" r="12" fill="#fffbeb" filter="drop-shadow(0 0 8px #f59e0b)"/>

  <defs>
    <radialGradient id="sparkAuraM" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0c0a09" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="goldGradM" x1="256" y1="140" x2="256" y2="370" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="40%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="flameGradM" x1="256" y1="180" x2="256" y2="332" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="25%" stop-color="#fbbf24"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>
  </defs>
</svg>
`;

async function generate() {
  console.log('Writing public/icon.svg...');
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), sparkSvgStandard.trim());

  console.log('Generating pwa-512x512.png...');
  await sharp(Buffer.from(sparkSvgStandard))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  console.log('Generating pwa-192x192.png...');
  await sharp(Buffer.from(sparkSvgStandard))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  console.log('Generating pwa-maskable-512x512.png...');
  await sharp(Buffer.from(sparkSvgMaskable))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  console.log('Generating apple-touch-icon.png (180x180)...');
  await sharp(Buffer.from(sparkSvgStandard))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Generating favicon.ico (64x64 png as favicon)...');
  await sharp(Buffer.from(sparkSvgStandard))
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('All PWA and Android icon assets generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
