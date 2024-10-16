/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipybojcftcgitunzyror.supabase.co',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  eslint : {
    ignoreDuringBuilds :true
  },
};

export default nextConfig;
