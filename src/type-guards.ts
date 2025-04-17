import type { Node } from "unist";
import { NormalizedOptions } from "./options.js";
import { HeadingNode, HeadingTagName } from "./types.js";
import type { Element, Root, Text } from "hast";

/**
 * Determines whether the given node is a Root Node.
 */
export function isRoot(node: Node): node is Root {
  return node.type === "root";
}

/**
 * Determines whether the given node is an HTML element.
 */
export function isElement(node: Node): node is Element {
  return node.type === "element";
}

/**
 * Determines whether the given node is a Text Node.
 */
export function isText(node: Node): node is Text {
  return node.type === "text";
}

/**
 * Determines whether the given node is an HTML heading node, according to the specified options
 */
export function isHeadingNode(node: Node, options: NormalizedOptions): node is HeadingNode {
  return isElement(node) && options.headings.includes(node.tagName as HeadingTagName);
}
