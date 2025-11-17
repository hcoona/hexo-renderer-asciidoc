/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import renderer from './lib/renderer';
import type { Hexo } from './types';

const registerRenderer = (instance: Hexo): void => {
  instance.extend.renderer.register('ad', 'html', renderer, true);
  instance.extend.renderer.register('adoc', 'html', renderer, true);
  instance.extend.renderer.register('asciidoc', 'html', renderer, true);
};

if (typeof hexo !== 'undefined' && hexo?.extend?.renderer) {
  registerRenderer(hexo);
}

export { registerRenderer, renderer };
export type { Hexo } from './types';
export type { Renderer, RendererData, RendererLocals } from './types';
export default renderer;
