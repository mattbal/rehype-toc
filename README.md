# Table of Contents plugin for Rehype

A [rehype](https://github.com/rehypejs/rehype) plugin that adds a table of contents (TOC) to the page

> forked from [JS-DevTools/rehype-toc](https://github.com/JS-DevTools/rehype-toc) as the original repository seems no longer maintained.

[![Tests](https://github.com/mattbal/rehype-toc/actions/workflows/test.yml/badge.svg?branch=master&event=push)](https://github.com/mattbal/rehype-toc/actions/workflows/test.yml)

[![npm](https://img.shields.io/npm/v/%40mattbal%2Frehype-toc)](https://www.npmjs.com/package/@mattbal/rehype-toc)
[![License](https://img.shields.io/npm/l/%40mattbal%2Frehype-toc)](LICENSE)

## Features

- Adds a `<nav>` and `<ol>` list outlining all headings on the page
- Combine with [rehype-slug](https://github.com/rehypejs/rehype-slug) to create links to each heading
- Ignores headings outside of `<main>` if it exists
- You can customize which headings are included (defaults to `<h1>` - `<h6>`)
- You can customize the CSS classes on every TOC element
- Hooks give you complete customization of the generated HTML

## Example

**input.html**<br>
Here's the original HTML file. There are three levels of headings (`<h1>` - `<h3>`), and none of them have IDs.

```html
<html>
  <body>
    <h1>Apple Pie Recipe</h1>
    <p>This is the world's best apple pie recipe...</p>

    <div>
      <h2>Filling</h2>
      <p>The filling is the best part...</p>

      <h3>Preparing the apples</h3>
      <p>Cut the apples into 1/4 inch slices...</p>

      <h3>Preparing the spice mix</h3>
      <p>In a mixing bowl, combine sugar, cinnamon...</p>
    </div>

    <div>
      <h2>Crust</h2>
      <p>How to make the perfect flaky crust...</p>

      <h3>Preparing the dough</h3>
      <p>Combine flour, sugar, salt...</p>

      <h3>The criss-cross top</h3>
      <p>Cut the top crust into 1/2 inch strips...</p>
    </div>
  </body>
</html>
```

**example.js**<br>
This script reads the `input.html` file above writes the results to `output.html` (shown below). The script uses [unified](https://unifiedjs.com/), [rehype-parse](https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse), [rehype-slug](https://github.com/rehypejs/rehype-slug), and [rehype-stringify](https://github.com/rehypejs/rehype/tree/master/packages/rehype-stringify).

```javascript
import { unified } from "unified";
import parse from "rehype-parse";
import slug from "rehype-slug";
import toc from "@mattbal/rehype-toc";
import stringify from "rehype-stringify";
import fs from "node:fs/promises";

async function example() {
  // Create a Rehype processor with the TOC plugin
  const processor = unified().use(parse).use(slug).use(toc).use(stringify);

  // Read the original HTML file
  let inputHTML = await fs.readFile("input.html");

  // Process the HTML, adding heading IDs and Table of Contents
  let outputHTML = await processor.process(inputHTML);

  // Save the new HTML
  await fs.writeFile("output.html", outputHTML.value);
}
```

**output.html**<br>
Here's the HTML that gets created by the above script. Notice that a table of contents has been added at the top of the `<body>`, with links to each of the headings on the page. The headings also now have IDs, thanks to [rehype-slug](https://github.com/rehypejs/rehype-slug).

```html
<html>
  <body>
    <nav class="toc">
      <ol class="toc-level toc-level-1">
        <li class="toc-item toc-item-h1">
          <a class="toc-link toc-link-h1" href="#apple-pie-recipe"> Apple Pie Recipe </a>

          <ol class="toc-level toc-level-2">
            <li class="toc-item toc-item-h2">
              <a class="toc-link toc-link-h2" href="#filling"> Filling </a>

              <ol class="toc-level toc-level-3">
                <li class="toc-item toc-item-h3">
                  <a class="toc-link toc-link-h3" href="#preparing-the-apples">
                    Preparing the apples
                  </a>
                </li>
                <li class="toc-item toc-item-h3">
                  <a class="toc-link toc-link-h3" href="#preparing-the-spice-mix">
                    Preparing the spice mix
                  </a>
                </li>
              </ol>
            </li>

            <li class="toc-item toc-item-h2">
              <a class="toc-link toc-link-h2" href="#crust"> Crust </a>

              <ol class="toc-level toc-level-3">
                <li class="toc-item toc-item-h3">
                  <a class="toc-link toc-link-h3" href="#preparing-the-dough">
                    Preparing the dough
                  </a>
                </li>
                <li class="toc-item toc-item-h3">
                  <a class="toc-link toc-link-h3" href="#the-criss-cross-top">
                    The criss-cross top
                  </a>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
    </nav>

    <h1 id="apple-pie-recipe">Apple Pie Recipe</h1>
    <p>This is the world's best apple pie recipe...</p>

    <div>
      <h2 id="filling">Filling</h2>
      <p>The filling is the best part...</p>

      <h3 id="preparing-the-apples">Preparing the apples</h3>
      <p>Cut the apples into 1/4 inch slices...</p>

      <h3 id="preparing-the-spice-mix">Preparing the spice mix</h3>
      <p>In a mixing bowl, combine sugar, cinnamon...</p>
    </div>

    <div>
      <h2 id="crust">Crust</h2>
      <p>How to make the perfect flaky crust...</p>

      <h3 id="preparing-the-dough">Preparing the dough</h3>
      <p>Combine flour, sugar, salt...</p>

      <h3 id="the-criss-cross-top">The criss-cross top</h3>
      <p>Cut the top crust into 1/2 inch strips...</p>
    </div>
  </body>
</html>
```

## Installation

You can install Rehype TOC via [npm](https://docs.npmjs.com/about-npm/).

```bash
npm install @mattbal/rehype-toc
```

You'll probably want to install [unified](https://unifiedjs.com/), [rehype-parse](https://github.com/rehypejs/rehype/tree/master/packages/rehype-parse), [rehype-stringify](https://github.com/rehypejs/rehype/tree/master/packages/rehype-stringify), and [rehype-slug](https://github.com/rehypejs/rehype-slug) as well.

```bash
npm install unified rehype-parse rehype-stringify rehype-slug
```

## Usage

Using the Rehype TOC plugin requires an understanding of how to use Unified and Rehype. [Here is an excellent guide](https://unifiedjs.com/learn/guide/introduction-to-unified/) to learn the basics.

The Rehype TOC plugin works just like any other Rehype plugin. Pass it to [the `.use()` method](https://github.com/unifiedjs/unified#processoruseplugin-options), optionally with an [options object](#options).

```javascript
import { unified } from "unified";
import toc from "@mattbal/rehype-toc";

// Use the Rehype TOC plugin with its default options
unified().use(toc);

// Use the Rehype TOC plugin with custom options
unified().use(toc, {
  headings: ["h1", "h2"], // Only include <h1> and <h2> headings in the TOC
  cssClasses: {
    toc: "page-outline", // Change the CSS class for the TOC
    link: "page-link", // Change the CSS class for links in the TOC
  },
});
```

## Options

The Rehype TOC plugin supports the following options:

| Option                | Type                   | Default                | Description                                                                                                                                                                                                                                                                                                                                                     |
| :-------------------- | :--------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nav`                 | boolean                | true                   | Determines whether the table of contents is wrapped in a `<nav>` element.                                                                                                                                                                                                                                                                                       |
| `position`            | string                 | "afterbegin"           | The position at which the table of contents should be inserted, relative to the `<main>` or `<body>` element. Can be "beforebegin", "afterbegin", "beforeend", or "afterend". See [the `insertAdjacentElement()` docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement) for an explanation of each value.                        |
| `headings`            | array of strings       | h1, h2, h3, h4, h5, h6 | The HTML heading tags to include in the table of contents                                                                                                                                                                                                                                                                                                       |
| `cssClasses.toc`      | string                 | toc                    | The CSS class name for the top-level `<nav>` or `<ol>` element that contains the whole table of contents.                                                                                                                                                                                                                                                       |
| `cssClasses.list`     | string                 | toc-level              | The CSS class name for all `<ol>` elements in the table of contents, including the top-level one.                                                                                                                                                                                                                                                               |
| `cssClasses.listItem` | string                 | toc-item               | The CSS class name for all `<li>` elements in the table of contents.                                                                                                                                                                                                                                                                                            |
| `cssClasses.link`     | string                 | toc-link               | The CSS class name for all `<a>` elements in the table of contents.                                                                                                                                                                                                                                                                                             |
| `addClassSuffix.ol`   | boolean                | true                   | Will add a suffix to all `<ol>` elements in the table of contents indicating the depth level. You may want to disable this if you supply multiple class names to the `cssClasses` option, as adding a suffix causes the class name to be duplicated like so: `toc-level font-bold toc-level font-bold-2`.                                                       |
| `addClassSuffix.li`   | boolean                | true                   | Will add a suffix to all `<li>` elements in the table of contents indicating the depth level. You may want to disable this if you supply multiple class names to the `cssClasses` option, as adding a suffix causes the class name to be duplicated like so: `toc-item font-bold toc-item font-bold-h2`.                                                        |
| `addClassSuffix.a`    | boolean                | true                   | Will add a suffix to all `<a>` elements in the table of contents indicating the depth level. You may want to disable this if you supply multiple class names to the `cssClasses` option, as adding a suffix causes the class name to be duplicated like so: `toc-link font-bold toc-link font-bold-h2`.                                                         |
| `customizeTOC`        | function(toc)          |                        | Allows you to customize the table of contents before it is added to the page.<br><br>The function receives the TOC node tree and can modify it in any way you want. Or you can return a new node tree to use instead. Or return `false` to prevent the the TOC from being added to the page.                                                                    |
| `customizeTOCItem`    | function(toc, heading) |                        | Allows you to customize each item in the table of contents before it is added to the page.<br><br>The function receives the TOC item's node tree and the heading node that it refers to. You can modify the nodes in any way you want. Or you can return a new node tree to use instead. Or return `false` to prevent the the TOC from being added to the page. |

## Contributing

Contributions, enhancements, and bug-fixes are welcome! [Open an issue](https://github.com/mattbal/rehype-toc/issues) on GitHub and [submit a pull request](https://github.com/mattbal/rehype-toc/pulls).

#### Building

To build the project locally on your computer:

1. **Clone this repo**<br>
   `git clone https://github.com/mattbal/rehype-toc.git`

2. **Install dependencies**<br>
   `npm install`

3. **Build the code**<br>
   `npm run build`

4. **Run the tests**<br>
   `npm test`

## License

Rehype TOC is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.
