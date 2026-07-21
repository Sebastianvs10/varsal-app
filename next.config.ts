import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Oculta el header "X-Powered-By: Next.js" (no aporta valor y filtra
  // información innecesaria del stack al cliente).
  poweredByHeader: false,

  images: {
    // AVIF primero: ~20% más liviano que WebP a igual calidad perceptual.
    // Next.js sirve el primer formato soportado por el navegador del visitante.
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días — logos/fotos no cambian a diario.
  },

  experimental: {
    // Evita que el bundler incluya el barrel file completo de estas librerías:
    // solo empaqueta los íconos/módulos realmente importados en cada archivo.
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
