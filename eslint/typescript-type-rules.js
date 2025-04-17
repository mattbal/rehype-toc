/**
 * These TypeScript rules require type information, which means they only work for files that
 * are referenced by the tsconfig.json file.
 */
export default {
  /**
   * Disallows awaiting a value that is not a Thenable
   *
   * @see https://typescript-eslint.io/rules/await-thenable
   */
  "@typescript-eslint/await-thenable": "error",

  /**
   * Encourages use of dot notation whenever possible
   *
   * @see https://typescript-eslint.io/rules/dot-notation
   */
  "@typescript-eslint/dot-notation": "error",

  /**
   * Warns about .toString() calls that may produce non-useful stringified values (e.g. "[object Object]")
   *
   * @see https://typescript-eslint.io/rules/no-base-to-string
   */
  "@typescript-eslint/no-base-to-string": [
    "warn",
    {
      ignoredTypeNames: ["RegExp", "URL", "URLSearchParams"],
    },
  ],

  /**
   * Requires Promise-like values to be handled appropriately
   *
   * @see https://typescript-eslint.io/rules/no-floating-promises
   */
  "@typescript-eslint/no-floating-promises": [
    "error",
    {
      ignoreIIFE: true,
    },
  ],

  /**
   * Disallow iterating over an array with a for-in loop
   *
   * @see https://typescript-eslint.io/rules/no-for-in-array
   */
  "@typescript-eslint/no-for-in-array": "error",

  /**
   * Disallow the use of eval()-like method
   *
   * @see https://typescript-eslint.io/rules/no-implied-eval
   */
  "@typescript-eslint/no-implied-eval": "error",

  /**
   * Avoid using promises in places not designed to handle them
   *
   * @see https://typescript-eslint.io/rules/no-misused-promises
   */
  "@typescript-eslint/no-misused-promises": "error",

  /**
   * Disallow throwing literals as exceptions
   *
   * @see https://typescript-eslint.io/rules/only-throw-error/
   *
   * Note: you must disable the base rule as it can report incorrect errors
   */
  "no-throw-literal": "off",
  "@typescript-eslint/only-throw-error": "error",

  /**
   * It's unnecessary to compare boolean variables against boolean literals.  Just use the boolean variable directly (e.g. "if (x)" instead of "if (x === true)")
   *
   * @see https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
   */
  "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

  /**
   * Disallows unnecessary type assertions
   *
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-assertion
   */
  "@typescript-eslint/no-unnecessary-type-assertion": "error",

  /**
   * Warn about assigning an "any" value to a typed variable
   *
   * @see https://typescript-eslint.io/rules/no-unsafe-assignment
   */
  "@typescript-eslint/no-unsafe-assignment": "warn",

  /**
   * Warn about calling an `any` value as a function
   *
   * @see https://typescript-eslint.io/rules/no-unsafe-call
   */
  "@typescript-eslint/no-unsafe-call": "warn",

  /**
   * Warn about accessing members of an "any" variable
   *
   * @see https://typescript-eslint.io/rules/no-unsafe-member-access
   */
  "@typescript-eslint/no-unsafe-member-access": "warn",

  /**
   * Warn about returning `any` from a function
   *
   * @see https://typescript-eslint.io/rules/no-unsafe-return
   */
  "@typescript-eslint/no-unsafe-return": "warn",

  /**
   * Enforce nullish coalescing
   *
   * @see https://typescript-eslint.io/rules/prefer-nullish-coalescing
   */
  "@typescript-eslint/prefer-nullish-coalescing": "error",

  /**
   * Prefer using type parameter when calling Array#reduce instead of casting
   *
   * @see https://typescript-eslint.io/rules/prefer-reduce-type-parameter
   */
  "@typescript-eslint/prefer-reduce-type-parameter": "error",

  /**
   * Prefer `RegExp.exec()` over `String.match()`
   *
   * @see https://typescript-eslint.io/rules/prefer-regexp-exec
   */
  "@typescript-eslint/prefer-regexp-exec": "error",

  /**
   * Prefer `String.startsWith()` and `String.endsWith()` instead of older alternatives, such as `String.indexOf()`, `String.charAt()`, and `String.slice()`
   *
   * @see https://typescript-eslint.io/rules/prefer-string-starts-ends-with
   */
  "@typescript-eslint/prefer-string-starts-ends-with": "warn",

  /**
   * Warn about calling `Array.sort()` without a compare function.  The default compare algorithm sorts alphabetically, even for numbers, dates, etc.
   *
   * @see https://typescript-eslint.io/rules/require-array-sort-compare
   */
  "@typescript-eslint/require-array-sort-compare": [
    "warn",
    {
      ignoreStringArrays: true,
    },
  ],

  /**
   * Require async functions to contain an `await` keyword
   *
   * @see https://typescript-eslint.io/rules/require-await
   */
  "@typescript-eslint/require-await": "error",

  /**
   * Disallow unnecessary `return await` statements
   *
   * @see https://typescript-eslint.io/rules/return-await
   */
  "@typescript-eslint/return-await": "error",

  /**
   * Don"t allow the "use strict" pragma
   *
   * @see https://eslint.org/docs/rules/strict
   */
  strict: ["error", "never"],
};
