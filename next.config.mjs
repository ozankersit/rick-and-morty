/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  redirects() {
    return [
      {
        source: "/",
        destination: "/characters/1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
