import type { Element } from "hast";

export interface Data {
  hookArgs?: unknown[];
}

/**
 * The `tagName` property of HTML heading nodes
 */
export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * An HTML heading node (i.e. <h1>, <h2>, etc.)
 */
export interface HeadingNode extends Element {
  tagName: HeadingTagName;
}

/**
 * An HTML list node (i.e. <ol> or <ul>)
 */
export interface ListNode extends Element {
  tagName: "ol" | "ul";
}

/**
 * An HTML list item node (i.e. <li>)
 */
export interface ListItemNode extends Element {
  tagName: "li";
}
