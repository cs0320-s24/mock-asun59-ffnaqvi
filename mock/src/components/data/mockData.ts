export const usernamePassword = new Map<string, string>();
export const fileDictionary = new Map<string, string[][]>();
export const searchDictionary = new Map<string, string[][]>();
// Add username-password pairs to the map
usernamePassword.set("Alyssa", "A");
usernamePassword.set("Faizah", "F");

/**
 * A file for our mocked data containing a variety of sizes, shapes, and
 * types of mocked JSON files.
 */
const dataHeader = [
  ["Food", "Type", "Cuisine", "Calories (per 100g)", "Price ($)"],
  ["Sushi", "Dish", "Japanese", "130", "10"],
  ["Tacos", "Dish", "Mexican", "218", "6"],
  ["Tandoori Chicken", "Dish", "Indian", "220", "8"],
  ["Mozerella Sticks", "Appetizer", "Italian", "131", "5"],
  ["Falafel", "Dish", "Middle Eastern", "333", "4"],
];

const dataNoHeader = [
  ["Andrews", "Grinder", "North Campus"],
  ["Ratty", "Tomato Soup", "South Campus"],
  ["Blue Room", "Muffin", "Campus Center"],
];

const emptyData = [[]];

const invalidFilePath = [["invalid File path"]];

const malformedData = [["Data is malformed"]];
// Creating file dictionary
fileDictionary.set("header", dataHeader);
fileDictionary.set("noHeader", dataNoHeader);
fileDictionary.set("emptyData", emptyData);
fileDictionary.set("invalidFilePath", invalidFilePath);
fileDictionary.set("malformedData", malformedData);

const useIndex = [["Tandoori Chicken", "Dish", "Indian", "220", "8"]];

const useHeader = [["Tandoori Chicken", "Dish", "Indian", "220", "8"]];

const invalidIndex = [["Invalid Index Number"]];

const noHeader = [[]];

const multOUtput = [
  ["Sushi", "Dish", "Japanese", "130", "10"],
  ["Tacos", "Dish", "Mexican", "218", "6"],
  ["Tandoori Chicken", "Dish", "Indian", "220", "8"],
  ["Falafel", "Dish", "Middle Eastern", "333", "4"],
];

searchDictionary.set("search2Indian", useIndex);
searchDictionary.set("searchCuisineIndian", useHeader);
searchDictionary.set("search20Indian", invalidIndex);
searchDictionary.set("searchnoHeaderIndian", noHeader);
searchDictionary.set("searchTypeDish", multOUtput);
