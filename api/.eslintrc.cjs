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
    "simple-import-sort"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
    "dist",
    "src/graphql.ts",
    ".eslintrc.cjs"
  ],
  rules: {
    "@typescript-eslint/no-floating-promises": "error",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "prettier/prettier": "warn",
  }
}
