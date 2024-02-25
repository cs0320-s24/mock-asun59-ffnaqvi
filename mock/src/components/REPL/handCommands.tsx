import React from "react";
import { fileDictionary } from "../data/mockData";
import { REPLFunction, load } from "./commandFunctions";

let LOAD_CODE = -1; // Initial load code
let csvData = [];

const commandDictionary: { [key: string]: REPLFunction } = {
  load_csv: load,
};

export class InputHandler {
  static handleCommand(command: Array<string>): String | String[][] {
    const func = commandDictionary[command[0]];
    if (func){
        return func(command);
    } 
    return ("Invalid command")
  }
}
