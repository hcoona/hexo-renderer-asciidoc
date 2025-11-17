/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import { createRenderer, registerAsciidocRenderer } from './hexo/registerRenderer';

// Auto-register if hexo global is available (backwards compatibility)
if (typeof hexo !== 'undefined' && hexo?.extend?.renderer) {
  registerAsciidocRenderer(hexo);
}

// Export for programmatic use
export { registerAsciidocRenderer, createRenderer };
export type { AsciidocOptions, Renderer, RendererData, RendererLocals } from './core/types';
export type { Hexo } from './types';

// Default export for CommonJS compatibility
const renderer = createRenderer();
export default renderer;
