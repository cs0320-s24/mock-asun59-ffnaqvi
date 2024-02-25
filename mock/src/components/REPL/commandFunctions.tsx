import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import React from "react";
import { fileDictionary } from "../data/mockData";
import getHistory from "./REPL.tsx";
// import getMode from "./REPL.tsx";
// import getModeSetter from "./REPL.tsx";

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
 

let const modesProps: string;
let const setModesProps: Dispatch<SetStateAction<string>>;
let const historyProps: string[];
let const setHistoryprops: Dispatch<SetStateAction<string[]>>; //would cutomize the type
//TODO: make a constructor that takes in the useState as a parameter
export function CommandFunctions(props: REPLInputProps) {
   const modesProps: string = props.mode;
   const setModesProps: Dispatch<SetStateAction<string>> = props.setMode;
   const historyProps: string[] = props.history;
   const setHistoryprops: Dispatch<SetStateAction<string[]>> = props.setHistory; //would cutomize the type
 

  return <div>{/* JSX content here */}</div>;
}


const mode: REPLFunction = (modeArray: Array<string>): String => {
  if (modeArray.length != 1) {
    return "Invalid Input";
  }
  setMode(modesProps === "brief" ? "verbose" : "brief");
  return "Mode Switched";
};

//okay did it end up working? ayyayay thanks!!!
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
export const view: REPLFunction = (viewFile: Array<string>): String => {
  // const history = getHistory();
  // // Iterate through history in reverse order
  // for (let i = history.length - 1; i >= 0; i--) {
  //   // Process each history item as needed
  //   const historyItem = history[i];
  //   // Assuming each history item is an array of strings
  //   recentCalls.push(historyItem);
  // }

  //   return (
  //     <div className="repl-history">
  //         {/* This is where command history will go */            }
  //         {/* TODO: To go through all the pushed commands... try the .map() function! */}
  //         {
  //             props.history.map(
  //                 (command, index) => <p>{command}</p>
  //             )}
  //     </div>
  // );
  return "hello";
};