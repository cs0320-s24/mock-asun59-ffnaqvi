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

    // Retrieve the mode status text
    const modeStatusText = await page.evaluate(() => {
        const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
        return modeStatusElement?.textContent;
    });
    expect(modeStatusText).toEqual(`Current mode is: verbose`);

    //Execute command to load data
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_csv emptyData");
    await page.getByRole("button", { name: "Submit" }).click();

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


//tests brief load, view, search
test("brief load, view, search", async ({ page }) => {
    // login
    await login(page);

    //load file
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_csv header");
    await page.getByRole("button", { name: "Submit" }).click();

    //Retrieve the mode status text
    const modeStatusText = await page.evaluate(() => {
        const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
        return modeStatusElement?.textContent;
    });
    expect(modeStatusText).toEqual(`Current mode is: brief`);

    // Execute command to load data
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submit" }).click();

    // Check if the output is correct
    const outputText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[1]?.textContent;
    });
    expect(outputText).toEqual("FoodTypeCuisineCalories (per 100g)Price ($)SushiDishJapanese13010TacosDishMexican2186Tandoori ChickenDishIndian2208Mozerella SticksAppetizerItalian1315FalafelDishMiddle Eastern3334");

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 2 Indian");
    await page.getByRole("button", { name: "Submit" }).click();

    // Check if the data was successfully loaded
    const loadStatusText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[2]?.textContent;
    });
    expect(loadStatusText).toEqual("Tandoori ChickenDishIndian2208");
});


//tests verbose load, view, search
test("verbose load, view, search", async ({ page }) => {
    // login
    await login(page);

     // Set mode to verbose
     await page.getByLabel("Command input").click();
     await page.getByLabel("Command input").fill("mode");
     await page.getByRole("button", { name: "Submit" }).click();

    // Retrieve the mode status text
    const modeStatusText = await page.evaluate(() => {
        const modeStatusElement = document.querySelector('text[aria-label="mode status"]');
        return modeStatusElement?.textContent;
    });
    expect(modeStatusText).toEqual(`Current mode is: verbose`);

        // Check if the output is correct
        const modeSwitched = await page.evaluate(() => {
            const history = document.querySelector(".repl-history");
            return history?.children[0]?.textContent;
        });
        expect(modeSwitched).toEqual("Mode Switched");
    
        //load
        await page.getByLabel("Command input").click();
        await page.getByLabel("Command input").fill("load_csv header");
        await page.getByRole("button", { name: "Submit" }).click();

        const loadText = await page.evaluate(() => {
            const history = document.querySelector(".repl-history");
            return history?.children[1]?.textContent;
        });
        expect(loadText).toEqual("Command: load_csv\nOutput: ");
    
        const loadText2 = await page.evaluate(() => {
            const history = document.querySelector(".repl-history");
            return history?.children[2]?.textContent;
        });
        expect(loadText2).toEqual("File successfully loaded");


    //view data
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submit" }).click();

    const viewText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[3]?.textContent;
    });
    expect(viewText).toEqual("Command: view\nOutput: ");

    const viewText2 = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[4]?.textContent;
    });
    expect(viewText2).toEqual("FoodTypeCuisineCalories (per 100g)Price ($)SushiDishJapanese13010TacosDishMexican2186Tandoori ChickenDishIndian2208Mozerella SticksAppetizerItalian1315FalafelDishMiddle Eastern3334");

    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 2 Indian");
    await page.getByRole("button", { name: "Submit" }).click();

    //check if search successful
    const searchText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[5]?.textContent;
    });
    expect(searchText).toEqual("Command: search\nOutput: ");

    const searchText2 = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[6]?.textContent;
    });
    expect(searchText2).toEqual("Tandoori ChickenDishIndian2208");
});


//tests brief load, view, search with invalid load
test("invalid load, view, search", async ({ page }) => {
    // login
    await login(page);

    //load file
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_csv malformedData");
    await page.getByRole("button", { name: "Submit" }).click();

    //view
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("view");
    await page.getByRole("button", { name: "Submit" }).click();

    //search
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 2 Indian");
    await page.getByRole("button", { name: "Submit" }).click();

    // Check if the output is correct
    const outputText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[0]?.textContent;
    });
    expect(outputText).toEqual("Data is malformed");

    // Check if the data was successfully loaded
    const viewText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[1]?.textContent;
    });
    expect(viewText).toEqual("CSV file hasn't been loaded");

        // Check if the data was successfully loaded
        const searchText = await page.evaluate(() => {
            const history = document.querySelector(".repl-history");
            return history?.children[2]?.textContent;
        });
    expect(searchText).toEqual("CSV file hasn't been loaded");
});


//tests just search and load
test("load and search", async ({ page }) => {
    // login
    await login(page);

    // Set mode to verbose
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("load_csv header");
    await page.getByRole("button", { name: "Submit" }).click();

    //Execute command to load data
    await page.getByLabel("Command input").click();
    await page.getByLabel("Command input").fill("search 2 Indian");
    await page.getByRole("button", { name: "Submit" }).click();

    // Check if the data was successfully loaded
    const loadStatusText = await page.evaluate(() => {
        const history = document.querySelector(".repl-history");
        return history?.children[0]?.textContent;
    });
    expect(loadStatusText).toEqual("File successfully loaded");

        // Check if the output is correct
        const outputText = await page.evaluate(() => {
            const history = document.querySelector(".repl-history");
            return history?.children[1]?.textContent;
        });
        expect(outputText).toEqual("Tandoori ChickenDishIndian2208");
    
});