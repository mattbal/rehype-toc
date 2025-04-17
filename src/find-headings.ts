import { NormalizedOptions } from "./options.js";
import { isElement, isHeadingNode, isRoot } from "./type-guards.js";
import { HeadingNode } from "./types.js";
import type { Element, Root } from "hast";

/**
 * Finds all HTML heading nodes (`<h1>` through `<h6>`)
 */
export function findHeadings(node: Root | Element, options: NormalizedOptions): HeadingNode[] {
  const headingNodes: HeadingNode[] = [];
  findHeadingsRecursive(node, headingNodes, options);
  return headingNodes;
}

/**
 * Recursively crawls the HAST tree and adds all HTML heading nodes to the given array.
 */
function findHeadingsRecursive(
  node: Root | Element,
  headingNodes: HeadingNode[],
  options: NormalizedOptions,
): void {
  if (isHeadingNode(node, options)) {
    headingNodes.push(node);
  }

  if ((isElement(node) || isRoot(node)) && node.children) {
    for (const child of node.children) {
      if (isElement(child)) {
        findHeadingsRecursive(child, headingNodes, options);
      }
    }
  }
}
