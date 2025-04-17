import { NormalizedOptions } from "./options.js";
import { Data } from "./types.js";
import { isElement } from "./type-guards.js";
import type { Element, ElementContent } from "hast";

/**
 * A function that allows callers to customize the table of contents
 */
export type CustomizationHook = (
  node: Element,
  ...args: unknown[]
) => ElementContent | boolean | undefined;

/**
 * Allows the user to customize the table of contents before it gets added to the page.
 */
export function customizationHooks(
  toc: Element,
  options: NormalizedOptions,
): ElementContent | undefined {
  const { customizeTOC, customizeTOCItem } = options;
  customizeNodes(toc, "li", customizeTOCItem);
  return customizationHook(customizeTOC, toc);
}

/**
 * Customize nodes using the customizeTOCItem hook
 */
function customizeNodes(parent: ElementContent, tagName: string, hook?: CustomizationHook): void {
  if (!hook) {
    return;
  }

  if (isElement(parent) && parent.children) {
    for (const child of parent.children) {
      if (isElement(child)) {
        if (child.tagName === tagName) {
          const hookArgs = child.data && (child.data as Data).hookArgs;
          if (hookArgs) {
            const newChild = customizationHook(hook, child, hookArgs);
            replaceNode(parent, child, newChild);
          }
        }

        if (child.children) {
          customizeNodes(child, tagName, hook);
        }
      }
    }
  }
}

/**
 * Allows callers to customize the table of contents.
 */
function customizationHook(
  hook: CustomizationHook | undefined,
  node: Element,
  args: unknown[] = [],
): ElementContent | undefined {
  if (!hook) {
    // No customization. Use the original node.
    return node;
  }

  // Call the customization hook
  const newNode = hook(node, ...args);

  if (newNode && typeof newNode === "object") {
    // The hook returned a new Node to replace the original one
    return newNode;
  } else if (newNode === true || newNode === undefined) {
    // Use the original Node
    return node;
  } else {
    // The hook returned a falsy value, so discard the Node altogether
    return undefined;
  }
}

/**
 * Replaces the specified child node with a different node
 */
function replaceNode(
  parent: Element,
  oldChild: ElementContent,
  newChild: ElementContent | undefined,
): void {
  // We only need to do a replacement if the nodes are different
  if (newChild !== oldChild && parent.children) {
    const index = parent.children.indexOf(oldChild);

    if (newChild === undefined) {
      // Remove the old child
      parent.children.splice(index, 1);
    } else {
      // Replace the old child with the new child
      parent.children.splice(index, 1, newChild);
    }
  }
}
