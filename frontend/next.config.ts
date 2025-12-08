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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/admin/:path*',
        destination: `${apiUrl}/api/admin/:path*`,
      },
      {
        source: '/api/stats/:path*',
        destination: `${apiUrl}/api/stats/:path*`,
      },
      {
        source: '/api/contact/:path*',
        destination: `${apiUrl}/api/contact/:path*`,
      },
      {
        source: '/api/callback/:path*',
        destination: `${apiUrl}/api/callback/:path*`,
      },
      {
        source: '/api/internship/:path*',
        destination: `${apiUrl}/api/internship/:path*`,
      },
      {
        source: '/api/programs/:path*',
        destination: `${apiUrl}/api/programs/:path*`,
      },
      {
        source: '/api/perks/:path*',
        destination: `${apiUrl}/api/perks/:path*`,
      },
      {
        source: '/api/certificates/:path*',
        destination: `${apiUrl}/api/certificates/:path*`,
      },
      {
        source: '/api/reissue/:path*',
        destination: `${apiUrl}/api/reissue/:path*`,
      },
      {
        source: '/api/jobs/:path*',
        destination: `${apiUrl}/api/jobs/:path*`,
      },
      {
        source: '/api/job-applications/:path*',
        destination: `${apiUrl}/api/job-applications/:path*`,
      },
    ];
  },
};

export default nextConfig;
