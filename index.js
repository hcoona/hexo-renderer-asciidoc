/* global hexo */

'use strict';

const renderer = require('./lib/renderer');

hexo.extend.renderer.register('ad', 'html', renderer, true);
hexo.extend.renderer.register('adoc', 'html', renderer, true);
hexo.extend.renderer.register('asciidoc', 'html', renderer, true);
