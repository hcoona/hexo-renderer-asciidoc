/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import * as hexoUtil from 'hexo-util';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { applyStaticHighlighting } from '../src/core/highlight';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('applyStaticHighlighting', () => {
  it('decodes escaped code text before invoking hexo highlighter', () => {
    const highlightResult = '<figure class="highlight"></figure>';
    const highlightMock = vi.spyOn(hexoUtil, 'highlight').mockReturnValue(highlightResult);

    const html = `<div class="listingblock">
<div class="content">
<pre class="highlight"><code data-lang="xml">&lt;div class=&quot;test&quot;&gt;AT&amp;T&lt;/div&gt;</code></pre>
</div>
</div>`;

    const result = applyStaticHighlighting(html);

    expect(highlightMock).toHaveBeenCalledTimes(1);
    const callArgs = highlightMock.mock.calls[0];
    expect(callArgs).toBeDefined();
    if (!callArgs) {
      throw new Error('Expected hexoUtil.highlight to be called at least once');
    }

    const [source, options] = callArgs;
    expect(source).toBe('<div class="test">AT&T</div>');
    expect(options).toBeDefined();
    expect(options?.lang).toBe('xml');
    expect(result).toContain(highlightResult);
  });
});
