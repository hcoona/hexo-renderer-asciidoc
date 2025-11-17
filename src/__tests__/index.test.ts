/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import * as entities from 'entities';
import { describe, expect, it } from 'vitest';
import { renderAsciiDoc } from './helpers/render';

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

    expect(entities.decodeHTML(result)).toEqual(
      entities.decodeHTML(`<div class="listingblock">
<div class="content">
<pre><code class="highlight ruby"><span class="keyword">require</span> <span class="string">'sinatra'</span>

get <span class="string">'/hi'</span> <span class="keyword">do</span>
  <span class="string">"Hello World!"</span>
<span class="keyword">end</span></code></pre>
</div>
</div>`),
    );
  });
});
