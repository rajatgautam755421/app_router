const nextConfig = {
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
