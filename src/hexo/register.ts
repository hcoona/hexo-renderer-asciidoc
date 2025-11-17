/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import renderer from '../core/renderer';
import type { Hexo } from '../types';

const SUPPORTED_EXTENSIONS = ['ad', 'adoc', 'asciidoc'] as const;
const OUTPUT_FORMAT = 'html';
const IS_SYNC = true;

/**
 * Wire the shared renderer into a Hexo instance for all supported AsciiDoc extensions.
 *
 * @param instance - Hexo runtime whose renderer registry will be extended.
 * @returns void
 */
const registerRenderer = (instance: Hexo): void => {
  for (const extension of SUPPORTED_EXTENSIONS) {
    instance.extend.renderer.register(extension, OUTPUT_FORMAT, renderer, IS_SYNC);
  }
};

export default registerRenderer;
