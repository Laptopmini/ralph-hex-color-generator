# ralph-hex-color-generator

A fork of [ralph-node](https://github.com/Laptopmini/ralph-node) implementing a static HTML website with a button that generates a random hex color value, displays this code to the user, allows them to copy it, and makes the background color of the page use the generated value.

Fork this repo and drop in a new `PRD.md` to start building something with the loop already bootstrapped.

For full documentation on how the Ralph Loop works and how to use these repos, see the [original ralph-node README](https://github.com/Laptopmini/ralph-node#readme).

## Source

All `ralph-node` repos begin from the same genesis, and branch off a specific upstream in its tree:

- **Genesis:** https://github.com/Laptopmini/ralph-node
- **Upstream:** https://github.com/Laptopmini/ralph-html

## Changelog

- **TypeScript** — `tsconfig.json` with ES2022 target, NodeNext modules, strict mode, and `dist/` output
- **Jest** — `jest.config.js` with `@swc/jest` transform scoped to unit tests, plus a sanity test
- **Playwright** — `playwright.config.ts` targeting Chromium at `localhost:3000`, plus a sanity E2E test
- **Root test script** — `npm test` wired to run unit then E2E tests sequentially
- **Static HTML website** — Configured to serve a static HTML based application
- **Playwright webServer** — Updated Playwright configuration with webServer block for proper test execution
- **Homepage with Generate button** — Replaced default content with large button element for color generation
- **Random hex color generation** — Implemented `generateHexColor()` function producing #RRGGBB format, displays color and sets background
- **Copy to clipboard** — Added copy button with emoji positioned next to color value using `navigator.clipboard.writeText()`

## License

Apache 2.0
