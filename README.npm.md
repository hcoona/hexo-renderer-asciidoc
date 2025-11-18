<!--
 Copyright 2015 Shuai Zhang
 SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
-->

# hexo-renderer-asciidoc

Add native [AsciiDoc](https://asciidoc.org/) rendering to Hexo using [asciidoctor.js](https://www.npmjs.com/package/asciidoctor). The plugin registers itself for `.ad`, `.adoc`, and `.asciidoc` inputs and reuses Hexo’s built-in syntax highlighter so your theme keeps full control over code blocks.

## Requirements

- Node.js 20.19.0 or newer (matches Hexo 8’s baseline)
- Hexo 8.0.0 or newer

## Installation

```bash
npm install hexo-renderer-asciidoc --save
# or
pnpm add hexo-renderer-asciidoc
```

After installing, Hexo picks up the renderer automatically. There is nothing to configure or register manually.

## Usage

1. Drop AsciiDoc sources (e.g., `hello-world.adoc`) anywhere under your Hexo site’s `source/` directory.
2. Keep Hexo’s highlighter enabled in `_config.yml` so AsciiDoc code blocks inherit your theme:

   ```yml
   highlight:
     enable: true
   ```

3. Run `hexo generate`, `hexo server`, or any other Hexo command as usual.

The renderer does not add extra `_config.yml` sections. Feature toggles such as admonitions, callouts, or TOCs are handled directly by standard AsciiDoc attributes in your documents.

### Example site

Need a ready-made playground? Clone the GitHub repository and open `examples/hexo-site`:

```bash
git clone https://github.com/hcoona/hexo-renderer-asciidoc.git
cd examples/hexo-site
pnpm install
pnpm dev
```

That sample Hexo project depends on the local workspace via `link:../..`, so edits to the renderer are reflected immediately. Browse `examples/hexo-site/source/` to see how admonitions, callouts, audio/video embeds, and tables render end-to-end.

## Behavior summary

- Runs Asciidoctor with `doctype: article`, `safe: server`, and `source-highlighter=html-pipeline` so external macros and system calls stay disabled by default.
- Re-renders `<pre class="highlight">` blocks with `hexo-util.highlight`, matching whatever highlighting theme you configure in `_config.yml`.
- Encodes literal `{` / `}` characters to keep Hexo’s Nunjucks renderer from treating output as template placeholders.
- Does **not** sanitize arbitrary HTML. If you accept user-submitted AsciiDoc, run the generated HTML through an additional sanitizer before publishing.

## License

LGPL-3.0-or-later WITH LGPL-3.0-linking-exception. See `COPYING` and `COPYING.LESSER` in the published package for the full terms.
