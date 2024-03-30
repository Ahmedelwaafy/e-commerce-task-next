/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "woosonicpwa.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
