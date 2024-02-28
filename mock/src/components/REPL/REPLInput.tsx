import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";
import { InputHandler } from "./callCommand";
import React from "react";

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>; 
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  
}
export let commandStr: string = "";
export function REPLInput(props: REPLInputProps) {

  const [commandString, setCommandString] = useState<string>("")

  function handleClick(commandString: string) {
    let output;
    let commandLine;

    const commandArray: string[] = commandString.split(" ");
    commandStr = commandArray[0];
    output = InputHandler.handleCommand(commandArray);

    if (props.mode === 'verbose') {
    
      commandLine = "Command: " + commandStr + "\nOutput: ";
      props.setHistory([...props.history, commandLine, output]);
    }
    else {
      props.setHistory([...props.history, output]);
    }
   
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button aira-label = "Submit" onClick={() => handleClick(commandString)}>Submit </button>
      <text>Current mode is: {props.mode}</text>
    </div>
  );
}

