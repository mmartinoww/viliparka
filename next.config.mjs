import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // Every page URL must end with `/` — enforced for SEO and hosting consistency.
  poweredByHeader: false,
  trailingSlash: true,
  turbopack: { root: projectRoot },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.parka-villas.com" }],
        destination: "https://parka-villas.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
