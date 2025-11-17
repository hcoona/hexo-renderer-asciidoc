/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'cjs',
  dts: true,
  sourcemap: true,
  target: 'node20',
  outDir: 'dist',
  clean: true,
  external: ['asciidoctor', 'cheerio', 'entities', 'hexo-util'],
  fixedExtension: false,
});
