import { isElement } from "./type-guards.js";
import type { Element, Root } from "hast";

/**
 * Returns the `<main>` node, or the `<body>` node if there is no `<main>`.
 * The second node returned is the parent of the first node.
 */
export function findMainNode(root: Root): [Element | Root, Element | Root | undefined] {
  const [body, bodyParent] = findTagName(root, "body");
  const [main, mainParent] = findTagName(body ?? root, "main");

  if (main) {
    return [main, mainParent ?? body];
  } else {
    return [body ?? root, bodyParent];
  }
}

/**
 * Recursively crawls the HAST tree and finds the first element with the specified tag name.
 */
function findTagName(
  node: Element | Root,
  tagName: string,
  parent: Element | Root | undefined = undefined,
): [Element | undefined, Element | Root | undefined] {
  if (isElement(node) && node.tagName === tagName) {
    return [node, parent];
  }

  if (node.children) {
    for (const child of node.children) {
      if (isElement(child)) {
        const [found, foundParent] = findTagName(child, tagName, node);
        if (found) {
          return [found, foundParent];
        }
      }
    }
  }

  return [undefined, undefined];
}
