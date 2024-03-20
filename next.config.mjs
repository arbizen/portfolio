/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'source.unsplash.com',
      },
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'www.notion.so',
      },
    ],
  },
};

export default nextConfig;
