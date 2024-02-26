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

          return <pre key={index}>{historyItem}</pre>; 
        } else {
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