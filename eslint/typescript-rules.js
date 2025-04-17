/**
 * These are basic TypeScript rules that DON'T require type information.
 */
export default {
  /**
   * Use bracket syntax for simple arrays, and generic syntax for complex arrays.
   *
   * @see https://typescript-eslint.io/rules/array-type
   */
  "@typescript-eslint/array-type": [
    "error",
    {
      default: "array-simple",
      readonly: "array-simple",
    },
  ],

  /**
   * Allow certain @ts directives, but require a comment
   *
   * @see https://typescript-eslint.io/rules/ban-ts-comment
   */
  "@typescript-eslint/ban-ts-comment": [
    "error",
    {
      "ts-expect-error": "allow-with-description",
      "ts-nocheck": "allow-with-description",
      "ts-ignore": true, // never allow
      "ts-check": false, // always allow
      minimumDescriptionLength: 10,
    },
  ],

  /**
   * Remove old TSLint comments from code
   *
   * @see https://typescript-eslint.io/rules/ban-tslint-comment
   */
  "@typescript-eslint/ban-tslint-comment": "error",

  /**
   * Restrict specific types from being used
   *
   * @see https://typescript-eslint.io/rules/no-restricted-types
   */
  "@typescript-eslint/no-restricted-types": [
    "error",
    {
      types: {
        String: {
          message: "Use string instead",
          fixWith: "string",
        },
        Boolean: {
          message: "Use boolean instead",
          fixWith: "boolean",
        },
        Number: {
          message: "Use number instead",
          fixWith: "number",
        },
        Symbol: {
          message: "Use symbol instead",
          fixWith: "symbol",
        },
        Object: {
          message: "Use object instead",
          fixWith: "object",
        },
        "{}": {
          message: "Use object instead",
          fixWith: "object",
        },
      },
    },
  ],

  /**
   * Enforce consistent syntax for type assertions (`foo as Bar` rather than `<Bar>foo`)
   *
   * @see https://typescript-eslint.io/rules/consistent-type-assertions
   */
  "@typescript-eslint/consistent-type-assertions": "error",

  /**
   * Prefer interfaces over type definitions
   *
   * @see https://typescript-eslint.io/rules/consistent-type-definitions
   */
  "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

  /**
   * Require default parameters to be the last parameters in the function
   *
   * @see https://typescript-eslint.io/rules/default-param-last
   */
  "@typescript-eslint/default-param-last": "error",

  /**
   * Require explicit accessibility modifiers on class members
   *
   * @see https://typescript-eslint.io/rules/explicit-member-accessibility
   */
  "@typescript-eslint/explicit-member-accessibility": "error",

  /**
   * Use method shorthand syntax, rather than function property syntax
   *
   * @see https://typescript-eslint.io/rules/method-signature-style
   */
  "@typescript-eslint/method-signature-style": ["error", "method"],

  /**
   * Enforce typical TypeScript naming conventions
   *
   * @see https://typescript-eslint.io/rules/naming-convention
   */
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "default",
      filter: {
        regex: "\\W", // Ignore quoted properties (ones that contain non-word characters)
        match: false,
      },
      format: ["camelCase"],
      leadingUnderscore: "allow",
    },

    {
      selector: "variable",
      format: ["camelCase", "UPPER_CASE"],
      leadingUnderscore: "allow",
    },

    {
      selector: "typeParameter",
      format: ["PascalCase"],
      prefix: ["T"], // Require generics to start with a T (e.g. T, TFoo, TBar)
    },

    {
      selector: "enumMember",
      format: ["PascalCase"],
    },

    {
      selector: "interface",
      format: ["PascalCase"],
      custom: {
        regex: "^I[A-Z]", // Interfaces should NOT begin with "I"
        match: false,
      },
    },

    {
      selector: "typeLike",
      format: ["PascalCase"],
    },
  ],

  /**
   * Disallow use of the Array constructor
   *
   * @see https://typescript-eslint.io/rules/no-array-constructor
   */
  "@typescript-eslint/no-array-constructor": "error",

  /**
   * Don't allo non-null assertions that may be confused with inequality operators
   *
   * @see https://typescript-eslint.io/rules/no-confusing-non-null-assertion
   */
  "@typescript-eslint/no-confusing-non-null-assertion": "error",

  /**
   * Deleting dynamically computed keys can be dangerous and in some cases not well optimized.
   *
   * @see https://typescript-eslint.io/rules/no-dynamic-delete
   */
  "@typescript-eslint/no-dynamic-delete": "error",

  /**
   * Warn about empty functions
   *
   * @see https://typescript-eslint.io/rules/no-empty-function
   */
  "@typescript-eslint/no-empty-function": "warn",

  /**
   * Don't allow empty objects
   *
   * @see https://typescript-eslint.io/rules/no-empty-object-type
   */
  "@typescript-eslint/no-empty-object-type": "error",

  /**
   * Warn about using the "any" type
   *
   * @see https://typescript-eslint.io/rules/no-explicit-any
   */
  "@typescript-eslint/no-explicit-any": "warn",

  /**
   * Don't allow redundant non-null assertion operators
   *
   * @see https://typescript-eslint.io/rules/no-extra-non-null-assertion
   */
  "@typescript-eslint/no-extra-non-null-assertion": "error",

  /**
   * Don't allow classes that only contain constructors and/or static members
   *
   * @see https://typescript-eslint.io/rules/no-extraneous-class
   */
  "@typescript-eslint/no-extraneous-class": [
    "error",
    {
      allowWithDecorator: true, // Allow classes that are needed for frameworks
    },
  ],

  /**
   * Disallow explicit type declarations when variables are initialized
   *
   * @see https://typescript-eslint.io/rules/no-inferrable-types
   */
  "@typescript-eslint/no-inferrable-types": "error",

  /**
   * Enforce valid definition of `new` and `constructor`
   *
   * @see https://typescript-eslint.io/rules/no-misused-new
   */
  "@typescript-eslint/no-misused-new": "error",

  /**
   * Disallow TypeScript namespaces in code.  Only allow for type declarations.
   *
   * @see https://typescript-eslint.io/rules/no-namespace
   */
  "@typescript-eslint/no-namespace": [
    "error",
    {
      allowDeclarations: true,
      allowDefinitionFiles: true,
    },
  ],

  /**
   * Disallows using a non-null assertion after an optional chain expression
   *
   * @see https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
   */
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

  /**
   * Disallow usage of expressions in statement position
   *
   * @see https://typescript-eslint.io/rules/no-unused-expressions
   */
  "@typescript-eslint/no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true, // allow short-circuited expressions (e.g. foo && bar())
      allowTernary: true, // allow ternary expressions (e.g. foo ? bar() : baz())
    },
  ],

  /**
   * Disallow declaration of variables that are not used in the code
   *
   * @see https://typescript-eslint.io/rules/no-unused-vars
   */
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      vars: "all", // check "all" variables (as opposed to just "local" variables)
      args: "after-used", // check any arguments that come "after-used" arguments
      ignoreRestSiblings: true, // ignore siblings of ...rest params
      argsIgnorePattern: "^_", // Ignore params that begin with an underscore
      varsIgnorePattern: "^_", // Ignore variables that begin with an underscore
    },
  ],

  /**
   * Don't allow constructors that are empty or only call super()
   *
   * @see https://typescript-eslint.io/rules/no-useless-constructor
   */
  "@typescript-eslint/no-useless-constructor": "error",

  /**
   * Disallows the use of require
   *
   * @see https://typescript-eslint.io/rules/no-require-imports/
   */
  "@typescript-eslint/no-require-imports": "error",

  /**
   * Prefer usage of as const over literal type
   *
   * @see https://typescript-eslint.io/rules/prefer-as-const
   */
  "@typescript-eslint/prefer-as-const": "error",

  /**
   * Use function types instead of interfaces with call signatures
   *
   * @see https://typescript-eslint.io/rules/prefer-function-type
   */
  "@typescript-eslint/prefer-function-type": "error",

  /**
   * Require that all enum members be literal values
   *
   * @see https://typescript-eslint.io/rules/prefer-literal-enum-member
   */
  "@typescript-eslint/prefer-literal-enum-member": "error",

  /**
   * Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules
   *
   * @see https://typescript-eslint.io/rules/prefer-namespace-keyword
   */
  "@typescript-eslint/prefer-namespace-keyword": "error",

  /**
   * Enforce optional chaining
   *
   * @see https://typescript-eslint.io/rules/prefer-optional-chain
   */
  "@typescript-eslint/prefer-optional-chain": "error",

  /**
   * Use `import` rather than triple slash directives
   *
   * @see https://typescript-eslint.io/rules/triple-slash-reference
   */
  "@typescript-eslint/triple-slash-reference": "error",

  /**
   * Don't allow the "use strict" pragma
   *
   * @see https://eslint.org/docs/rules/strict
   */
  strict: ["error", "never"],
};
