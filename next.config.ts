import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/charts",
      "@mantine/form",
      "@mantine/modals",
      "@mantine/notifications",
    ],
  },
};

export default nextConfig;
