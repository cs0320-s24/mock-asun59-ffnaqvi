import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import React from "react";

export default function REPL() {
  const [history, setHistory] = useState<string[]>([]);
  const getHistory = (): string[] => {
    return history;
  };
  return (
    <div className="repl">
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput history={history} setHistory={setHistory} />
    </div>
  );
}
