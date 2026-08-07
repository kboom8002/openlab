import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: { reporter: ["text", "json", "html"] },
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "ci-placeholder-publishable-key-000000",
      APP_ENV: "local",
    },
    alias: {
      "server-only": new URL("./tests/mocks/server-only.js", import.meta.url).pathname,
      "next/headers": new URL("./tests/mocks/next-headers.js", import.meta.url).pathname,
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
