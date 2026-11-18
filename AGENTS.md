## Development

The site lives in `web/` — run all npm/Astro commands from that directory.

When starting the dev server, use background mode:

```
cd web && astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Design system

Tokens and base components live in `web/src/design/`. Read
`web/src/design/README.md` before writing any UI — it documents the semantic
tokens, component props, dark mode, and conventions agents must follow.
Interactive showcase: `web/src/pages/design.astro` (route `/papiro/design/`).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
