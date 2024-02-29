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
// Valid view
test("valid view", async ({ page }) => {
  // login
  login(page);

  // valid load input
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_csv header");
  await page.getByRole("button", { name: "Submit" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual("File successfully loaded"); // successful output

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  const second = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(second).toEqual("First NameLast NameStatePhone NumberFavorite FruitMileyCyrusCalifornia123appleBobNelsonRhode Island401401401pearTimNelsonPennsylvania456apple"); //header table view
});

//test view without load
test("view used without load", async ({ page }) => {
  // login
  login(page);

  // change to verbose mode
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();

  // Values are properly stored in history after entered after successful load
  await page.getByRole("button", { name: "Submit" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(secondChild).toEqual("CSV file hasn't been loaded");
});


// test view in verbose mode
test("view verbose", async ({ page }) => {
  // login
  login(page);

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("load_csv header");

  // Values are properly stored in history after entered after failed load
  await page.getByRole("button", { name: "Submit" }).click();


  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("mode");

  // Values are properly stored in history after entered after failed load
  await page.getByRole("button", { name: "Submit" }).click();

  // loading invalid file path
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("view");

  // Values are properly stored in history after entered after failed load
  await page.getByRole("button", { name: "Submit" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });

  expect(secondChild).toEqual("Command: view" + "\n" + "Output: "); // Failed load due to invalid file

  const third = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });

  expect(third).toEqual("First NameLast NameStatePhone NumberFavorite FruitMileyCyrusCalifornia123appleBobNelsonRhode Island401401401pearTimNelsonPennsylvania456apple");

});
