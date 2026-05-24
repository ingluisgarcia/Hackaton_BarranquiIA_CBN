import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

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

initOpenNextCloudflareForDev();
