const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.resolve(__dirname, "tsconfig.json"),
    tsconfigRootDir: ".",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "simple-import-sort",
    "prettier",
    "react"
  ],
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  root: true,
  env: {
    node: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "src/graphql.ts",
    "vite.config.ts"
  ],
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "prettier/prettier": "warn"
  }
}
