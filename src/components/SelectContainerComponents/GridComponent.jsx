import React, { useState, useEffect } from "react";
import ContainerComponent from "./ContainerComponent";

export default function GridComp({ onSelectedItemsChange }) {
  // State for the dynamic grid data
  const [gridData, setGridData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchGridInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/getGridInfo");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();

      // Process and update gridData state
      const processedGrid = data.grid;
      setGridData(processedGrid);
      console.log(processedGrid);
      // Update selectedItems state based on the new gridData
      const newSelectedItems = processedGrid.map((row) => row.map(() => false));
      setSelectedItems(newSelectedItems);
    } catch (error) {
      console.error("Error fetching grid info:", error);
    }
  };

  useEffect(() => {
    fetchGridInfo();
  }, []);

  const handleItemClick = (rowIndex, colIndex) => {
    const newState = selectedItems.map((row, rIndex) =>
      row.map((item, cIndex) => {
        if (rIndex === rowIndex && cIndex === colIndex) {
          return !item;
        }
        return item;
      })
    );
    setSelectedItems(newState);

    const selectedNames = [];
    const positions = [];
    gridData.forEach((row, rIndex) => {
      row.forEach((item, cIndex) => {
        if (newState[rIndex][cIndex]) {
          selectedNames.push(item.name);
          positions.push({
            rowIndex: item.position[0],
            colIndex: item.position[1],
          });
        }
      });
    });

    // Call the callback function with the selected names and their positions
    onSelectedItemsChange(selectedNames, positions);
  };

  return (
    <div style={gridStyle}>
      {gridData.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((item, colIndex) => (
            <ContainerComponent
              key={`${rowIndex}-${colIndex}`}
              value={item.name}
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
  margin: "20px",
};
