/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'seeded-session-images.scdn.co', 'lineup-images.scdn.co'],
    unoptimized: true
  },
  typescript: {
    // !! PERINGATAN !!
    // Jangan hapus ini!
    // Ini bukan pilihan terbaik di dunia produksi, tetapi berfungsi untuk tujuan pembelajaran/demo.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Terapkan header khusus untuk folder public
  async headers() {
    return [
      {
        source: '/audio/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 