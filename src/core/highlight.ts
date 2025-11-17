/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

import * as cheerio from 'cheerio';
import { decodeXML } from 'entities';
import hexoUtil from 'hexo-util';

const CHEERIO_LOAD_OPTIONS: cheerio.CheerioParserOptions = Object.freeze({
  decodeEntities: false,
});

const DEFAULT_LANGUAGE = 'plaintext';

interface HighlightBaseOptions {
  autoDetect: boolean;
  gutter: boolean;
  wrap: boolean;
}

const BASE_HIGHLIGHT_OPTIONS: HighlightBaseOptions = Object.freeze({
  autoDetect: false,
  gutter: false,
  wrap: false,
});

const toHighlightLanguage = (language?: string): string => {
  if (typeof language !== 'string' || language.trim().length === 0) {
    return DEFAULT_LANGUAGE;
  }

  return language;
};

/**
 * Replace Asciidoctor's placeholder highlight blocks with Hexo's static highlighter output.
 * Keeps existing HTML structure intact while swapping in `<figure>` markup from `hexo-util`.
 *
 * @param html - HTML string generated directly from Asciidoctor.
 * @returns HTML with code blocks rendered using Hexo's static highlighter.
 */
export const applyStaticHighlighting = (html: string): string => {
  const $ = cheerio.load(html, CHEERIO_LOAD_OPTIONS);

  $('pre.highlight').each((_index, element) => {
    if (element.type !== 'tag') {
      return;
    }

    const codeNode = element.children?.[0];
    if (!codeNode || codeNode.type !== 'tag') {
      return;
    }

    const lang = toHighlightLanguage(codeNode.attribs?.['data-lang']);
    const sourceCodeText = decodeXML($(codeNode).text());
    const highlightOptions = { ...BASE_HIGHLIGHT_OPTIONS, lang };
    const rendered = hexoUtil.highlight(sourceCodeText, highlightOptions);

    $(element).replaceWith(rendered);
  });

  return $.html();
};
