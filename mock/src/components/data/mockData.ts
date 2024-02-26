export const usernamePassword = new Map<string, string>();
export const fileDictionary = new Map<string, string[][]>();
// Add username-password pairs to the map
usernamePassword.set("Alyssa", "A");
usernamePassword.set("Faizah", "F");

/**
 * A file for our mocked data containing a variety of sizes, shapes, and
 * types of mocked JSON files.
 */
const dataHeader = [
  ["First Name", "Last Name", "State", "Phone Number", "Favorite Fruit"],
  ["Miley", "Cyrus", "California", "123", "apple"],
  ["Bob", "Nelson", "Rhode Island", "401401401", "pear"],
  ["Tim", "Nelson", "Pennsylvania", "456", "apple"],
];

const dataNoHeader = [
  ["Female", "Professor", "33"],
  ["Male", "Nurse", "27"],
  ["Female", "Lawyer", "46"],
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
