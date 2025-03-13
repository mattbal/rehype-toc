import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from 'eslint-plugin-jsdoc'
import universalRules from "./eslint/universal-rules";
import universalJSDocRules from './eslint/universal-jsdoc-rules'
import javascriptRules from './eslint/javascript-rules'
import javascriptJSDocRules from './eslint/javascript-jsdoc-rules'
import javascriptTestRules from './eslint/javascript-test-rules'
import typescriptRules from './eslint/typescript-rules'
import typescriptJSDocRules from './eslint/typescript-jsdoc-rules'
import typescriptTestRules from './eslint/typescript-test-rules'
import typescriptTypeRules from './eslint/typescript-type-rules'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    overrides: [
      /**
     * TypeScript source files
     *
     * Includes ESLint rules that require TypeScript type definitions.
     * This only works for TypeScript files that are included in the tsconfig.json file
     */
      {
        files: ["**/*.{ts,tsx}"],
        excludedFiles: "test/**",
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
          tsconfigRootDir: hasTSConfig ? process.cwd() : undefined,
          project: hasTSConfig ? "tsconfig.json" : undefined,
        },
        plugins: {
          "@typescript-eslint": tseslint.plugin,
          "jsdoc": jsdoc,
        },
        rules: {
          ...universalRules,
          ...universalJSDocRules,
          ...typescriptRules,
          ...typescriptJSDocRules,
          ...hasTSConfig && typescriptTypeRules,
        }
      },

      /**
       * TypeScript test files
       *
       * Does not include ESLint rules that require TypeScript type definitions,
       * since test files aren't included in the tsconfig.json file
       */
      {
        files: ["test/**/*.{ts,tsx}"],
        parser: tseslint.parser,
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
        plugins: {
          "@typescript-eslint": tseslint.plugin,
        },
        env: {
          mocha: true,
          jasmine: true,
        },
        rules: {
          ...universalRules,
          ...typescriptRules,
          ...typescriptTestRules,
        }
      },

      /**
       * JavaScript source files
       */
      {
        files: ["**/*.{js,jsx}"],
        excludedFiles: "test/**",
        plugins: [
          "jsdoc",
        ],
        rules: {
          ...universalRules,
          ...universalJSDocRules,
          ...javascriptRules,
          ...javascriptJSDocRules,
        }
      },

      /**
       * JavaScript test files
       */
      {
        files: ["test/**/*.{js,jsx}"],
        env: {
          mocha: true,
          jasmine: true,
        },
        rules: {
          ...universalRules,
          ...javascriptRules,
          ...javascriptTestRules,
        }
      },
    ]
  }
];