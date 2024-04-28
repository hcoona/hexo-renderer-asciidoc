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
  doctype: 'article',
  safe: 'server',
  attributes: [
    'source-highlighter=html-pipeline'
  ]
};

function asciidoctorRenderer(data, _locals) {
  const html = asciidoctor.convert(data.text, asciidoc_options);
  const $ = cheerio.load(html, cheerio_load_option);

  $('pre.highlight').each((_index, elem) => {
    const codeNode = elem.childNodes[0];
    options.lang = codeNode.attribs['data-lang'];
    const sourceCodeText = entities.decodeXML($(codeNode).text());
    const content = util.highlight(sourceCodeText, options);
    $(elem).replaceWith(content);
  });

  return $.html()
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;');
}

module.exports = asciidoctorRenderer;
