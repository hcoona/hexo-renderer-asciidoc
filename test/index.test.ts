/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import { describe, expect, it } from 'vitest';
import * as entities from 'entities';
import renderer from '../lib/renderer.js';
import type { Renderer, RendererData, RendererLocals } from '../types';

const render = renderer as Renderer;

const renderAsciiDoc = (text: string, locals: RendererLocals = {}): string => {
  const data: RendererData = { text };
  return render(data, locals);
};

describe('Asciidoc renderer', () => {
  it('header', () => {
    const body = `
== Test H2 ==
`;
    const result = renderAsciiDoc(body);

    expect(result).toEqual(`<div class="sect1">
<h2 id="_test_h2">Test H2</h2>
<div class="sectionbody">

</div>
</div>`);
  });

  it('code highlight', () => {
    const body = `
[source,ruby]
----
require 'sinatra'

get '/hi' do
  "Hello World!"
end
----`;
    const result = renderAsciiDoc(body);

    expect(entities.decodeHTML(result)).toEqual(entities.decodeHTML(`<div class="listingblock">
<div class="content">
<pre><code class="highlight ruby"><span class="keyword">require</span> <span class="string">'sinatra'</span>

get <span class="string">'/hi'</span> <span class="keyword">do</span>
  <span class="string">"Hello World!"</span>
<span class="keyword">end</span></code></pre>
</div>
</div>`));
  });
});
