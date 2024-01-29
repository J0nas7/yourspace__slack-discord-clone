/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Deployment
   */
  basePath: process.env.NODE_ENV === "production" ? "" : undefined, // "/subfolder"
  assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined, // "/subfolder"
  /**
   * Development
   */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.developerjones.dk',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
        port: '',
      },
    ],
  }
}

module.exports = nextConfig
