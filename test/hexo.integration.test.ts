/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import Hexo from 'hexo';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import registerRenderer from '../src/hexo/register';
import type { Hexo as HexoContract } from '../src/types';

const HEXO_ENGINE = 'adoc';

type HexoRenderAPI = {
  render(data: Record<string, unknown>, locals?: Record<string, unknown>): Promise<string>;
};

type HexoTestInstance = HexoContract & {
  base_dir: string;
  render: HexoRenderAPI;
  init(): Promise<void>;
  exit(err?: unknown): Promise<void>;
};

type HexoConstructor = new (baseDir: string, options?: Record<string, unknown>) => HexoTestInstance;

const HexoClass = Hexo as unknown as HexoConstructor;

const createHexoWorkspace = (): string => {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'hexo-renderer-asciidoc-e2e-'));
  writeFileSync(path.join(tempDir, '_config.yml'), 'title: hexo-renderer-asciidoc\n');
  return tempDir;
};

describe('Hexo integration', () => {
  let hexoInstance: HexoTestInstance;
  let disposeWorkspace: (() => void) | undefined;

  beforeAll(async () => {
    const baseDir = createHexoWorkspace();
    disposeWorkspace = () => rmSync(baseDir, { recursive: true, force: true });

    hexoInstance = new HexoClass(baseDir, { silent: true, debug: false });
    registerRenderer(hexoInstance);
    await hexoInstance.init();
  });

  afterAll(async () => {
    if (hexoInstance) {
      await hexoInstance.exit();
    }

    disposeWorkspace?.();
  });

  it('renders AsciiDoc via Hexo render pipeline', async () => {
    const html = await hexoInstance.render.render({ text: '== Hexo Integration ==', engine: HEXO_ENGINE });

    expect(html).toContain('<h2 id="_hexo_integration">Hexo Integration</h2>');
  });
});
