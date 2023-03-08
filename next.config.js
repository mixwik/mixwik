/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  },
  webpack (config, { isServer }) {
    const prefix = config.assetPrefix ?? config.basePath ?? ''
    config.module.rules.push({
      test: /\.mp4$/,
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
