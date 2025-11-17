/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

declare namespace HexoRendererAsciidoc {
  interface RendererData {
    /** Absolute or relative path to the file being rendered, if available. */
    path?: string | null;
    /** Raw AsciiDoc content provided by Hexo. */
    text: string;
  }

  type RendererLocals = Record<string, unknown>;

  type Renderer = (data: RendererData, locals?: RendererLocals) => string;

  interface RendererExtension {
    register(name: string, output: string, fn: Renderer, sync?: boolean): void;
  }

  interface Hexo {
    extend: {
      renderer: RendererExtension;
    };
    config: Record<string, unknown>;
  }
}

export type RendererData = HexoRendererAsciidoc.RendererData;
export type RendererLocals = HexoRendererAsciidoc.RendererLocals;
export type Renderer = HexoRendererAsciidoc.Renderer;
export type Hexo = HexoRendererAsciidoc.Hexo;

declare global {
  const hexo: HexoRendererAsciidoc.Hexo;
}

declare module 'hexo-renderer-asciidoc/lib/renderer' {
  const renderer: HexoRendererAsciidoc.Renderer;
  export = renderer;
}

export {};
