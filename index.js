'use strict'

var util = require('hexo-util');
var cheerio = require('cheerio');
var asciidoctor = require('asciidoctor.js')();
var processor = asciidoctor.Asciidoctor(true);

hexo.extend.renderer.register('adoc', 'html', function(data, locals) {
  var html = processor.$convert(data.text, null);
  var $ = cheerio.load(html);

  $('.highlight code').each(function(index, elem) {
    var result = util.highlight($(elem).text(), {
      lang: elem.attribs['lang-data'],
      gutter: false,
      wrap: false
    });
    $(elem).html(result);
  });

  return $.html();
}, true);

