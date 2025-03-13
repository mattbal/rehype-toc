"use strict";

import toc from "../../";
import unified from "unified";
import parse from "rehype-parse";
import slug from "rehype-slug";
import stringify from "rehype-stringify";

/**
 * Processes the given HTML using Rehype and the TOC plugin
 */
export default async function process(html, { slug: useSlug, ...options } = {}) {
  let processor = unified().use(parse);

  if (useSlug) {
    processor.use(slug);
  }

  processor.use(toc, options);
  processor.use(stringify);

  let file = await processor.process(html);
  return file.contents;
}
