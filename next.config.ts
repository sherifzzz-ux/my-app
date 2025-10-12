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
  // Ignore ESLint errors during build (warnings will still be shown in dev)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build (for faster deployments)
  typescript: {
    ignoreBuildErrors: false,
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
