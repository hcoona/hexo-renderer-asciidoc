/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

const CURLY_OPEN = /\{/g;
const CURLY_CLOSE = /\}/g;

/**
 * Encode curly braces so that Hexo's template renderer does not treat the HTML output as placeholders.
 *
 * @param html - HTML snippet that may contain literal `{` or `}` characters.
 * @returns Safe HTML string with braces encoded as entities.
 */
export const escapeCurlyBraces = (html: string): string =>
  html.replace(CURLY_OPEN, '&#123;').replace(CURLY_CLOSE, '&#125;');
