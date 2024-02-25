import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import React from "react";
import { fileDictionary } from "../data/mockData";
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
