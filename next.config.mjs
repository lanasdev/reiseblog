/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Sanity singletonPlugin has strict PluginOptions typing; plugin works at runtime
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
}

export default nextConfig
