import "../../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "../ControlledInput";
import { InputHandler } from "./handCommands";

import { REPLHistory } from "./REPLHistory";
import React from "react";

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<String[]>>; //would cutomize the type
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [mode, setMode] = useState<string>("brief"); //true means brief

  function handleClick(commandString: string) {
    let output: string;
    if (commandString === "mode") { // Should mode be in a handler or here?
      setMode(mode === "brief" ? "verbose" : "brief");
      output = `Now in ${mode} mode`;
    } else {
      const commandArray: string[] = commandString.split(" ");
      output = InputHandler.handleCommand(commandArray).toString(); // might need to change this
    }

    props.setHistory([...props.history, output]);
    setCommandString("");
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleClick(commandString)}>Submit </button>
      <text>Current mode is: {mode}</text>
    </div>
  );
}
