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
 

let modesProps: string;
let setModesProps: Dispatch<SetStateAction<string>>;
let historyProps: string[];
let setHistoryProps: Dispatch<SetStateAction<string[]>>;
let csvData: string[][] | undefined;
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

export const load: REPLFunction = (loadFile: Array<string>): String => {
  if (loadFile.length != 2) {
    return "Invalid Input";
  }
  const fileName = loadFile[1];

  if (fileDictionary.has(fileName)) {
    load_status = 200;
    csvData = fileDictionary.get(fileName)
    return "File successfully loaded";
  } else {
    return "Failed to load file";
  }
};

export const view: REPLFunction = (viewFile: Array<string>): string[][] => {
  if (!csvData || csvData.length === 0) {
    return []; // Return empty array if CSV data is empty or undefined
  }

  // Generate table rows and cells
  const tableRows = csvData.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  // Return the HTML table
  // return (
  //   <table>
  //     <tbody>{tableRows}</tbody>
  //   </table>
  // );
  return (csvData);
};