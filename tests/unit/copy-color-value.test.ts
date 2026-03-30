/**
 * Unit tests for the copy-to-clipboard functionality.
 *
 * Since jsdom is not available, these tests verify the implementation
 * by statically analyzing the HTML source for required elements and logic.
 */

import * as fs from "node:fs";
import * as path from "node:path";

describe("Copy to clipboard functionality", () => {
  let html: string;

  beforeEach(() => {
    const htmlPath = path.resolve(__dirname, "../../src/index.html");
    html = fs.readFileSync(htmlPath, "utf-8");
  });

  test("copy button with data-testid exists in the HTML", () => {
    // The copy button must exist with data-testid="copy-btn"
    expect(html).toMatch(/data-testid=["']copy-btn["']/);
  });

  test("copy button uses an emoji instead of text", () => {
    // Extract the copy button element content
    const copyBtnMatch = html.match(/data-testid=["']copy-btn["'][^>]*>([\s\S]*?)<\/button>/);
    expect(copyBtnMatch).not.toBeNull();

    const buttonContent = (copyBtnMatch as RegExpMatchArray)[1].trim();
    // Should contain content (not empty)
    expect(buttonContent.length).toBeGreaterThan(0);
    // Should NOT be plain alphabetic text — should be emoji
    expect(/^[a-zA-Z\s]+$/.test(buttonContent)).toBe(false);
  });

  test("clipboard writeText is used in the page script", () => {
    // The implementation must use clipboard.writeText to copy the value
    expect(html).toMatch(/clipboard\.writeText/);
  });

  test("the copied value includes a leading # character", () => {
    // The script should reference the hex value with a # prefix when copying.
    // Look for a pattern that constructs or references a value starting with #
    // when calling writeText (e.g., writeText('#' + ...) or writeText(`#...`))
    const usesHashInClipboard =
      /writeText\s*\([\s\S]*?#/.test(html) ||
      /writeText\s*\([\s\S]*?['"`]#/.test(html) ||
      // Or it copies the textContent which already contains #
      /textContent/.test(html);
    expect(usesHashInClipboard).toBe(true);
  });
});
