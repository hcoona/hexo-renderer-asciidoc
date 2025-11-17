/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import type { Renderer } from './core/types';

/**
 * Hexo renderer extension interface
 */
export interface RendererExtension {
  register(name: string, output: string, fn: Renderer, sync?: boolean): void;
}

/**
 * Hexo instance interface
 */
export interface Hexo {
  extend: {
    renderer: RendererExtension;
  };
  config: Record<string, unknown>;
}
