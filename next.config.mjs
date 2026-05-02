/** @type {import('next').NextConfig} */
const repo = "Online_Encyclopedia_Mathematical_Objects_Structured";

const nextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  images: {
    unoptimized: true
  },
  trailingSlash: true
};

export default nextConfig;
