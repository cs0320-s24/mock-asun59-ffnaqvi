import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import "../../styles/main.css";
import React from "react";
import { fileDictionary, searchDictionary } from "../data/mockData";


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
      // Return backend specific error response
      if(loadedData){
        return loadedData[0][0];
      }
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
  
  if (searchCommands.length !== 3) {
      return "Invalid input, please enter the column identifier and search value separated by a space";
  }
  const commandString = searchCommands[0]+searchCommands[1]+searchCommands[2];
  const output = searchDictionary.get(commandString);
  console.log(output);
  console.log(searchCommands);
  if (load_status ==200 && output && output[0][0] != "Invalid Index Number") {
    return output;
  }
  else{
    if(output){
      return output[0][0];
    }
    return "File failed to search";
  }
   
};