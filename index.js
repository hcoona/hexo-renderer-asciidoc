'use strict'

var util = require('hexo-util');
var cheerio = require('cheerio');
var asciidoctor = require('asciidoctor.js')();
var processor = asciidoctor.Asciidoctor(true);

var options = {
  lang: 'plain',
  gutter: false,
  wrap: false
};

hexo.extend.renderer.register('adoc', 'html', function(data, locals) {
  var html = processor.$convert(data.text, null);
  var $ = cheerio.load(html);

  $('.highlight code').each(function(index, elem) {
    options.lang = elem.attribs['lang-data'];
    var result = util.highlight($(elem).text(), options);
    $(elem).html(result);
  });

  return $.html()
             .replace(/{/g, '&#123;')
             .replace(/}/g, '&#125;');
}, true);

