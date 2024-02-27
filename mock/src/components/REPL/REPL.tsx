import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput, commandStr } from "./REPLInput";
import React from "react";
import { CommandFunctions } from "./commandFunctions";

export default function REPL() {
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("brief");

  return (
    <div className="repl">
      <REPLHistory 
        history={history} 
        mode = {mode}
        command = {commandStr}/>
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
      />

      <CommandFunctions
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}
