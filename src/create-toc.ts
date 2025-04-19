import { getInnerText } from "./get-inner-text.js";
import { buildClass, NormalizedOptions } from "./options.js";
import { isElement } from "./type-guards.js";
import { HeadingNode } from "./types.js";
import type { Element } from "hast";

interface TocLevel {
  depth: number;
  headingNumber: number;
  list: Element | undefined;
}

/**
 * Creates a `<nav>` and/or `<ol>` element containing the table of contents.
 */
export function createTOC(headings: HeadingNode[], options: NormalizedOptions): Element {
  const list = createTocList(headings, options);

  if (options.nav) {
    return {
      type: "element",
      tagName: "nav",
      properties: {
        className: options.cssClasses.toc || undefined,
      },
      children: [list],
    };
  } else {
    list.properties.className =
      [options.cssClasses.toc, list.properties.className].filter(Boolean).join(" ") || undefined;
    return list;
  }
}

/**
 * Creates an `<ol>` element containing the table of contents.
 */
function createTocList(headings: HeadingNode[], options: NormalizedOptions): Element {
  let levels: TocLevel[] = [];
  let currentLevel: TocLevel = {
    depth: 0,
    headingNumber: 0,
    list: undefined,
  };

  for (const heading of headings) {
    const headingNumber = parseInt(heading.tagName.slice(-1), 10);

    if (headingNumber > currentLevel.headingNumber) {
      // This is a higher heading number, so start a new level
      const depth = currentLevel.depth + 1;
      const level = {
        depth,
        headingNumber,
        list: createList(heading, depth, options),
      };

      // Add the new list to the previous level's list
      if (currentLevel.list) {
        const lastItem = currentLevel.list.children.slice(-1)[0];
        // should be an Element Node
        if (isElement(lastItem)) {
          lastItem.children.push(level.list);
        }
      }

      levels.push(level);
      currentLevel = level;
    } else {
      if (headingNumber < currentLevel.headingNumber) {
        // This is a lower heading number, so we need to go up to a previous level
        for (let i = levels.length - 2; i >= 0; i--) {
          const level = levels[i];
          if (level.headingNumber === headingNumber) {
            // We found the previous level that matches this heading
            levels = levels.slice(0, i + 1);
            currentLevel = level;
            break;
          }
        }

        // If headings are in an incorrect order, then we may need to adjust the headingNumber
        currentLevel.headingNumber = Math.min(currentLevel.headingNumber, headingNumber);
      }

      // This heading is the same level as the previous heading,
      // so just add another <li> to the same <ol>
      const listItem = createListItem(heading, options);
      if (currentLevel.list) {
        currentLevel.list.children.push(listItem);
      }
    }
  }

  if (levels.length === 0) {
    return createList(undefined, 1, options);
  } else if (levels[0].list) {
    return levels[0].list;
  } else {
    // in case levels[0].list is undefined, which shouldn't happen
    return createList(undefined, 1, options);
  }
}

/**
 * Creates an `<ol>` and `<li>` element for the given heading
 */
function createList(
  heading: HeadingNode | undefined,
  depth: number,
  options: NormalizedOptions,
): Element {
  const list: Element = {
    type: "element",
    tagName: "ol",
    properties: {
      className: options.addClassSuffix.ol
        ? buildClass(options.cssClasses.list, depth)
        : options.cssClasses.list,
    },
    children: [],
  };

  if (heading) {
    const listItem = createListItem(heading, options);
    list.children.push(listItem);
  }

  return list;
}

/**
 * Creates an `<li>` element for the given heading
 */
function createListItem(heading: HeadingNode, options: NormalizedOptions): Element {
  return {
    type: "element",
    tagName: "li",
    data: {
      hookArgs: [heading],
    },
    properties: {
      className: options.addClassSuffix.li
        ? buildClass(options.cssClasses.listItem, heading.tagName)
        : options.cssClasses.listItem,
    },
    children: [
      {
        type: "element",
        tagName: "a",
        properties: {
          className: options.addClassSuffix.a
            ? buildClass(options.cssClasses.link, heading.tagName)
            : options.cssClasses.link,
          href: `#${heading.properties.id ?? ""}`,
        },
        children: [
          {
            type: "text",
            value: getInnerText(heading),
          },
        ],
      },
    ],
  };
}
