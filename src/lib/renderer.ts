/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import asciidoctorFactory from 'asciidoctor';
import { decodeXML } from 'entities';
import * as cheerio from 'cheerio';
import hexoUtil from 'hexo-util';
import type { Renderer } from '../types';

const asciidoctor = asciidoctorFactory();

interface HighlightOptions {
  autoDetect: boolean;
  lang: string;
  gutter: boolean;
  wrap: boolean;
}

const highlightOptions: HighlightOptions = {
  autoDetect: false,
  lang: 'plaintext',
  gutter: false,
  wrap: false
};

const cheerioLoadOptions = {
  decodeEntities: false
};

const asciidocOptions = {
  doctype: 'article',
  safe: 'server',
  attributes: ['source-highlighter=html-pipeline']
} as const;

const asciidoctorRenderer: Renderer = (data) => {
  const html = asciidoctor.convert(data.text, asciidocOptions) as string;
  const $ = cheerio.load(html, cheerioLoadOptions);

  $('pre.highlight').each((_index: number, elem: cheerio.Element) => {
    if (elem.type !== 'tag') {
      return;
    }

    const codeNode = elem.children?.[0];
    if (!codeNode || codeNode.type !== 'tag') {
      return;
    }

    const language = codeNode.attribs?.['data-lang'];
    highlightOptions.lang = typeof language === 'string' ? language : 'plaintext';

    const sourceCodeText = decodeXML($(codeNode).text());
    const content = hexoUtil.highlight(sourceCodeText, highlightOptions);
    $(elem).replaceWith(content);
  });

  return $.html().replace(/{/g, '&#123;').replace(/}/g, '&#125;');
};

export default asciidoctorRenderer;
