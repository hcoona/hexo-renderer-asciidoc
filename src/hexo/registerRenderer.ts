/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import { convertAsciidoc } from '../core/convert';
import { normalizeOptions } from '../core/options';
import type { Renderer } from '../core/types';
import type { Hexo } from '../types';

/**
 * Create a renderer function for Hexo
 * @returns Hexo renderer function
 */
export function createRenderer(): Renderer {
  return (data, locals) => {
    // Get Hexo config from locals if available
    // biome-ignore lint/suspicious/noExplicitAny: Hexo's locals structure is not typed
    const hexoConfig = (locals as any)?._context?.config?.asciidoc ?? {};
    const normalized = normalizeOptions({}, hexoConfig);

    return convertAsciidoc(data.text, normalized);
  };
}

/**
 * Register AsciiDoc renderer with Hexo
 * @param hexo Hexo instance
 */
export function registerAsciidocRenderer(hexo: Hexo): void {
  const renderer = createRenderer();

  // Register for multiple file extensions
  hexo.extend.renderer.register('ad', 'html', renderer, true);
  hexo.extend.renderer.register('adoc', 'html', renderer, true);
  hexo.extend.renderer.register('asciidoc', 'html', renderer, true);
}
