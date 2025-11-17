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

### JavaScript / TypeScript development

- The runtime codebase is still CommonJS (`index.js` + `lib/renderer.js`) so Hexo users do not need to migrate anything.
- `tsconfig.json` enables `allowJs`, so you can gradually introduce `.ts` files inside the existing JavaScript folders.
- If you want to author brand-new modules purely in TypeScript, place the sources under `src/` and run `pnpm build` to
  transpile `.ts` to `dist/` for validation. `tsconfig.build.json` only processes `src/**/*.ts(x)`, so current JS
  artifacts remain untouched.
- `types/index.d.ts` provides minimal typings for the Hexo renderer, the global `hexo`, and `lib/renderer`, enabling IDE
  completions and letting downstream consumers use this plugin from TypeScript projects.

```bash
pnpm typecheck    # Type-check JS/TS sources without emitting files
pnpm build        # Build TypeScript in src/ into dist/
```

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
2. `pnpm run build` (if you added new `.ts` sources, this compiles CommonJS artifacts into `dist/`).
3. `pnpm publish` (the prepublish hook runs `pnpm build`, so CI can call `pnpm publish --access public` directly).

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhcoona%2Fhexo-renderer-asciidoc.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhcoona%2Fhexo-renderer-asciidoc?ref=badge_large)
