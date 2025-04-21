// next.config.ts

/**
 * @type {import('next').NextConfig}
 */
// import type { NextConfig } from "next";

const nextConfig = {
 // This option is required to run ESLint on production builds
 // and is enabled by default.
 eslint: {
  ignoreDuringBuilds: true,
 },
 // swcMinify: true,
 // compiler: {
 //   styledComponents: true,
 // },
 // experimental: {
 //   swcPlugins: [["swc-plugin-styled-components", {}]],
 // },
};

module.exports = nextConfig;
