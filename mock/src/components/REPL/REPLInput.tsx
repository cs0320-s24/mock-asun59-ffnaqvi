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
export let command: string = "";
export function REPLInput(props: REPLInputProps) {

  const [commandString, setCommandString] = useState<string>("")

  function handleClick(commandString: string) {
    let output;

    const commandArray: string[] = commandString.split(" ");
    command = commandArray[0];
    output = InputHandler.handleCommand(commandArray); 
    props.setHistory([...props.history, output]);
   
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
      <button onClick={() => handleClick(commandString)}>Submit </button>
      <text>Current mode is: {props.mode}</text>
    </div>
  );
}

