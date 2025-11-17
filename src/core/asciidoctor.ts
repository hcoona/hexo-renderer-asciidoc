/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import type { Asciidoctor, ProcessorOptions } from 'asciidoctor';
import asciidoctorFactory from 'asciidoctor';

const asciidoctor = asciidoctorFactory();

export type AsciiDocOptions = ProcessorOptions;

const DEFAULT_OPTIONS = Object.freeze({
  doctype: 'article',
  safe: 'server',
  attributes: ['source-highlighter=html-pipeline'],
} satisfies AsciiDocOptions);

/**
 * Canonical Asciidoctor options used when callers do not supply overrides.
 * Exposed mainly for testing and advanced customization.
 */
export const ASCIIDOCTOR_DEFAULT_OPTIONS = DEFAULT_OPTIONS;

/**
 * Convert a chunk of AsciiDoc text into HTML using the shared Asciidoctor instance.
 * The provided options override the default configuration on a per-call basis.
 *
 * @param text - Raw AsciiDoc document body.
 * @param options - Optional overrides merged with {@link ASCIIDOCTOR_DEFAULT_OPTIONS}.
 * @returns The rendered HTML string produced by Asciidoctor.
 */
export const convertAsciiDoc = (text: string, options?: AsciiDocOptions): string => {
  const mergedOptions = options ? { ...DEFAULT_OPTIONS, ...options } : DEFAULT_OPTIONS;
  return asciidoctor.convert(text, mergedOptions) as string;
};

/**
 * Access the lazily created Asciidoctor runtime instance for low-level integrations.
 *
 * @returns The singleton Asciidoctor JS runtime used throughout the plugin.
 */
export const getAsciidoctor = (): Asciidoctor => asciidoctor;
