import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";
import { InputHandler } from "./callCommand";

import { REPLHistory } from "./REPLHistory";
import React from "react";

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>; //would cutomize the type
}
export function REPLInput(props: REPLInputProps) {

  const [commandString, setCommandString] = useState<string>("");
  const [mode, setMode] = useState<string>("brief"); //true means brief

  function handleClick(commandString: string) {
    let output: string;
    if (commandString === "mode") { // Should mode be in a handler or here?
      setMode(mode === "brief" ? "verbose" : "brief");
      output = "Mode switched";
    } else {
      const commandArray: string[] = commandString.split(" ");
      output = InputHandler.handleCommand(commandArray).toString(); // might need to change this
      if (mode==="verbose"){
        output = "Command: "+ commandArray[0] + "\n Output: " + output;
      }
    }

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
      <text>Current mode is: {mode}</text>
    </div>
  );
}
