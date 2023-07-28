const nextConfig = {
  productionBrowserSourceMaps: false,
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  env: {
    adminEmail: "admin@gmail.com",
  },
};

module.exports = nextConfig;
