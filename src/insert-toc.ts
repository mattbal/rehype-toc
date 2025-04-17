import { NormalizedOptions } from "./options.js";
import type { ElementContent, Element, Root } from "hast";

/**
 * Inserts the table of contents at the specified position, relative to the given nodes.
 *
 * @param toc - The table of contents node to insert
 * @param target - The node to insert `toc` in/before/after
 * @param parent - The parent node of `target`. This is used for inserting `toc` before/after `target`
 * @param options - The options for rehype-toc
 * @param options.position - The `position` option determines where `toc` is inserted
 */
export function insertTOC(
  toc: ElementContent,
  target: Element | Root,
  parent: Element | Root | undefined,
  { position }: NormalizedOptions,
): void {
  switch (position) {
    case "beforebegin":
      if (parent && target.type !== "root") {
        const childIndex = parent.children.indexOf(target);
        parent.children.splice(childIndex, 0, toc);
      }
      break;

    case "afterbegin":
      target.children.unshift(toc);
      break;

    case "beforeend":
      target.children.push(toc);
      break;

    case "afterend":
      if (parent && target.type !== "root") {
        const childIndex = parent.children.indexOf(target);
        parent.children.splice(childIndex + 1, 0, toc);
      }
      break;

    default:
      throw new Error(`Invalid table-of-contents position: ${position}`);
  }
}
