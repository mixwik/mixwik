/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['picsum.photos', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  webpack (config, { isServer }) {
    const prefix = config.assetPrefix ?? config.basePath ?? ''
    config.module.rules.push({
      test: /\.webm$/,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: `${prefix}/_next/static/media/`,
          outputPath: `${isServer ? '../' : ''}static/media/`,
          name: '[name].[hash].[ext]'
        }
      }]
    })

    return config
  }
}

module.exports = nextConfig
