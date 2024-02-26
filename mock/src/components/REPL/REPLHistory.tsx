// import React from "react";
// import "../../styles/main.css";

// interface REPLHistoryProps {
//   history: string[];
// }
// export function REPLHistory(props: REPLHistoryProps) {
//   return (
//     <div className="repl-history">
//       {props.history.map((command, index) => (
//         <pre>{command}</pre> //might need to change
//       ))}
//     </div>
//   );
// }

import React from "react";
import "../../styles/main.css";

interface REPLHistoryProps {
  history: (string | string[])[];
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((historyItem, index) => {
        if (typeof historyItem === "string") {
          console.log(typeof historyItem);
          console.log("in repl history if case")
          return <pre key={index}>{historyItem}</pre>; 
        } else {
          console.log("in repl history else case");
          return (
            <div key={index}>
              <table>
                <tbody>
                  {historyItem.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.isArray(row) ? (
                        row.map((item, itemIndex) => (
                          <td key={itemIndex}>{item}</td>
                        ))
                      ) : (
                        <td key={rowIndex}>{row}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      })}
    </div>
  );
}