'use strict';

const asciidoctor = require('asciidoctor')();
const entities = require('entities');
const util = require('hexo-util');
const cheerio = require('cheerio');

const options = {
  autoDetect: false,
  lang: 'plain',
  gutter: false,
  wrap: false
};

const cheerio_load_option = {
  decodeEntities: false
};

const asciidoc_options = {
  doctype: 'article'
};

function asciidoctorRenderer(data, _locals) {
  const html = asciidoctor.convert(data.text, asciidoc_options);
  const $ = cheerio.load(html, cheerio_load_option);

  $('.highlight code').each((_index, elem) => {
    options.lang = elem.attribs['data-lang'];
    const code = entities.decodeXML($(elem).text());
    const content = util.highlight(code, options);
    $(elem).html(content);
  });

  return $.html()
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;');
}

module.exports = asciidoctorRenderer;
