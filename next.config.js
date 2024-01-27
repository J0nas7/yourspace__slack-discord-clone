/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Deployment
   */
  basePath: process.env.NODE_ENV === "production" ? "/discord_clone" : undefined,
  assetPrefix: process.env.NODE_ENV === "production" ? "/discord_clone" : undefined,
  /**
   * Development
   */
  reactStrictMode: true,
  images: {
    domains: ["localhost", "developerjones.dk", "uploadthing.com", "utfs.io", "miro.medium.com"]
  }
}

module.exports = nextConfig
