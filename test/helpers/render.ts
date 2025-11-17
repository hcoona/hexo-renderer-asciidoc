/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import renderer from '../../src/core/renderer';
import type { Renderer, RendererData, RendererLocals } from '../../src/types';

const render = renderer as Renderer;

/**
 * Convenience helper used by tests to feed raw AsciiDoc text through the renderer pipeline.
 *
 * @param text - Plain AsciiDoc sample used in assertions.
 * @param locals - Additional Hexo locals passed to the renderer.
 * @returns Rendered HTML string.
 */
export const renderAsciiDoc = (text: string, locals: RendererLocals = {}): string => {
  const data: RendererData = { text };
  return render(data, locals);
};
