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

### Project Structure

The project follows a clean architecture with separation of concerns:

```
src/
├── core/              # Pure business logic (no Hexo dependencies)
│   ├── types.ts       # Core type definitions
│   ├── options.ts     # Configuration normalization
│   └── convert.ts     # AsciiDoc → HTML conversion
├── hexo/              # Hexo integration layer
│   └── registerRenderer.ts  # Hexo adapter
├── __tests__/         # Collocated tests
└── index.ts           # Main entry point
```

### TypeScript development

- Runtime sources now live entirely in `src/` (pure TypeScript). We still ship CommonJS so Hexo users do not have to
  change anything—`tsdown` bundles the sources into `dist/` during `pnpm build`.
- `pnpm build` runs `tsdown build`, generating both executable CJS (`dist/index.js`) and the corresponding `.d.ts` files
  consumed by downstream projects.
- `tsconfig.json` focuses on type safety only (`noEmit`); use `pnpm typecheck` to validate sources without touching the
  compiled output.
- `tsconfig.build.json` is used by the build process to exclude tests.

```bash
pnpm typecheck    # Type-check JS/TS sources without emitting files
pnpm build        # Build TypeScript in src/ into dist/
```

### Testing

Vitest drives the renderer test suite with fast watch mode and first-class coverage support. Tests are collocated with
source code in `src/__tests__/`.

```bash
pnpm test        # Run Vitest once in CI mode
pnpm test:watch  # Watch files and re-run the impacted tests
pnpm test-cov    # Produce text + lcov coverage via V8 instrumentation
```

### Example Site

A working example Hexo site is available in `examples/basic-hexo-site/` to demonstrate the plugin in action:

```bash
cd examples/basic-hexo-site
pnpm install
pnpm run server  # Start Hexo server on http://localhost:4000
```

The example includes sample AsciiDoc posts showcasing various features.

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
