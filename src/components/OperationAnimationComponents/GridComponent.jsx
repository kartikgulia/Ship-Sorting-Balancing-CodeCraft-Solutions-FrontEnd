import React, { useState, useEffect } from "react";
import ContainerComponent from "../SelectContainerComponents/ContainerComponent";

export default function GridComp({ currentMove }) {
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
      //   console.log(processedGrid);
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
          {row.map((item, colIndex) => {
            // Determine if this is the start position
            const isStartPos =
              currentMove &&
              currentMove[0][0] === item.position[0] &&
              currentMove[0][1] === item.position[1];

            const isEndPos =
              currentMove &&
              currentMove[1][0] === item.position[0] &&
              currentMove[1][1] === item.position[1];
            return (
              <ContainerComponent
                key={`${rowIndex}-${colIndex}`}
                value={item.name}
                startPos={isStartPos}
                endPos={isEndPos}
              />
            );
          })}
        </React.Fragment>
      ))}

      {currentMove && (
        <div>
          Current Move: From [{currentMove[0].join(", ")}] to [
          {currentMove[1].join(", ")}]
        </div>
      )}
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
