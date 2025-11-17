/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

export interface RendererData {
  /** Absolute or relative path to the file being rendered, if available. */
  path?: string | null;
  /** Raw AsciiDoc content provided by Hexo. */
  text: string;
}

export type RendererLocals = Record<string, unknown>;

export type Renderer = (data: RendererData, locals?: RendererLocals) => string;

export interface RendererExtension {
  register(name: string, output: string, fn: Renderer, sync?: boolean): void;
}

export interface Hexo {
  extend: {
    renderer: RendererExtension;
  };
  config: Record<string, unknown>;
}
