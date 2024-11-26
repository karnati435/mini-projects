//single selection
//multiple selection

import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMutiple = [...multiple];
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMutiple);
  }

  console.log(selected, multiple);
  return (
    <div className="acc-wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )}
              {/* {selected === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}

// Multiple selection with out button


// import React, { useState } from "react";
// import data from "./data";

// function Accordine() {
//   const [selectedItems, setSelectedItems] = useState([]);

//   function handleSelect(id) {
//     if (selectedItems.includes(id)) {
//       // If already selected, remove it
//       setSelectedItems(selectedItems.filter((item) => item !== id));
//     } else {
//       // Otherwise, add it
//       setSelectedItems([...selectedItems, id]);
//     }
//   }

//   return (
//     <>
//       <div className="wrapper">
//         <div className="accordin">
//           {data && data.length > 0 ? (
//             data.map((item, index) => (
//               <div key={index}>
//                 <div
//                   onClick={() => handleSelect(item.id)}
//                   className="accordin-title"
//                 >
//                   <h3>{item.question}</h3>
//                   <span>{selectedItems.includes(item.id) ? "-" : "+"}</span>
//                 </div>
//                 {selectedItems.includes(item.id) && (
//                   <div className="accordin-content">
//                     <p>{item.answer}</p>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No data available</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Accordine;
