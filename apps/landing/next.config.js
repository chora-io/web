/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  distDir: "dist",
  output: "export",
  images: { unoptimized: true },
};

module.exports = nextConfig;
