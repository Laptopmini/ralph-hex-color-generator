import { expect, test } from "@playwright/test";

test.describe("Homepage Base Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("displays a large Generate button", async ({ page }) => {
    const button = page.getByTestId("generate-btn");
    await expect(button).toBeVisible();
    await expect(button).toHaveText("Generate");
  });

  test("does not display the old Hello World content", async ({ page }) => {
    await expect(page.getByText("Hello World")).not.toBeVisible();
  });
});
