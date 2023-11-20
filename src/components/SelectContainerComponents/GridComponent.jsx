import React, { useState, useEffect } from "react";
import ContainerComponent from "./ContainerComponent";

export default function GridComp({ gridData }) {
  // Initialize and update state as previously described
  // Initialize state for the 8x12 grid, skipping the first row and first column
  const initialGridState = gridData
    .slice(1) // Skip the first row
    .map((row) => row.slice(1).map(() => false)); // Skip the first column of each row
  const [selectedItems, setSelectedItems] = useState(initialGridState);

  //   useEffect(() => {
  //     console.log(selectedItems); // This will log the updated state
  //   }, [selectedItems]); // The effect runs whenever selectedItems changes

  const handleItemClick = (rowIndex, colIndex) => {
    const newState = selectedItems.map((row, rIndex) =>
      row.map((item, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return !item; // Toggle the state
        }
        return item;
      })
    );
    setSelectedItems(newState);
  };

  return (
    <div style={gridStyle}>
      {gridData.slice(1).map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.slice(1).map((item, colIndex) => (
            <ContainerComponent
              key={`${rowIndex}-${colIndex}`}
              value={item}
              isSelected={selectedItems[rowIndex][colIndex]}
              onClick={() => handleItemClick(rowIndex, colIndex)}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)", // 12 columns
  gridTemplateRows: "repeat(8, 1fr)", // 8 rows
  gap: "10px", // Optional: Space between grid items
};

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
  cursor: "pointer",
  textAlign: "center",
};

const selectedStyle = {
  ...cellStyle,
  backgroundColor: "green", // Green background for selected items
};
