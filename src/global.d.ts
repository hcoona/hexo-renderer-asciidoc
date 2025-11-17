/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import type { Hexo } from './types';

declare global {
  const hexo: Hexo;
}

// biome-ignore lint/complexity/noUselessEmptyExport: mark file as a module for the global augmentation above.
export {};
