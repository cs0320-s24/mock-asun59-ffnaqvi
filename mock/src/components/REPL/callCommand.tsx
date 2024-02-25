import React from "react";
import { fileDictionary } from "../data/mockData";
import { REPLFunction} from "./commandFunctions";
import { CommandFunctions } from "./commandFunctions";
import {load} from "./commandFunctions.tsx";
import {mode} from "./commandFunctions.tsx";
import {view} from "./commandFunctions.tsx";

const commandDictionary: { [key: string]: REPLFunction } = {
  "load_csv": load,
  "view": view, 
  "mode":mode
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
