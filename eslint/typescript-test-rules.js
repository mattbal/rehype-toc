/**
 * Relax some JavaScript rules for testing purposes
 */
export default {
  /**
   * Allow empty/unused classes
   *
   * @see https://typescript-eslint.io/rules/no-extraneous-class
   */
  "@typescript-eslint/no-extraneous-class": "off",

  /**
   * Allow async functions without an `await` keyword
   *
   * @see https://typescript-eslint.io/rules/require-await
   */
  "@typescript-eslint/require-await": "off",

  /**
   * Ignore unnecessary `return await` statements
   *
   * @see https://typescript-eslint.io/rules/return-await
   */
  "@typescript-eslint/return-await": "off",
};
