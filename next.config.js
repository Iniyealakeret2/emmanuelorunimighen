/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "image.similarpng.com",
      "cdn.dribbble.com",
      "images.unsplash.com",
      "cdn.dribbblNamee.com",
    ],
  },
};

module.exports = nextConfig;
