// .eslintrc.js
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    jsx: true,
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    "react/react-in-jsx-scope": "off", // Not needed for Next.js
    "react/prop-types": "off", // Because you're using TypeScript
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
};
