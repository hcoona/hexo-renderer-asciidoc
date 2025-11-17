<!--
 Copyright 2015 Shuai Zhang
 SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
-->

# Example Hexo site for `hexo-renderer-asciidoc`

This folder contains a self-contained Hexo site that consumes the local
`hexo-renderer-asciidoc` package via a link dependency. Use it to test the
renderer end-to-end without publishing to npm. It is **not** part of the root
pnpm workspace so that its Hexo dependencies stay isolated—always run pnpm
commands from inside `examples/hexo-site`.

## Prerequisites

- Node.js 20.19.0 or newer (matching the main project requirements)
- pnpm 10.x (already pinned in the repo)

## Usage

Install dependencies and start the Hexo server from inside this folder:

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:4000> to browse the site rendered from AsciiDoc
sources. Modify the posts under `source/_posts/*.adoc` to experiment with
renderer features.

To generate the static site without running a server:

```bash
pnpm generate
```

## Structure

- `_config.yml` – Minimal Hexo configuration with the stock `landscape` theme
  and Hexo's built-in highlighter enabled. No extra AsciiDoc overrides are
  declared so the sample stays truthful to the renderer's defaults.
- `source/_posts/` – Sample AsciiDoc posts referenced on the home page.
- `source/about/` – Example standalone page describing how the demo links to
  the local renderer build.
- `pnpm-workspace.yaml` / `pnpm-lock.yaml` – Tiny helper files that force pnpm
  to treat this folder as its own workspace and capture the resolved Hexo
  dependency tree. Keep them checked in so `pnpm install` remains local.

All Markup content uses the `.adoc` extension so Hexo routes every page
through `hexo-renderer-asciidoc`.
