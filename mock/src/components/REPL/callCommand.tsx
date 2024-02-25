import React from "react";
import { fileDictionary } from "../data/mockData";
import { REPLFunction, load, view} from "./commandFunctions";

const commandDictionary: { [key: string]: REPLFunction } = {
  "load_csv": load,
  "view": view
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
