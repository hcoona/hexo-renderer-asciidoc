/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import type { AsciidocOptions } from './types';

/**
 * Normalize and merge AsciiDoc options from multiple sources
 * @param localOptions Options passed directly to the renderer
 * @param hexoConfig Global config from Hexo's _config.yml
 * @returns Normalized options for Asciidoctor
 */
export function normalizeOptions(localOptions: unknown, hexoConfig: unknown): AsciidocOptions {
  const result: AsciidocOptions = {
    doctype: 'article',
    safe: 'server',
    attributes: ['source-highlighter=html-pipeline'],
  };

  const merge = (obj: unknown) => {
    if (!obj || typeof obj !== 'object') return;
    const o = obj as Record<string, unknown>;

    if (typeof o.doctype === 'string') {
      result.doctype = o.doctype;
    }
    if (typeof o.safe === 'string') {
      result.safe = o.safe;
    }
    if (typeof o.backend === 'string') {
      result.backend = o.backend;
    }
    if (o.attributes) {
      if (Array.isArray(o.attributes)) {
        result.attributes = o.attributes as string[];
      } else if (typeof o.attributes === 'object') {
        result.attributes = o.attributes as Record<string, string | number | boolean>;
      }
    }
  };

  // Merge hexo config first, then local options (local overrides global)
  merge(hexoConfig);
  merge(localOptions);

  return result;
}
