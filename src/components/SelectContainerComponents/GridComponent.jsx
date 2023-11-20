import React, { useState } from "react";

export default function GridComp({ gridData }) {
  // Initialize state for the 8x12 grid, skipping the first row and first column
  const initialGridState = gridData
    .slice(1) // Skip the first row
    .map((row) => row.slice(1).map(() => false)); // Skip the first column of each row
  const [selectedItems, setSelectedItems] = useState(initialGridState);

  // Function to handle item click
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
            <div
              key={`${rowIndex}-${colIndex}`}
              style={
                selectedItems[rowIndex][colIndex] ? selectedStyle : cellStyle
              }
              onClick={() => handleItemClick(rowIndex, colIndex)}
            >
              {item}
            </div>
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
