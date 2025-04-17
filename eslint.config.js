import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import nodeplugin from "eslint-plugin-n";
import universalRules from "./eslint/universal-rules.js";
import universalJSDocRules from "./eslint/universal-jsdoc-rules.js";
import javascriptRules from "./eslint/javascript-rules.js";
import javascriptJSDocRules from "./eslint/javascript-jsdoc-rules.js";
import javascriptTestRules from "./eslint/javascript-test-rules.js";
import typescriptRules from "./eslint/typescript-rules.js";
import typescriptJSDocRules from "./eslint/typescript-jsdoc-rules.js";
import typescriptTestRules from "./eslint/typescript-test-rules.js";
import typescriptTypeRules from "./eslint/typescript-type-rules.js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import fs from "node:fs";

const hasTSConfig = fs.existsSync("tsconfig.json");

export default tseslint.config(
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  tseslint.configs.recommended,
  nodeplugin.configs["flat/recommended"],

  /**
   * TypeScript source files
   *
   * Includes ESLint rules that require TypeScript type definitions.
   * This only works for TypeScript files that are included in the tsconfig.json file
   */
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["test/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
        tsconfigRootDir: hasTSConfig ? process.cwd() : undefined,
        project: hasTSConfig ? "tsconfig.json" : undefined,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      jsdoc,
    },
    rules: {
      ...universalRules,
      ...universalJSDocRules,
      ...typescriptRules,
      ...typescriptJSDocRules,
      ...(hasTSConfig && typescriptTypeRules),
    },
  },

  /**
   * TypeScript test files
   *
   * Does not include ESLint rules that require TypeScript type definitions,
   * since test files aren't included in the tsconfig.json file
   */
  {
    files: ["test/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.jasmine,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...universalRules,
      ...typescriptRules,
      ...typescriptTestRules,
    },
  },

  /**
   * JavaScript source files
   */
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["test/**"],
    plugins: {
      jsdoc,
    },
    rules: {
      ...universalRules,
      ...universalJSDocRules,
      ...javascriptRules,
      ...javascriptJSDocRules,
    },
  },

  /**
   * JavaScript test files
   */
  {
    files: ["test/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.jasmine,
      },
    },
    rules: {
      ...universalRules,
      ...javascriptRules,
      ...javascriptTestRules,
    },
  },
  eslintConfigPrettier,
);
