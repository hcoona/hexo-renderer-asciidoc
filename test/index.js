'use strict';

const entities = require('entities');
const should = require('chai').should(); // eslint-disable-line

describe('Asciidoc renderer', () => {
  const r = require('../lib/renderer');

  it('header', () => {
    const body = `
== Test H2 ==
`;
    const result = r({ text: body }, {});

    result.should.eql(`<div class="sect1">
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
    const result = r({ text: body }, {});

    entities.decodeHTML(result).should.eql(entities.decodeHTML(`<div class="listingblock">
<div class="content">
<pre><code class="highlight ruby"><span class="keyword">require</span> <span class="string">'sinatra'</span>

get <span class="string">'/hi'</span> <span class="keyword">do</span>
  <span class="string">"Hello World!"</span>
<span class="keyword">end</span></code></pre>
</div>
</div>`));
  });
});
