import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import React from "react";
import { fileDictionary } from "../data/mockData";
import getHistory from "./REPL.tsx";
// Strategy pattern interface
export interface REPLFunction {
  (command: Array<string>): String | String[][];
}

// Example implementation of the interface
export const load: REPLFunction = (loadFile: Array<string>): String => {
  if (loadFile.length != 2) {
    return "Invalid Input";
  }
  const fileName = loadFile[1];

  if (fileDictionary.has(fileName)) {
    return "File successfully loaded";
  } else {
    return "Failed to load file";
  }
};

export const view: REPLFunction = (viewFile: Array<string>): String[][] => {
  const history = getHistory();
  // Iterate through history in reverse order
  for (let i = history.length - 1; i >= 0; i--) {
    // Process each history item as needed
    const historyItem = history[i];
    // Assuming each history item is an array of strings
    recentCalls.push(historyItem);
  }
}