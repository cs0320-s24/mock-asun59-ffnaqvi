import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";
import { InputHandler } from "./callCommand";

import { REPLHistory } from "./REPLHistory";
import React from "react";

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>; //would cutomize the type
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

export function REPLInput(props: REPLInputProps) {

  const [commandString, setCommandString] = useState<string>("");

  function handleClick(commandString: string) {
    let output;
    if (commandString === "mode") { // Should mode be in a handler or here?
      props.setMode(props.mode === "brief" ? "verbose" : "brief");
      output = "Mode switched";
    } 
    else {
      const commandArray: string[] = commandString.split(" ");
      output = InputHandler.handleCommand(commandArray); 
      console.log("output is: " + output);
      if (props.mode==="verbose"){
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
      <text>Current mode is: {props.mode}</text>
    </div>
  );
}
