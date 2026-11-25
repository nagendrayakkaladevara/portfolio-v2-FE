import { defineConfig } from "@neon/config/v1";

/** Neon: Postgres only (phase 1). Media storage is Cloudflare R2 on the API (phase 2). */
export default defineConfig({
  auth: false,
  branch: (branch) => {
    if (branch.isDefault) {
      return {};
    }
    if (!branch.exists) {
      return { ttl: "7d" };
    }
    return {};
  },
});