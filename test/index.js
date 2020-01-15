'use strict';

var should = require('chai').should(); // eslint-disable-line

describe('Asciidoc renderer', function() {
  var r = require('../lib/renderer');

  it('header', function() {
    var body = `
== Test H2 ==
`;
    var result = r({text: body}, {});

    result.should.eql(`<div class="sect1">
<h2 id="_test_h2">Test H2</h2>
<div class="sectionbody">

</div>
</div>`);
  });

  it('code highlight', function() {
    var body = `
[source,ruby]
----
require 'sinatra'

get '/hi' do
  "Hello World!"
end
----`;
    var result = r({text: body}, {});

    result.should.eql(`<div class="listingblock">
<div class="content">
<pre class="highlight"><code class="language-ruby" data-lang="ruby"><pre><code class="highlight ruby"><span class="keyword">require</span> <span class="string">'sinatra'</span>

get <span class="string">'/hi'</span> <span class="keyword">do</span>
  <span class="string">"Hello World!"</span>
<span class="keyword">end</span></code></pre></code></pre>
</div>
</div>`);
  });
});
