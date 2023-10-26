/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "uploadthing.com", "utfs.io"]
  }
}

module.exports = nextConfig
