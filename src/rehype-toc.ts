import { Processor, Transformer } from "unified";
import { createTOC } from "./create-toc.js";
import { customizationHooks } from "./customization-hooks.js";
import { findHeadings } from "./find-headings.js";
import { findMainNode } from "./find-main-node.js";
import { insertTOC } from "./insert-toc.js";
import { NormalizedOptions, Options } from "./options.js";
import type { Root } from "hast";

/**
 * This is a Rehype plugin that adds a table of contents (TOC) that links to all
 * the `<h1>` - `<h6>` headings no the page.
 */
export function toc(this: Processor, opts?: Options): Transformer {
  const options = new NormalizedOptions(opts);

  return function transformer(root: Root): Root {
    // Find the <main> or <body> element
    const [mainNode, mainParent] = findMainNode(root);
    if (mainNode.type === "root") {
      if (options.position === "beforebegin") {
        throw new Error(
          "Error. Cannot insert toc beforebegin because there is no <main> or <body> node. If there is no <main> or <body> node, rehype-toc attempts to use the root node, which can be used for afterbegin or beforeend insertion, but not for beforebegin or afterend insertion, since each HAST tree has to have only one node as its root (and can have no siblings for beforebegin or afterend insertion). See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement for an illustration of how beforebegin works.",
        );
      } else if (options.position === "afterend") {
        throw new Error(
          "Error. Cannot insert toc afterend because there is no <main> or <body> node. If there is no <main> or <body> node, rehype-toc attempts to use the root node, which can be used for afterbegin or beforeend insertion, but not for beforebegin or afterend insertion, since each HAST tree has to have only one node as its root (and can have no siblings for beforebegin or afterend insertion). See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement for an illustration of how afterend works.",
        );
      }
    }

    // Find all heading elements
    const headings = findHeadings(mainNode, options);

    // Create the table of contents
    const tocNode = createTOC(headings, options);

    // Allow the user to customize the table of contents before we add it to the page
    const node = customizationHooks(tocNode, options);

    if (node) {
      // Add the table of contents to the <main> element
      insertTOC(node, mainNode, mainParent, options);
    }

    return root;
  };
}
