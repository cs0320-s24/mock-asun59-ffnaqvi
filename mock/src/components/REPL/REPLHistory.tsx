import React from "react";
import "../../styles/main.css";

interface REPLHistoryProps {
  history: (string | string[])[];
  mode: string;
  command : string;
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((historyItem, index) => {
        if (typeof historyItem === "string") {
          // if (props.mode === "brief") {
            return <pre key={index}>{historyItem}</pre>;
          // } else {
          //   return (
          //     <div key={index}>
          //       {/* <pre>Command: {props.command}</pre> */}
          //       <pre key={index}>Output: {historyItem}</pre>
          //     </div>
          //   );
          // }
        } else {
          if (props.mode === "brief") {
            return (
              <div key={index}>
                <table>
                  <tbody>
                    {historyItem[0].length === 0 ? (
                      <tr><td>&nbsp;</td></tr>
                    ) : (
                      historyItem.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Array.isArray(row) ? (
                            row.map((item, itemIndex) => (
                              <td key={itemIndex}>{item}</td>
                            ))
                          ) : (
                            <td key={rowIndex}>{row}</td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            );
          } else {
            return (
              <div key={index}>
                {/* <pre>Command: {props.command}</pre> */}
                {/* <pre>Output:</pre> */}
                <table>
                  <tbody>
                    {historyItem[0].length === 0 ? (
                      <tr><td>&nbsp;</td></tr>
                    ) : (
                      historyItem.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Array.isArray(row) ? (
                            row.map((item, itemIndex) => (
                              <td key={itemIndex}>{item}</td>
                            ))
                          ) : (
                            <td key={rowIndex}>{row}</td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            );
          }
        }
      })}
    </div>
  );
}

