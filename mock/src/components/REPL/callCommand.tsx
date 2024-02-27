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
export let commandString: string = "";
export class InputHandler {
    
  static handleCommand(command: Array<string>): String | String[][] {
    commandString = command[0];
    
    const func = commandDictionary[command[0]];
  
    if (func){
        return func(command);
    } 
    return ("Invalid command")
  }
}

