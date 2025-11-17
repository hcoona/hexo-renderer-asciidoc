/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

/**
 * Configuration options for AsciiDoc rendering
 */
export interface AsciidocOptions {
  /** Document type (article, book, manpage, inline) */
  doctype?: string;
  /** Safe mode for processing (unsafe, safe, server, secure) */
  safe?: string;
  /** Asciidoctor attributes to apply during conversion */
  attributes?: string[] | Record<string, string | number | boolean>;
  /** Backend to use for rendering (html5, etc) */
  backend?: string;
}

/**
 * Hexo's renderer data interface
 */
export interface RendererData {
  /** Absolute or relative path to the file being rendered, if available. */
  path?: string | null;
  /** Raw AsciiDoc content provided by Hexo. */
  text: string;
}

/**
 * Hexo's locals data passed to renderer
 */
export type RendererLocals = Record<string, unknown>;

/**
 * Hexo renderer function signature
 */
export type Renderer = (data: RendererData, locals?: RendererLocals) => string;
