import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      { source: '/promo', destination: '/promotions', permanent: true },
      { source: '/promotion', destination: '/promotions', permanent: true },
    ]
  },
};

export default nextConfig;
