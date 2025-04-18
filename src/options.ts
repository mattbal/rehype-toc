import { CustomizationHook } from "./customization-hooks.js";
import { HeadingTagName, ListItemNode } from "./types.js";
import type { Element, ElementContent } from "hast";

/**
 * The different positions at which the table of contents can be inserted,
 * relative to the `<main>` element.
 */
export type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";

/**
 * Options for the Rehype TOC plugin
 */
export interface Options {
  /**
   * Determines whether the table of contents is wrapped in a `<nav>` element.
   *
   * Defaults to `true`.
   */
  nav?: boolean;

  /**
   * The position at which the table of contents should be inserted, relative to the `<main>`
   * element.
   *
   * Defaults to "afterbegin";
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
   */
  position?: InsertPosition;

  /**
   * HTML heading elements to include in the table of contents.
   *
   * Defaults to all headings ("h1" through "h6").
   */
  headings?: HeadingTagName[];

  /**
   * CSS class names for various parts of the table of contents.
   */
  cssClasses?: CssClasses;

  /**
   * If true, the elements in the table of contents will have a suffix appended to their class name. E.g., a generated `<li class="toc-item">` will become `<li class="toc-item toc-item-h1">`, which will allow you to apply different CSS styling depending on the element's depth level.
   *
   * To add the suffix, under the hood, rehype-toc duplicates the element's class name and appends the suffix at the end of the class name. So, if you plan on using a custom class name for an element with multiple classes in it like `cssClasses: { listItem: "toc-item focused semibold"}`, make sure to set `addClassSuffix` to false, otherwise, your multiple class names will be unnecessarily duplicated like so: `toc-item focused semibold toc-item focused semibold-h2`
   *
   * Defaults to `true`.
   */
  addClassSuffix?: boolean;

  /**
   * Allows you to customize the table of contents before it is added to the page.
   *
   * @param toc - The table of contents HAST node tree
   * @returns - Return the modified node, a new node to replace it with, or `undefined` to use the
   * existing node. You can return a falsy value to prevent the table of contents from being added
   * to the page.
   */
  customizeTOC?(toc: Element): ElementContent | boolean | undefined;

  /**
   * Allows you to customize an item before it is added to the table of contents.
   *
   * @param tocItem - A HAST node tree containing an `<li>` and `<a>`
   * @param heading - The original heading (e.g. `<h1>`, `<h2>`, etc.) that `tocItem` is a referene to
   *
   * @returns - Return the modified node, a new node to replace it with, or `undefined` to use the
   * existing node. You can return a falsy value to prevent the item from being added to the
   * table of contents.
   */
  customizeTOCItem?(tocItem: ListItemNode, heading: Element): ElementContent | boolean | undefined;
}

/**
 * CSS class names for various parts of the table of contents.
 */
export interface CssClasses {
  /**
   * The CSS class name for the top-level `<nav>` or `<ol>` element that contains the whole table of contents.
   *
   * Defaults to "toc".
   */
  toc?: string;

  /**
   * The CSS class name for all `<ol>` elements in the table of contents, including the top-level one.
   *
   * Defaults to "toc-level", which also adds "toc-level-1", "toc-level-2", etc.
   */
  list?: string;

  /**
   * The CSS class name for all `<li>` elements in the table of contents.
   *
   * Defaults to "toc-item", which also adds "toc-item-h1", "toc-item-h2", etc.
   */
  listItem?: string;

  /**
   * The CSS class name for all `<a>` elements in the table of contents.
   *
   * Defaults to "toc-link", which also adds "toc-link-h1", "toc-link-h2", etc.
   */
  link?: string;
}

/**
 * Normalized, sanitized, and complete settings,
 * with default values for anything that wasn't specified by the caller.
 */
export class NormalizedOptions {
  public readonly nav: boolean;
  public readonly position: InsertPosition;
  public readonly headings: HeadingTagName[];
  public readonly cssClasses: Required<CssClasses>;
  public readonly addClassSuffix: boolean;
  public readonly customizeTOC?: CustomizationHook;
  public readonly customizeTOCItem?: CustomizationHook;

  /**
   * Applies default values for any unspecified options
   */
  public constructor(options: Options = {}) {
    const cssClasses = options.cssClasses ?? {};

    this.nav = options.nav === undefined ? true : Boolean(options.nav);
    this.position = options.position ?? "afterbegin";
    this.headings = options.headings ?? ["h1", "h2", "h3", "h4", "h5", "h6"];
    this.cssClasses = {
      toc: cssClasses.toc === undefined ? "toc" : cssClasses.toc,
      list: cssClasses.list === undefined ? "toc-level" : cssClasses.list,
      listItem: cssClasses.listItem === undefined ? "toc-item" : cssClasses.listItem,
      link: cssClasses.link === undefined ? "toc-link" : cssClasses.link,
    };
    this.addClassSuffix =
      options.addClassSuffix === undefined ? true : Boolean(options.addClassSuffix);
    this.customizeTOC = options.customizeTOC;
    this.customizeTOCItem = options.customizeTOCItem;
  }
}

/**
 * Builds a CSS class string from the given user-defined class name
 */
export function buildClass(name: string, suffix: string | number): string | undefined {
  if (name) {
    let cssClass = name;

    if (suffix) {
      cssClass += ` ${name}-${suffix}`;
    }

    return cssClass;
  }
}
