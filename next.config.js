/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './build',
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json'
  }
};

module.exports = nextConfig;
