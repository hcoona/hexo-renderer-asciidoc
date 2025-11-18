<!--
 Copyright 2015 Shuai Zhang
 SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
-->

# hexo-renderer-asciidoc

[![CI](https://github.com/hcoona/hexo-renderer-asciidoc/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/hcoona/hexo-renderer-asciidoc/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/hexo-renderer-asciidoc.svg?logo=npm)](https://www.npmjs.com/package/hexo-renderer-asciidoc)
[![Node support](https://img.shields.io/node/v/hexo-renderer-asciidoc.svg?logo=node.js)](package.json)
[![License: LGPL-3.0-or-later](https://img.shields.io/badge/license-LGPL--3.0--or--later-0a76d5.svg)](LICENSE)

Add first-class [AsciiDoc](https://asciidoc.org/) support to Hexo. The renderer piggybacks on [asciidoctor.js](https://www.npmjs.com/package/asciidoctor) 3.x, swaps Asciidoctor’s code blocks with Hexo’s static highlighter, and escapes template delimiters so the resulting HTML can flow back through Hexo safely.

## Security defaults

- The renderer runs Asciidoctor in `safe: 'server'` mode, which blocks shelling out and limits file access to the site root.
- Output HTML is **not** sanitized beyond encoding `{` / `}`; treat your AsciiDoc sources as trusted or run Hexo through an additional sanitizer (DOMPurify, OWASP Java HTML Sanitizer, etc.) before publishing user-generated content.
- Code blocks are re-highlighted via `hexo-util` so they inherit whatever theme/config you enable in `_config.yml`.

## Requirements & installation

| Dependency | Minimum version |
| ---------- | --------------- |
| Node.js    | 20.19.0         |
| Hexo       | 8.0.0           |

Install from npm (choose the package manager that matches your Hexo project):

```bash
npm install hexo-renderer-asciidoc --save
# or
pnpm add hexo-renderer-asciidoc
```

Once installed, Hexo automatically pipes `.ad`, `.adoc`, and `.asciidoc` files through this renderer, no extra glue code is required.

### Minimal Hexo configuration

AsciiDoc posts reuse Hexo’s regular highlighting settings. A typical `_config.yml` looks like this:

```yml
highlight:
  enable: true
  line_number: false
  wrap: false
```

Keep `highlight.enable` turned on even if you never write Markdown; the renderer calls the same helper under the hood to keep code blocks consistent with the theme.

## Example Hexo site

A self-contained demo lives at `examples/hexo-site`. It links to the local workspace via `link:../..`, so every change you make to the renderer is reflected instantly.

```bash
cd examples/hexo-site
pnpm install
pnpm dev
```

> [!NOTE]
> The sample site is intentionally outside the root pnpm workspace. Always run pnpm commands from inside `examples/hexo-site` so Hexo’s dependencies stay isolated. Its `pnpm-workspace.yaml` and lockfile must remain in that folder when you copy the demo elsewhere.

Browse `examples/hexo-site/source/` for end-to-end samples of admonitions, callouts, audio/video embeds, and other constructs covered by the test suite.

## Feature highlights

- **AsciiDoc parity.** Snapshot-style doctests (`test/doctest/*.test.ts`) mirror sections from the Asciidoctor user manual so features such as admonitions, description lists, colists, inline UI macros, and complex tables stay stable between releases.
- **Zero-config Hexo integration.** `src/hexo/register.ts` wires the renderer for `.ad`, `.adoc`, and `.asciidoc` extensions with synchronous semantics so Hexo’s asset pipeline can stream results as soon as they are available.
- **Static highlighting bridge.** `src/core/highlight.ts` walks every `<pre class="highlight">` block produced by Asciidoctor and re-renders it with `hexo-util.highlight`, ensuring your Hexo theme powers the final markup (including languages not known to Asciidoctor’s built-in highlighters).
- **Template safety.** `src/core/sanitize.ts` encodes `{` / `}` characters before returning control to Hexo so they are not interpreted as Nunjucks placeholders.
- **Tested in Hexo.** `test/hexo.integration.test.ts` spins up a real Hexo instance to guarantee the renderer continues to work with Hexo’s official API.

## Programmatic usage

The default export is the pure renderer function. You can reuse it in custom build scripts or other static-site setups:

```ts
import renderer from 'hexo-renderer-asciidoc';

const html = renderer({ text: '== Custom pipeline ==' });
```

Hexo users rarely need this, but it is handy for local testing or for wiring the renderer into other tools.

## Development workflow

### Toolchain bootstrap

```bash
mise install        # Install pinned versions of Node, pnpm, hk, etc.
pnpm install        # Install workspace dependencies
hk install          # Register git hooks (lint, format, tests)
```

### Common scripts

| Command           | Purpose                                                             |
| ----------------- | ------------------------------------------------------------------- |
| `pnpm lint`       | Run Biome for JS/TS/JSON and Markdownlint/Prettier for docs.        |
| `pnpm format`     | Apply the same formatters with `--write`.                           |
| `pnpm typecheck`  | Run `tsc --noEmit` for strict type safety.                          |
| `pnpm test`       | Execute the entire Vitest suite (including doctests + integration). |
| `pnpm test:watch` | Rerun the impacted tests in watch mode.                             |
| `pnpm test-cov`   | Generate text + LCOV coverage via V8.                               |
| `pnpm build`      | Bundle `src/` with `tsdown` into the publishable `dist/`.           |
| `hk check`        | Execute every hook (lint, format, typos, tests) exactly like CI.    |

### Source layout overview

- `src/core/` – Asciidoctor bootstrap, syntax highlighting bridge, and HTML safety helpers.
- `src/hexo/` – The Hexo adapter that registers the renderer for `.ad` / `.adoc` / `.asciidoc` files.
- `examples/hexo-site/` – Real Hexo project wired to the local package for smoke testing and documentation screenshots.
- `scripts/npm-readme.cjs` – Swaps `README.md` with `README.npm.md` during `npm pack` so the npm landing page gets the end-user guide without disturbing this contributor-focused README.

### Tests & fixtures

- Doctests live under `test/doctest/` and load fixture snippets from `test/doctest/examples/asciidoc/*.adoc` before snapshotting the rendered HTML.
- `test/highlight.test.ts` ensures the static highlighter decodes entities before passing code to Hexo.
- `test/hexo.integration.test.ts` boots Hexo and exercises the renderer via `hexo.render.render`.

Run all doctests while iterating on Asciidoctor upgrades:

```bash
pnpm test --filter Doctest
```

### Release checklist

1. `pnpm typecheck && pnpm test` – add/adjust fixtures if coverage drops.
2. `pnpm build` – refresh `dist/` via `tsdown`.
3. Update `ChangeLog.md` and bump the semver in `package.json`.
4. `pnpm publish` – the `prepublishOnly` hook rebuilds automatically, and `scripts/npm-readme.cjs` swaps the npm README before the tarball is packed.

## Continuous integration

- `.github/workflows/ci.yml` runs linting, type checks, Vitest, and the production build on Node 20.19 / 20.x / 22.x / 24.x.
- `.github/workflows/codeql.yml` keeps CodeQL scanning the TypeScript sources on every push and a weekly schedule.

## License

Licensed under **LGPL-3.0-or-later WITH LGPL-3.0-linking-exception**. See `COPYING`, `COPYING.LESSER`, and `LICENSES/` for the full texts. Commercial redistribution requires compliance with the linking exception.
