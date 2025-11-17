/**
 * Copyright 2015 Shuai Zhang
 * SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
 */

/// <reference types="node" />

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { renderAsciiDoc } from '../helpers/render';

type DocTestExample = {
  name: string;
  content: string;
};

const fixturesDir = path.join(__dirname, 'examples', 'asciidoc');

const normalizeHtml = (html: string): string => html.replace(/\r\n/g, '\n').trimEnd();

const parseExamples = (source: string): DocTestExample[] => {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const examples: DocTestExample[] = [];
  let currentName: string | null = null;
  let bodyLines: string[] = [];
  let bodyStarted = false;

  const flush = () => {
    if (!currentName) {
      bodyLines = [];
      bodyStarted = false;
      return;
    }

    while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === '') {
      bodyLines.pop();
    }

    const content = bodyLines.join('\n');
    examples.push({ name: currentName, content });
    currentName = null;
    bodyLines = [];
    bodyStarted = false;
  };

  for (const line of lines) {
    if (line.startsWith('// .')) {
      flush();
      currentName = line.slice(4).trim();
      continue;
    }

    if (!currentName) {
      continue;
    }

    if (!bodyStarted) {
      if (line.startsWith('//')) {
        continue;
      }

      bodyStarted = true;
    }

    bodyLines.push(line);
  }

  flush();

  return examples;
};

export const registerDocTestGroup = (group: string): void => {
  const filePath = path.join(fixturesDir, `${group}.adoc`);
  const source = readFileSync(filePath, 'utf8');
  const examples = parseExamples(source);

  describe(`DocTest:${group}`, () => {
    for (const example of examples) {
      it(example.name, () => {
        const actual = renderAsciiDoc(example.content);
        expect(normalizeHtml(actual)).toMatchSnapshot();
      });
    }
  });
};
