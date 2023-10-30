/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  return {
    basePath: '',
    transpilePackages: ['chora'],
  }
}

module.exports = nextConfig
