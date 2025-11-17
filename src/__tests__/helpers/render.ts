/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import type { Renderer, RendererData, RendererLocals } from '../../core/types';
import { createRenderer } from '../../hexo/registerRenderer';

const render = createRenderer() as Renderer;

export const renderAsciiDoc = (text: string, locals: RendererLocals = {}): string => {
  const data: RendererData = { text };
  return render(data, locals);
};
