import { expect, test } from "@playwright/test";

test.describe("Generate Color Value", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clicking Generate displays a hex color value in bold and changes background", async ({
    page,
  }) => {
    const button = page.getByTestId("generate-btn");
    const colorDisplay = page.getByTestId("color-value");

    // Color value should not be visible before clicking
    await expect(colorDisplay).not.toBeVisible();

    await button.click();

    // Color value should now be visible
    await expect(colorDisplay).toBeVisible();

    // Should display a valid hex color (e.g. #A1B2C3)
    const text = await colorDisplay.textContent();
    expect(text).toMatch(/^#[0-9A-Fa-f]{6}$/);

    // Should be bold
    const fontWeight = await colorDisplay.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue("font-weight"),
    );
    expect(Number(fontWeight)).toBeGreaterThanOrEqual(700);

    // Background color of the body should change from default
    const bgColor = await page.evaluate(() =>
      window.getComputedStyle(document.body).getPropertyValue("background-color"),
    );
    // Default background is white (rgb(255, 255, 255)) or transparent — after click it should differ
    expect(bgColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("clicking Generate multiple times updates the color each time", async ({ page }) => {
    const button = page.getByTestId("generate-btn");
    const colorDisplay = page.getByTestId("color-value");

    await button.click();
    await expect(colorDisplay).toBeVisible();
    const firstColor = await colorDisplay.textContent();

    // Click many times to ensure at least one produces a different color
    let foundDifferent = false;
    for (let i = 0; i < 20; i++) {
      await button.click();
      const currentColor = await colorDisplay.textContent();
      expect(currentColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      if (currentColor !== firstColor) {
        foundDifferent = true;
        break;
      }
    }
    expect(foundDifferent).toBe(true);
  });
});
