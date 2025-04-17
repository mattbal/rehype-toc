/**
 * Relax some JavaScript rules for testing purposes
 */
export default {
  /**
   * Allow empty functions
   *
   * @see https://eslint.org/docs/rules/no-empty-function
   */
  "no-empty-function": "off",

  /**
   * Allow the new operator to be used for side-effects
   *
   * @see https://eslint.org/docs/rules/no-new
   */
  "no-new": "off",

  /**
   * Warn about usage of expressions in statement position
   *
   * @see https://eslint.org/docs/rules/no-unused-expressions
   */
  "no-unused-expressions": [
    "warn",
    {
      allowShortCircuit: true, // allow short-circuited expressions (e.g. foo && bar())
      allowTernary: true, // allow ternary expressions (e.g. foo ? bar() : baz())
    },
  ],

  /**
   * allow async functions without an `await` keyword
   *
   * @see https://eslint.org/docs/rules/require-await
   */
  "require-await": "off",
};
