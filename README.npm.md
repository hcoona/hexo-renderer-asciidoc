<!--
 Copyright 2015 Shuai Zhang
 SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
-->

# Asciidoc Renderer for Hexo

Add Asciidoc support to Hexo. This plugin uses [asciidoctor.js](https://www.npmjs.com/package/asciidoctor.js) as the
rendering engine.

## Install

```bash
npm install hexo-renderer-asciidoc --save
```

## Usage

Once installed, Hexo will automatically pick up `.adoc` / `.asciidoc` files and render them via Asciidoctor. Make sure
that `hexo-renderer-asciidoc` is listed in your Hexo site's `package.json` dependencies.

For Hexo configuration options, refer to the official Hexo documentation. This renderer does not add new top-level
configuration keys; it simply plugs Asciidoc into Hexo's normal rendering pipeline.

## Development notes

This README is tailored for npm consumers. For details about local development (toolchain, tests, linting, release
flow, etc.), see the repository root `README.md` on GitHub.

## License

Licensed under the LGPL-3.0-or-later WITH LGPL-3.0-linking-exception. See `COPYING` and `COPYING.LESSER` for details.
