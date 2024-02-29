import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
// Helper to prevent repeititive VALID login
async function login(page) {
  await page.getByLabel("username").fill("Alyssa");
  await page.getByLabel("password").fill("A");
  await page.getByLabel("Login").click();
}
//Tests login functionality
test("on page load, i see a login button", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
});

// Test valid login
test("on page load, i dont see the input box until login", async ({ page }) => {
  // Pre login state is valid
  await expect(page.getByLabel("Sign Out")).not.toBeVisible(); // Label is login option
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // Valid login (correct username and password)
  login(page);

  // Post login state is valid
  await expect(page.getByLabel("Sign Out")).toBeVisible(); // Label is signout option
  await expect(page.getByLabel("Command input")).toBeVisible(); // Command input compontents appears
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

//testing that incorrect input doesn't login
test("on page load, incorrect login does not show input box", async ({
  page,
}) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button and login properly
  await page.getByLabel("username").fill("Invalid");
  await page.getByLabel("password").fill("Input");
  await page.getByLabel("Login").click();

  // post login state should be unchaged
  await expect(page.getByLabel("Sign Out")).not.toBeVisible(); // Command input compontents does not appear
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).not.toBeVisible();
});

//testing signing in and signing out
test("on page load, login then signout will bring me back to front page", async ({
  page,
}) => {
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button and login properly
  login(page);

  // Post login state is valid
  await expect(page.getByLabel("Sign Out")).toBeVisible(); // Label is signout option
  await expect(page.getByLabel("Command input")).toBeVisible(); // Command input compontents appears
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();

  // Signout state back to front page
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible(); // Command input compontents does not appear
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).not.toBeVisible();
});
// Testing input updates
test("after I type into the input box, its text changes", async ({ page }) => {
  // login
  login(page);

  // input text
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // The text in command has changed
  await expect(page.getByLabel("Command input")).toHaveValue("Awesome command");
});
// Invalid command updates/returns expected value
test("after I type and enter random invalid command into the input box, the history box is updated", async ({ page }) => {
  // login
  login(page);

  // input text
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Values are properly stored in history after entered
  await page.getByRole("button", { name: "Submit" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("Invalid command");
});

