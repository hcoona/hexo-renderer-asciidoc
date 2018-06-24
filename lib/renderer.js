'use strict';

var asciidoctor = require('asciidoctor.js')();
var entities = require('entities');
var util = require('hexo-util');
var cheerio = require('cheerio');

var options = {
  autoDetect: false,
  lang: 'plain',
  gutter: false,
  wrap: false
};

var cheerio_load_option = {
  decodeEntities: false
};

var asciidoc_options = {doctype: 'docbook'};

function asciidoctorRenderer(data, locals) {
  var html = asciidoctor.convert(data.text, asciidoc_options);
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

module.exports = asciidoctorRenderer;
