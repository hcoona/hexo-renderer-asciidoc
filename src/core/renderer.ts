/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import type { Renderer } from '../types';
import { convertAsciiDoc } from './asciidoctor';
import { applyStaticHighlighting } from './highlight';
import { escapeCurlyBraces } from './sanitize';

/**
 * Full rendering pipeline: convert AsciiDoc to HTML, re-run syntax highlighting,
 * and escape delimiters so the output can be safely fed back into Hexo.
 *
 * @param data - Hexo renderer payload containing the AsciiDoc body.
 * @returns Final HTML string ready to be returned to Hexo.
 */
const asciidoctorRenderer: Renderer = (data) => {
  const html = convertAsciiDoc(data.text);

  const highlighted = applyStaticHighlighting(html);

  // Escape curly braces to prevent Hexo template conflicts
  return escapeCurlyBraces(highlighted);
};

export default asciidoctorRenderer;
