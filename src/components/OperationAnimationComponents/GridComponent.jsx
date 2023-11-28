import React, { useState, useEffect } from "react";
import ContainerComponent from "./ContainerComponent";

export default function GridComp() {
  // State for the dynamic grid data
  const [gridData, setGridData] = useState([]);

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
    } catch (error) {
      console.error("Error fetching grid info:", error);
    }
  };

  useEffect(() => {
    fetchGridInfo();
  }, []);

  return (
    <div style={gridStyle}>
      {gridData.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((item, colIndex) => (
            <ContainerComponent
              key={`${rowIndex}-${colIndex}`}
              value={item.name}
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
