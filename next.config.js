/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
    ],
  },
  // experimental: {
  //   turbo: false, // যদি Turbopack ব্যবহার করে থাকো, এটা বন্ধ করে দাও
  // },
}

module.exports = nextConfig
