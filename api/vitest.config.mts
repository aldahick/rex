import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    coverage: {
      enabled: true,
      include: ["src"],
      reporter: ["html", "text-summary", "lcov"],
      ignoreEmptyLines: true,
      extension: [".ts"],
      thresholds: {
        "100": true,
      },
    },
  },
});
