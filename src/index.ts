/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import renderer from './core/renderer';
import registerRenderer from './hexo/register';

if (typeof hexo !== 'undefined' && hexo?.extend?.renderer) {
  registerRenderer(hexo);
}

export { registerRenderer, renderer };
export type { Hexo, Renderer, RendererData, RendererLocals } from './types';
export default renderer;
