'use strict'

var entities = require('entities');
var util = require('hexo-util');
var cheerio = require('cheerio');
var asciidoctor = require('asciidoctor.js')();

var options = {
  autoDetect: false,
  lang: 'plain',
  gutter: false,
  wrap: false
};

var cheerio_load_option = {
  decodeEntities: false
};

var asciidoc_options = {
  doctype: 'book'
};

function renderer(data, locals) {
  var html = asciidoctor.convert(data.text);
  var $ = cheerio.load(html, cheerio_load_option);

  $('.highlight code').each(function(index, elem) {
    options.lang = elem.attribs['data-lang'];
    var code = entities.decodeXML($(elem).text());
    var content = util.highlight(code, options);
    $(elem).html(content);
  });

  return $.html()
             .replace(/{/g, '&#123;')
             .replace(/}/g, '&#125;');
}

hexo.extend.renderer.register('ad', 'html', renderer, true);
hexo.extend.renderer.register('adoc', 'html', renderer, true);
hexo.extend.renderer.register('asciidoc', 'html', renderer, true);
