<!--
 Copyright 2015 Shuai Zhang
 SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
-->

# Asciidoc Renderer for Hexo

[![Build Status](https://travis-ci.org/hcoona/hexo-renderer-asciidoc.svg?branch=master)](https://travis-ci.org/hcoona/hexo-renderer-asciidoc)
[![npm version](https://badge.fury.io/js/hexo-renderer-asciidoc.svg)](https://badge.fury.io/js/hexo-renderer-asciidoc)
[![Coverage Status](https://coveralls.io/repos/github/hcoona/hexo-renderer-asciidoc/badge.svg?branch=master)](https://coveralls.io/github/hcoona/hexo-renderer-asciidoc?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhcoona%2Fhexo-renderer-asciidoc.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhcoona%2Fhexo-renderer-asciidoc?ref=badge_shield)

Add Asciidoc support to Hexo. This plugin uses [asciidoctor.js](https://www.npmjs.com/package/asciidoctor.js) as the
rendering engine.

## Install

```bash
npm install hexo-renderer-asciidoc --save
```

## Development

### Toolchain bootstrap

Install the pinned toolchain with [mise](https://mise.jdx.dev/), then install Node dependencies and register the Git
hooks powered by [HK](https://github.com/jdx/hk).

```bash
mise install
pnpm install
hk install
```

### TypeScript development

- Runtime sources now live entirely in `src/` (pure TypeScript). We still ship CommonJS so Hexo users do not have to
  change anything—`tsdown` bundles the sources into `dist/` during `pnpm build`.
- `pnpm build` runs `tsdown build`, generating both executable CJS (`dist/index.js`, `dist/lib/renderer.js`) and the
  corresponding `.d.ts` files consumed by downstream projects.
- `tsconfig.json` focuses on type safety only (`noEmit`); use `pnpm typecheck` to validate sources without touching the
  compiled output.

```bash
pnpm typecheck    # Type-check JS/TS sources without emitting files
pnpm build        # Build TypeScript in src/ into dist/
```

### Source layout

The renderer now mirrors the modernization blueprint shared earlier:

- `src/core/` keeps the pure rendering pipeline (Asciidoctor bootstrapping, static highlighting, and HTML sanitisation).
- `src/hexo/` contains the Hexo-only wiring logic (`registerRenderer`) so framework glue stays isolated from core logic.
- `src/lib/renderer.ts` is a thin compatibility shim that re-exports the new core renderer to keep older imports working.

This separation keeps pure functions testable without Hexo, while the Hexo adapter simply registers the shared renderer
for `.ad`, `.adoc`, and `.asciidoc` inputs.

### Testing

Vitest now drives the renderer regression suite. The scripts mirror the old Mocha workflow but with faster watch and
first-class coverage support.

```bash
pnpm test        # Run Vitest once in CI mode
pnpm test:watch  # Watch files and re-run the impacted tests
pnpm test-cov    # Produce text + lcov coverage via V8 instrumentation
```

### Linting and formatting

Biome takes care of JS/TS/JSON (the `js-biome` and `json-biome` HK steps cover
`.js/.cjs/.mjs/.ts/.tsx/.jsx/.cts/.mts/.json/.jsonc/.json5`), while Prettier focuses on Markdown. HK unifies these steps
into the `pre-commit`, `pre-push`, `check`, and `fix` hooks, so running `hk check` locally mirrors the CI experience.

```bash
pnpm lint          # Run Biome plus Markdown validation
pnpm format        # Auto-format with Biome and Prettier
hk check           # Execute every hook
hk fix             # Attempt auto-fixes for supported steps
```

### Release / npm publish preparation

1. `pnpm typecheck && pnpm test` (add tests if needed for coverage).
2. `pnpm run build` (bundles `src/` via tsdown and refreshes the distributable in `dist/`).
3. `pnpm publish` (the prepublish hook runs `pnpm build`, so CI can call `pnpm publish --access public` directly).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhcoona%2Fhexo-renderer-asciidoc.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhcoona%2Fhexo-renderer-asciidoc?ref=badge_large)
