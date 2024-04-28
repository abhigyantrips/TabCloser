/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  images: { unoptimized: true },
  output: 'export',
  distDir: 'dist',
};

export default nextConfig;
