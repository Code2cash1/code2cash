import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wallpaperaccess.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // Allow images from the backend URL if needed
      {
        protocol: 'https',
        hostname: '**', // Broad permission or specific to your backend domain
      }
    ],
  },
  devIndicators: {
    position: 'bottom-right',
  },
  async rewrites() {
    return [
      {
        source: '/api/jobs/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs/:path*`,
      },
      {
        source: '/api/job-applications/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/job-applications/:path*`,
      },
    ];
  },
};

export default nextConfig;
