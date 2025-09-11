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
};

export default nextConfig;
