/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const nextConfig = (phase) => {
  return {
    basePath: phase === PHASE_DEVELOPMENT_SERVER ? '' : '/registry',
  }
}

module.exports = nextConfig
