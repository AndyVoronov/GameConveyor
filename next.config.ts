/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose env vars to client
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
