import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  turbopack: { root: projectRoot }
};

export default nextConfig;
