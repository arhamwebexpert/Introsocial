import type { NextConfig } from "next";

const nextConfig = {
  allowedDevOrigins: ['192.168.56.1'],
  images: {
    domains: ['localhost'],
  },
};
export default nextConfig;
