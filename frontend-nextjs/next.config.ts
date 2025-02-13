/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/ws/:path*",
        destination: "http://localhost:8080/ws/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
