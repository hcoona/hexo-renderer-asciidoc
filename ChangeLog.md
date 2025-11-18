<!--
 Copyright 2015 Shuai Zhang
 SPDX-License-Identifier: LGPL-3.0-or-later WITH LGPL-3.0-linking-exception
-->

# Changelog

All notable changes to `hexo-renderer-asciidoc` are documented in this file.

The version scheme follows [Semantic Versioning 2.0.0](https://semver.org/).

> [!NOTE]
> Dates use the `YYYY-MM-DD` format and releases are listed from newest to oldest.

## [3.0.0-dev.2] - 2025-11-17

> [!WARNING]
> This is a development pre-release built from the `main` branch.
> Behaviour may still change before a stable 3.0.0 release.
>
> This build also **drops support for Node.js versions lower than 20.19.0**
> and changes the project license. Treat it as a breaking change if you rely
> on older Node.js versions or on the previous ISC license.

### Highlights

- Target modern runtimes only: minimum Node.js 20.19.0, full TypeScript rewrite,
  and refreshed build/test stack (tsdown, Vitest, Biome) for long-term support.
- Ship a ready-to-run Hexo example and an automated Hexo integration test so
  contributors can verify renderer behaviour end to end.
- Audit and upgrade DOM / renderer dependencies (Cheerio 1.1.x, Entities 7,
  hexo-util 4) to remove the legacy security advisories Trivy reported and to
  keep syntax highlighting stable across custom languages.
- Expand CI with GitHub Actions plus a Buddy pipeline so both community and
  internal releases follow the same checks.

### Breaking / noteworthy changes

- Raise the required Node.js version from `>=12.4.0` to `>=20.19.0`.
  Older Node.js versions are no longer supported by the toolchain or tests.
- Re-license the project from **ISC** to
  **LGPL-3.0-or-later WITH LGPL-3.0-linking-exception**
  (commit `daa954f`). Make sure your usage complies with the new license
  before upgrading.

### Features & behaviour

- Provide a new **TypeScript-based implementation** of the renderer while
  preserving the public Hexo renderer API
  (`registerRenderer`, `renderer` export).
- Continue to use Asciidoctor 3.x and Hexo's `hexo-util.highlight` for
  syntax highlighting, matching the behaviour introduced in 2.x.
- Upgrade `hexo-util` to `^4.0.0` to pick up the latest highlight fixes,
  including support for custom Highlight.js languages and safer URL encoding
  in `encodeURL`.
- Refresh the DOM post-processing pipeline by pairing Cheerio `^1.1.2` with
  `entities@7`, preserving escaped entities until Hexo's highlighter runs and
  eliminating Trivy-reported vulnerabilities caused by the legacy Cheerio
  release.
- Fix a regression introduced by the TypeScript build that imported
  `hexo-util` as a default export. The new bundle now consumes the named
  `highlight` export so `hexo-util.highlight` is always defined when Hexo
  renders code blocks.
- Add `examples/hexo-site`, a fully configured Hexo blog that consumes the
  local renderer via a `link:` dependency so contributors can test changes
  without publishing to npm. The example keeps its own pnpm lockfile, enables
  Hexo's stock highlighter, and documents the renderer defaults without adding
  fictitious configuration flags. Patch vulnerabilities flagged by Trivy so the
  sample dependencies stay clean between releases.
- Ship a dedicated `pnpm-workspace.yaml` inside the example so `pnpm install`
  runs there instead of jumping back to the repository root. This keeps the
  demo's dependencies isolated and prevents `hexo-util` regressions from stale
  builds.

### Tooling & infrastructure

- Migrate the codebase from JavaScript to **TypeScript** and build it with
  `tsdown` (commits `f6348a0`, `679acd0`, `955406e`).
- Replace Mocha + NYC with **Vitest** and V8-based coverage reporting for
  tests (commits `75af809`, `955406e`).
- Switch from ESLint to **Biome** and integrate **Prettier** for Markdown
  formatting (commits `2763a10`, `a37c9f8`).
- Introduce `mise`, `hk` hooks, and additional automation to standardise the
  development workflow (commit `a37c9f8`).
- Add **GitHub Actions** CI, **CodeQL** scanning, and **Dependabot**
  configuration (commit `c8a9843`).
- Generate the npm README from `README.npm.md` to better tailor
  documentation for npm consumers (commits `f01a69a`, `6a20a24`).
- Introduce Ruby / Asciidoctor-based doctest tooling for verifying the
  renderer output against upstream Asciidoctor (commit `a4de6bb`, doctest
  suites under `test/doctest`).
- Remove unused files and dependencies, and ignore coverage and snapshot
  files when checking license headers (commits `976ef5f`, `7a816ab`,
  `2d50554`, `45aef8c`, `7abe293`).
- Restructure the runtime sources to follow the 2025 Node LTS + pnpm + Biome +
  TypeScript blueprint: the pure renderer now lives under `src/core/`, Hexo
  integration logic under `src/hexo/`, and `src/lib/renderer.ts` became a thin
  compatibility shim.
- Add a Vitest-powered Hexo integration test that boots a temporary Hexo site
  and exercises `registerRenderer`, giving us end-to-end coverage for the
  renderer contract (commit `d088f83`).
- Introduce a Buddy pipeline workflow alongside GitHub Actions so release
  automation stays consistent across providers (commit `ca82bdc`).

### Migration notes

- Ensure your environment runs **Node.js 20.19.0 or newer** before
  upgrading.
- If you rely on the previous ISC license, review the new
  `LGPL-3.0-or-later WITH LGPL-3.0-linking-exception` terms and update your
  compliance artefacts.
- If you only consume the package at runtime (without building from source)
  and are already on a supported Node.js version, the Hexo integration points
  (`hexo.extend.renderer.register("ad" | "adoc" | "asciidoc", ...)`) remain
  compatible with 2.2.x.

## [2.2.0-dev.1] - 2024-04-28

> [!NOTE]
> Pre-release 2.2.0-dev.1 was never published as a stable 2.2.0 release.

### Features

- Use `replaceWith` instead of `html` when swapping highlighted code blocks
  in the generated HTML to avoid nested `.highlight` wrappers (commit
  `e3a406c`).

### Improvements & maintenance

- Migrate the project from npm/yarn to **pnpm** (commit `af0e1fc`).
- Bump `qs` from 6.5.2 to 6.5.3 (commit `abddbb8`).
- Bump `prismjs` from 1.23.0 to 1.24.0 (commit `7835c01`).

## [2.1.1] - 2021-06-21

### Improvements & maintenance

- Upgrade development dependencies, including bumping `handlebars` from
  4.5.3 to 4.7.7 (commit `d089e85`).
- Fix the Travis CI configuration (commit `8d8739d`).
- Update the supported Node.js engine range according to dependencies and use
  the Node.js LTS version in CI (commits `d06d891`, `e49d46b`, #25).
- Fix ESLint / JSCS configuration and editorconfig (commit `4d2bc5e`).
- Run CI with Node.js 8 (commit `c6cf90f`).

## [2.1.0] - 2021-06-21

### Improvements & maintenance

- Upgrade runtime and development dependencies (commit `c7decc0`).

## [2.0.0] - 2020-01-15

### Improvements & maintenance

- Upgrade dependencies across the board (commit `637c792`).
- Update `README.adoc` (commit `6192905`).
- Bump `lodash.merge` from 4.6.1 to 4.6.2 (commit `4af3674`, PR #16).
- Bump `eslint` from 3.19.0 to 4.18.2 (commit `d320c05`, PR #17).
- Bump `extend` from 3.0.1 to 3.0.2 (commit `1d62d2a`, PR #15).
- Add license scan report and badge (commit `3b8de78`, PR #13).
- Bump `handlebars` from 4.0.11 to 4.5.3 (commit `8fe268f`, PR #14).
- Fix Travis CI configuration (commit `fc64b0e`).

## [1.2.2] - 2018-06-24

### Features

- Upgrade `asciidoctor.js` to support Chinese titles in headings (commit
  `7659255`).

### Improvements & maintenance

- Add Travis CI configuration; convert the README to AsciiDoc and add CI
  badges (commit `2ddbe6d`).
- Restrict the supported Node.js version and update ESLint to support
  template literals (commit `f53a12d`).
- Roll back to an earlier version of `asciidoctor.js` in order to stabilise
  behaviour; add tests and source linting (commit `ec3649d`).
- Merge various fixes and features from the `develop` and `release/v1.1.6`
  branches, including support for multiple level-0 headings (see below),
  bugfixes, and JSONStream dependency adjustments (#3, #4, #5).
- Allow multiple level-0 headings by setting AsciiDoc's `doctype` option to
  `book` (commit `2a6e959`, PR #5).
- Fix a known issue reported by users (commit `5413a4c`).
- Specify a compatible version of `JSONStream` in `peerDependencies` to fix
  issue #3 (commit `910297a`).

## [1.1.5] - 2015-10-05

### Features

- Add more AsciiDoc extensions (commit `66da3c1`, PR #1).

### Bug fixes

- Fix HTML escaping for code blocks (commit `9e675ee`).
- Avoid encoding non-UTF8 characters so that `hexo-filter-auto-spacing` works
  correctly (commit `9ed3bb3`).
- Use the `data-lang` attribute instead of `lang-data` when detecting the
  language for highlighted code blocks (commit `3ab30e7`).

## [1.1.1] - 2015-04-26

### Bug fixes

- Remove an extra `escape` tag from the generated output (commit `0d02319`).

## [1.1.0] - 2015-04-26

### Features

- Use `cheerio` and `hexo-util.highlight` to perform static syntax
  highlighting of code blocks (commit `6579202`).
- Encode `{` and `}` characters in the generated HTML to avoid them being
  interpreted as template syntax (commit `7f3559e`).

## [1.0.0] - 2015-04-25

### Initial release

- Initial release of `hexo-renderer-asciidoc` (commit `7b0d8a8`).
