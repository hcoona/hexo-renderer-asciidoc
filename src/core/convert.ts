/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import asciidoctorFactory from 'asciidoctor';
import * as cheerio from 'cheerio';
import { decodeXML } from 'entities';
import hexoUtil from 'hexo-util';
import type { AsciidocOptions } from './types';

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
  wrap: false,
};

const cheerioLoadOptions = {
  decodeEntities: false,
};

/**
 * Convert AsciiDoc source to HTML
 * @param source AsciiDoc source text
 * @param options Asciidoctor options
 * @returns Rendered HTML string
 */
export function convertAsciidoc(source: string, options: AsciidocOptions): string {
  // Convert AsciiDoc to HTML using Asciidoctor
  const html = asciidoctor.convert(source, options) as string;

  // Load HTML with cheerio for processing
  const $ = cheerio.load(html, cheerioLoadOptions);

  // Process code blocks with Hexo's syntax highlighter
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

  // Escape curly braces to prevent Hexo template conflicts
  return $.html().replace(/{/g, '&#123;').replace(/}/g, '&#125;');
}
