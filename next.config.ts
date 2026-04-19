import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const repoName = 'bao-cao-di-tich'
const repoBasePath = isProd ? `/${repoName}` : ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: repoBasePath,
  assetPrefix: repoBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: repoBasePath,
  },
}

export default nextConfig
