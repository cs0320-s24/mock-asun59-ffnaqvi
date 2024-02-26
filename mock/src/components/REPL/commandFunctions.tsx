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

  return <div></div>;
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
      return "Invalid input, please enter the name of a csv file to load.";
 
  }
  const fileName = loadFile[1];

  const loadedData = fileDictionary.get(fileName);
  if (loadedData && loadedData[0][0]!="invalid File path" && loadedData[0][0]!="Data is malformed") {
    load_status = 200;
    csvData = loadedData;
      return "File successfully loaded";
  } 
  else {
      return "Failed to load file";  
  }
};

export const view: REPLFunction = (viewFile: Array<string>): string[][] | string => {
  if (viewFile.length!=1){
    return "Invalid Input"
  }
  if (load_status == 200) {
  
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
  let colInd = -1;

  if (searchCommands.length !== 3) {
      return "Invalid input, please enter the column identifier and search value separated by a space";
   
  }
  
  //searching for when columnIdentifier is a number
  // colInd = parseInt(columnIdentifier);
  // if (Number.isNaN(colInd)) {
  //   for (let i = 0; i < csvData[0].length; i++) {
  //     if (csvData[0][i] === columnIdentifier) {
  //       colInd = i;
  //     }
  //   }
  // }
  // if (colInd != -1) {
  //   for (let i = 0; i < csvData.length; i ++) {
  //     if (csvData[i][colInd] === searchValue) {
  //       result.push(csvData[i]);
  //     }
  //   }
  // }
  // else {
   
  //     return "Your column identifier is not valid.";
   
  // }
  // if (result.length == 0) {
    
  //     return "Could not find any rows matching your search criteria.";
   
  // }
  //randomly push the second row to search
  if (csvData.length >= 0) {
          result.push(csvData[0]);
  }
  
  return result;
    
   
};