import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

// Helper to prevent repeititive VALID login
async function login(page) {
  await page.getByLabel("username").fill("Alyssa");
  await page.getByLabel("password").fill("A");
  await page.getByLabel("Login").click();
}

//tests mode interaction with other functions
test("mode and load", async ({ page }) => {
    // login
    await login(page);

    // Set mode to verbose
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode");
    await page.getByRole("button", { name: "Submit" }).click();

    // Wait for mode switch to complete
    await page.waitForTimeout(500); // Adjust timeout as necessary

    // Retrieve the mode status text
    const modeStatusText = await page.evaluate(() => {
        const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
        return modeStatusElement?.textContent;
    });
    expect(modeStatusText).toEqual(`Current mode is: verbose`);

    // Execute command to load data
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_csv emptyData");
    await page.getByRole("button", { name: "Submit" }).click();

    // Wait for data loading to complete
    await page.waitForTimeout(1000); // Adjust timeout as necessary

    // Check if the output is correct
    const outputText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[1]?.textContent;
    });
    expect(outputText).toEqual("Command: load_csv\nOutput: ");

    // Check if the data was successfully loaded
    const loadStatusText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[2]?.textContent;
    });
    expect(loadStatusText).toEqual("File successfully loaded");
});
