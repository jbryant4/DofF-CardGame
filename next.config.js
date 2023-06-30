/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './build',
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json'
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts']
};

module.exports = nextConfig;
