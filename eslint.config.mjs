// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // 1) Игноры
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "messages/**",
      "**/*.json",
    ],
  },

  // 2) Базовые конфиги
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3) Правила только для исходников
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // чуть строже TS, можно ослабить при необходимости
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  }
);
