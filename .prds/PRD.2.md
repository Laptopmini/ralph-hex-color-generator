# PRD: Hex Color Generator app

**Hex Color Generator:** A button generates a random hex code, displays the code, and changes the `body` background color. 

## Objective

We want to make this web app render a button which lets the user generate a random hex color value, display this code to the user, allow them to copy it and make the background color of the page use the generated value.

## Context

- All source code for the app should be declared under `src/`.

## Constraints

- Do not modify `package.json` dependencies.
- Try to only modify `src/index.html`, `src/style.css`, and the `src/` directory.
- All test files must pass on first execution.

## Tasks

- [x] Update Homepage. Replace its contents so that it only presents a large button titled "Generate". This button has no action for the time being. `[test: npx playwright test tests/e2e/homepage-base-layout.spec.ts]`

- [x] Generate color value. When the "Generate" button is clicked, a random hex color value is computed and presented above the button in bold font. When a hex color value is presented, its value is also used a the background color for the page itself. `[test: npx playwright test tests/e2e/generate-color.spec.ts]`

- [x] Copy to clipboard functionality. To the right of the hex color value presented to the user, add a "copy to clipboard" button. This button does not have text, but a emoji representing the copy behavior. When the button is clicked, the value is copied into the user's clipboard, including a leading `#` character. `[test: npx jest tests/unit/copy-color-value.test.ts]`
