import { Dispatch, ReactElement, SetStateAction, useState } from "react";
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

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>; //would cutomize the type
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
} 
 

let modesProps: string;
let setModesProps: Dispatch<SetStateAction<string>>;
let historyProps: string[];
let setHistoryProps: Dispatch<SetStateAction<string[]>>;
let csvData: string[][];
let load_status = -1;

export function CommandFunctions(props: REPLInputProps) {
  // Assign props values to constants
  modesProps = props.mode;
  setModesProps = props.setMode;
  historyProps = props.history;
  setHistoryProps = props.setHistory;

  return <div>{/* JSX content here */}</div>;
}

export const mode: REPLFunction = (modeArray: Array<string>): String => {
  if (modeArray.length != 1) {
    return "Invalid Input";
  }
  setModesProps(modesProps === "brief" ? "verbose" : "brief");
  return "Mode Switched";
};

export const load: REPLFunction = (loadFile: Array<string>): string => {
  if (loadFile.length !== 2) {
    return "Invalid Input";
  }
  const fileName = loadFile[1];

  const loadedData = fileDictionary.get(fileName);
  if (loadedData) {
    load_status = 200;
    csvData = loadedData;
    return "File successfully loaded";
  } else {
    return "Failed to load file";
  }
};

export const view: REPLFunction = (viewFile: Array<string>): string[][] | string => {
  if (load_status == 200) {
    if (!csvData || csvData.length === 0) {
      return []; // Return empty array if CSV data is empty or undefined
   }
 
   console.log("csv data type:" +  typeof csvData);
   console.log("csv[0] data type:" + typeof csvData[0]);
   return (csvData);
  }
  else {
    return "CSV file hasn't been loaded";
  }
  
};


export const search: REPLFunction = (searchCommands: Array<string>): string[][] | string=> {

  const columnIdentifier = searchCommands[1];
  const searchValue = searchCommands[2];
  const result: string[][] = []; 

  if (searchCommands.length !== 3) {
    return "Invalid Input";
  }

  //searching for when columnIdentifier is a number
  if (typeof columnIdentifier === 'number') {
    for (const row of csvData) {
      if (row[columnIdentifier] === searchValue) {
        result.push(row);
      }
    }
  } 
  //searching for when column identifier is a string
  else {
    //checks to see if column identifier matches header
    let colInd = -1;
    for (let i = 0; i < csvData[0].length; i++) {
      if (csvData[0][i] === columnIdentifier) {
        colInd = i;
      }
    
    if (colInd != -1) {
      for (let j = 1; j < csvData.length; j++) {
            // Check if the value in the column identified by the index matches the searchValue
          if (csvData[j][colInd] === searchValue) {
              result.push(csvData[j]);
            }
          }
      }
      else {
        return ("Could not find any rows matching your criteria");
      }
    }
  }
  return result;
};