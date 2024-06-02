import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    mockReset: true,
    clearMocks: true,
    coverage: {
      enabled: true,
      include: ["src"],
      reporter: ["html", "text-summary", "lcov"],
      ignoreEmptyLines: true,
      extension: [".ts"],
      thresholds: {
        // TODO always enable
        "100": !process.env.CI,
      },
    },
  },
});
