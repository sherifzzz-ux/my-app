import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fjarsnhfbdmlqgyfjzvt.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  redirects: async () => {
    return [
      { source: '/promo', destination: '/promotions', permanent: true },
      { source: '/promotion', destination: '/promotions', permanent: true },
    ]
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  // Configuration pour gérer les erreurs de Google Fonts
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
