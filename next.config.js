/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["source.unsplash.com", "media-cdn.tripadvisor.com", "cdn.weatherapi.com", "fierytrippers.com"],
  }
}

module.exports = nextConfig;
