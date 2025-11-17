# Basic Hexo Site Example

This is a minimal example demonstrating how to use the `hexo-renderer-asciidoc` plugin with a Hexo site.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Generate the site:

```bash
pnpm run generate
```

3. Start the development server:

```bash
pnpm run server
```

4. Open your browser to `http://localhost:4000` to view the site.

## Configuration

The AsciiDoc renderer is configured in `_config.yml`:

```yaml
asciidoc:
  safe: unsafe
  attributes:
    toc: left
    source-highlighter: html-pipeline
```

## Writing Posts

Create AsciiDoc files in `source/_posts/` with the `.adoc` extension. The plugin supports all standard AsciiDoc features including:

- Headers and sections
- Lists (ordered, unordered, definition lists)
- Code blocks with syntax highlighting
- Tables
- Admonitions (NOTE, TIP, WARNING, etc.)
- Images and links
- Cross-references
- And much more!

## Example Posts

This example includes two sample posts:

- `hello-asciidoc.adoc` - Basic AsciiDoc features
- `advanced-features.adoc` - More advanced AsciiDoc capabilities

## Directory Structure

```
basic-hexo-site/
├── _config.yml          # Hexo configuration
├── package.json         # Dependencies
├── source/              # Source files
│   └── _posts/         # Blog posts
│       ├── hello-asciidoc.adoc
│       └── advanced-features.adoc
└── public/              # Generated site (after build)
```

## Cleanup

To clean generated files:

```bash
pnpm run clean
```
