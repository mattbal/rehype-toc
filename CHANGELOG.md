# Change Log

All notable changes will be documented in this file.
Rehype TOC adheres to [Semantic Versioning](http://semver.org/).

## [v3.5.0](https://github.com/mattbal/rehype-toc/tree/v3.5.0) (2025-04-18)

- Added more customization options to `addClassSuffix`

## [v3.4.0](https://github.com/mattbal/rehype-toc/tree/v3.4.0) (2025-04-17)

- Updated all dependencies to latest versions
- Migrated project from CommonJS to ECMAScript Module
- Switched from nyc to c8 for code coverage
- Updated ESLint config to support ESLint v9
- Removed deprecated ESLint code formatting rules and replaced with [Prettier](https://github.com/prettier/prettier)
- Added [lint-staged](https://github.com/lint-staged/lint-staged) and [Husky](https://github.com/typicode/husky) to automatically run Prettier and ESLint on files that are marked as staged via `git add` before you commit
- Updated types to use types from the [hast](https://github.com/syntax-tree/hast) library instead of the old custom types that were an oversimplification of `hast`'s types. (Should lead to better error handling)
- Made it so that attempting to incorrectly insert the table of contents with `beforebegin` or `after end` when there is no <main> or <body> node throws an error
- Added a new rehype-toc configuration option: addClassSuffix, which allows you to disable adding suffixes to the end of rehype-toc class names. (Useful if you want to supply rehype-toc elements with multiple classnames. Previously, supplying multiple classnames like `cssClasses: { listItem: ‘toc-item focused semibold’}` would have returned duplicate classnames in your HTML like: `toc-item focused semibold toc-item focused semibold-h2`)

## [v3.0.0](https://github.com/JS-DevTools/rehype-toc/tree/v3.0.0) (2020-02-17)

- Moved Rehype TOC to the [@JSDevTools scope](https://www.npmjs.com/org/jsdevtools) on NPM

- The "rehype-toc" NPM package is now just a wrapper around the scoped "@jsdevtools/rehype-toc" package

[Full Changelog](https://github.com/JS-DevTools/rehype-toc/compare/v2.1.0...v3.0.0)

## [v2.2.0](https://github.com/JS-DevTools/rehype-toc/tree/v2.2.0) (2019-07-31)

- Added a new `customizeTOCItem` option that allows you to customize each item in the table-of-contents before it's added to the page

[Full Changelog](https://github.com/JS-DevTools/rehype-toc/compare/v2.1.0...v2.2.0)

## [v2.1.0](https://github.com/JS-DevTools/rehype-toc/tree/v2.1.0) (2019-07-11)

- Added a new `position` option that allows control over where the table-of-contents is inserted into the document

[Full Changelog](https://github.com/JS-DevTools/rehype-toc/compare/v2.0.0...v2.1.0)

## [v2.0.0](https://github.com/JS-DevTools/rehype-toc/tree/v2.0.0) (2019-07-10)

### Breaking Changes

- The table of contents is now wrapped in a `<nav>` element by default. You can set the `nav` option to `false` to disable this feature, which will behave exactly like the previous version.

[Full Changelog](https://github.com/JS-DevTools/rehype-toc/compare/v1.0.1...v2.0.0)

## [v1.0.0](https://github.com/JS-DevTools/rehype-toc/tree/v1.0.0) (2019-06-23)

Initial release 🎉
