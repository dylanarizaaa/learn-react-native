import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Sitio 100% estático: se puede desplegar en cualquier hosting.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
