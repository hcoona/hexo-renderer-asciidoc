'use strict'

var asciidoctor = require('asciidoctor.js')();
var processor = asciidoctor.Asciidoctor(true);

hexo.extend.renderer.register('adoc', 'html', function(data, locals) {
  return processor.$convert(data.text, null);
}, true);

