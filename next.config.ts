import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acceder vía túnel ngrok en desarrollo sin warnings de origen cruzado
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "hackaton.synervia.com",
    "hackaton-synervia.workers.dev",
  ],
};

export default nextConfig;

// Cloudflare Miniflare solo en dev local. En Vercel/CI provoca EPIPE y cuelga el build.
if (process.env.NODE_ENV === "development" && !process.env.CI) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
