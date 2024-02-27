import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */


// test.beforeEach(() => {
//     await page.goto('http://localhost:5173/');

// })
test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:5173/');
});


/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */

// Login functionalities 
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel('Login')).toBeVisible()
})
// Valid login
test('can log in with proper username and password', async ({ page })=>{

  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // Sign in by passing in correct username + password
  await page.getByLabel("username").fill("Alyssa");
  await page.getByLabel("password").fill("A");
  await page.getByLabel("Login").click();
  // Successful login
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
})


// test('on page load, i dont see the input box until login', async ({ page }) => {
//   // Notice: http, not https! Our front-end is not set up for HTTPs.
//   await page.goto('http://localhost:5173/');
//   await expect(page.getByLabel('Sign Out')).not.toBeVisible()
//   await expect(page.getByLabel('Command input')).not.toBeVisible()
  
//   // click the login button
  
//   await page.getByLabel('Login').click();
//   await expect(page.getByLabel('Sign Out')).toBeVisible()
//   await expect(page.getByLabel('repl-command-box')).toBeVisible()
// })
// // Invalid login

// test('after I type into the input box, its text changes', async ({ page }) => {
//   // Step 1: Navigate to a URL
//   await page.goto('http://localhost:5173/');
//   await page.getByLabel('Login').click();

//   // Step 2: Interact with the page
//   // Locate the element you are looking for
//   await page.getByLabel('Command input').click();
//   await page.getByLabel('Command input').fill('Awesome command');

//   // Step 3: Assert something about the page
//   // Assertions are done by using the expect() function
//   const mock_input = `Awesome command`
//   await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
// });

// test('on page load, i see a button', async ({ page }) => {
//   // CHANGED
//   await page.goto('http://localhost:5173/');
//   await page.getByLabel('Login').click();
//   await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
// });

// test('after I click the button, its label increments', async ({ page }) => {
//   // CHANGED
//   await page.goto('http://localhost:5173/');
//   await page.getByLabel('Login').click();
//   await expect(page.getByRole('button', {name: 'Submitted 0 times'})).toBeVisible()
//   await page.getByRole('button', {name: 'Submitted 0 times'}).click()
//   await expect(page.getByRole('button', {name: 'Submitted 1 times'})).toBeVisible()
// });

// test('after I click the button, my command gets pushed', async ({ page }) => {
//   // CHANGED
//   await page.goto('http://localhost:5173/');
//   await page.getByLabel('Login').click();
//   await page.getByLabel('Command input').fill('Awesome command');
//   await page.getByRole('button', {name: 'Submitted 0 times'}).click()

//   // you can use page.evaulate to grab variable content from the page for more complex assertions
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector('.repl-history');
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual("Awesome command");
// });