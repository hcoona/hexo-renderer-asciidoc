'use strict'

var util = require('hexo-util');
var cheerio = require('cheerio');
var asciidoctor = require('asciidoctor.js')();
var processor = asciidoctor.Asciidoctor(true);

var options = {
  auto_detect: false,
  lang: 'plain',
  gutter: false,
  wrap: false
};

var cheerio_load_option = {
  decodeEntities: false
};

hexo.extend.renderer.register('adoc', 'html', function(data, locals) {
  var html = processor.$convert(data.text, null);
  var $ = cheerio.load(html, cheerio_load_option);

  $('.highlight code').each(function(index, elem) {
    options.lang = elem.attribs['data-lang'];
    var content = util.highlight($(elem).text(), options);
    $(elem).html(content);
  });

  return $.html()
             .replace(/{/g, '&#123;')
             .replace(/}/g, '&#125;');
}, true);

