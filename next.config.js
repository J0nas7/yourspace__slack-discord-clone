/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "developerjones.dk", "uploadthing.com", "utfs.io", "miro.medium.com"]
  }
}

module.exports = nextConfig
