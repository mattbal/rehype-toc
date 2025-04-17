/**
 * JSDoc rules for JavaScript and TypeScript
 */
export default {
  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-access.md#readme
   */
  "jsdoc/check-access": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-alignment.md#readme
   */
  "jsdoc/check-alignment": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-param-names.md#readme
   */
  "jsdoc/check-param-names": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-property-names.md#readme
   */
  "jsdoc/check-property-names": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-syntax.md#readme
   */
  "jsdoc/check-syntax": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md#readme
   */
  "jsdoc/check-tag-names": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-values.md#readme
   */
  "jsdoc/check-values": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/empty-tags.md#readme
   */
  "jsdoc/empty-tags": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/implements-on-classes.md#readme
   */
  "jsdoc/implements-on-classes": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-description.md#readme
   */
  "jsdoc/require-description": [
    "warn",
    {
      contexts: [
        "FunctionDeclaration",
        "ClassDeclaration",
        "ClassExpression",
        "ClassProperty",
        "MethodDefinition",
        "ExportNamedDeclaration",
        "TSInterfaceDeclaration",
        "TSPropertySignature",
        "TSMethodSignature",
        "TSTypeAliasDeclaration",
        "TSDeclareFunction",
        "TSEnumDeclaration",
        "TSEmptyBodyFunctionExpression",
        "TSFunctionType",
      ],
    },
  ],

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md#readme
   */
  "jsdoc/require-jsdoc": [
    "warn",
    {
      enableFixer: false,
    },
  ],

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-description.md#readme
   */
  "jsdoc/require-param-description": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-param-name.md#readme
   */
  "jsdoc/require-param-name": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property.md#readme
   */
  "jsdoc/require-property": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-description.md#readme
   */
  "jsdoc/require-property-description": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-property-name.md#readme
   */
  "jsdoc/require-property-name": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-check.md#readme
   */
  "jsdoc/require-returns-check": "warn",

  /**
   * @see https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-returns-description.md#readme
   */
  "jsdoc/require-returns-description": "warn",
};
