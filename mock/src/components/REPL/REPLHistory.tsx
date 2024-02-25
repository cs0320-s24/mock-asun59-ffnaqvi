import React from "react";
import "../../styles/main.css";

interface REPLHistoryProps {
  history: string[];
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((command, index) => (
        <pre>{command}</pre> //might need to change
      ))}
    </div>
  );
}

