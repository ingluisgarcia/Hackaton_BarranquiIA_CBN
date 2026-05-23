import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acceder vía túnel ngrok en desarrollo sin warnings de origen cruzado
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
  ],
};

export default nextConfig;
