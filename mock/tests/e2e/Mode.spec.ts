import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

// Helper to prevent repeititive VALID login
async function login(page) {
  await page.getByLabel("username").fill("Faizah");
  await page.getByLabel("password").fill("F");
  await page.getByLabel("Login").click();
}

test("mode starts as brief", async ({ page }) => {
    // login
    await login(page);

    // Wait for the mode status text to be rendered
    await page.waitForSelector('text[aria-label="mode status"]');

    // Retrieve the mode status text
    const modeStatusText = await page.evaluate(() => {
      const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
      return modeStatusElement?.textContent;
    });

    // Assert that the mode status text is "Current mode is: brief"
    expect(modeStatusText).toEqual(`Current mode is: brief`);
});


// basic valid mode
test("mode works correctly", async ({ page }) => {
  // login
  login(page);

  // valid mode input
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");

  // The text in command has changed
  await expect(page.getByLabel("Command input")).toHaveValue("mode");

  // Values are properly stored in history after entered after successful load
  await page.getByRole("button", { name: "Submit" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Mode Switched"); // successful output
  const modeStatusText = await page.evaluate(() => {
    const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
    return modeStatusElement?.textContent;
  });
  expect(modeStatusText).toEqual(`Current mode is: verbose`);

});

// Valid mode in verbose mode
test("valid updates everything correctly using verbose", async ({ page }) => {
  // login
  login(page);

  // change to verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  // valid load input
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");

  // The text in command has changed
  await expect(page.getByLabel("Command input")).toHaveValue("mode");

  // Values are properly stored in history after entered after successful load
  await page.getByRole("button", { name: "Submit" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual("Command: mode" + "\n" + "Output: "); // successful output in verbose

  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(thirdChild).toEqual("Mode Switched"); // successful output in verbose
});

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

//tests invalid mode input
test("mode multiple commands is invalid", async ({ page }) => {
    // login
    await login(page);
  
    // Set mode to verbose
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("mode invalid");
    await page.getByRole("button", { name: "Submit" }).click();

    // Wait for the mode switch to complete
    await page.waitForTimeout(500); // Adjust timeout as necessary

    // Retrieve the mode status text
    const modeStatusText = await page.evaluate(() => {
      const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
      return modeStatusElement?.textContent;
    });

    // Assert that the mode status remains unchanged (brief)
    expect(modeStatusText).toEqual(`Current mode is: brief`);

    // Verify that an error message is displayed in the history
    const errorMessage = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[0]?.textContent;
    });
    expect(errorMessage).toEqual("Invalid Input");
});
