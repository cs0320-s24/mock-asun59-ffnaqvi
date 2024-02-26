import React, { ReactElement } from "react";
import { fileDictionary } from "../data/mockData";
import { REPLFunction} from "./commandFunctions";
import { CommandFunctions } from "./commandFunctions";
import {load} from "./commandFunctions.tsx";
import {mode} from "./commandFunctions.tsx";
import {view} from "./commandFunctions.tsx";
import {search} from "./commandFunctions.tsx";


const commandDictionary: { [key: string]: REPLFunction } = {
  "load_csv": load,
  "view": view, 
  "mode":mode,
  "search": search
};

export class InputHandler {
  static handleCommand(command: Array<string>): String | String[][] {
    const func = commandDictionary[command[0]];
    console.log("command name is" + command[0])
    console.log("command is" + command)

    if (func){
        return func(command);
    } 
    return ("Invalid command")
  }
}
