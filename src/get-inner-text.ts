import type { Node } from "unist";
import { isElement, isText } from "./type-guards.js";

/**
 * Returns the text content of all children of the given node
 */
export function getInnerText(node: Node): string {
  let text = "";

  if (isText(node)) {
    text += node.value || "";
  }

  if (isElement(node) && node.children) {
    for (const child of node.children) {
      text += getInnerText(child);
    }
  }

  return text;
}
