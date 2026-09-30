import { defineConfig } from "vitest/config"

// Checks the static export in out/ (what gets deployed). Run via `npm run test:build`,
// which builds first.
export default defineConfig({
  test: {
    environment: "node",
    include: ["test/build/**/*.test.ts"],
  },
})
