import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n-config.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Output standalone for Cloudflare Pages with OpenNext
  output: "standalone",
};

export default withNextIntl(nextConfig);
