import React, { useState, useEffect } from "react";
import GridComp from "../components/SelectContainerComponents/GridComponent";
import EnterNameOfContainerComp from "../components/SelectContainerComponents/EnterNameOfContainerComponent";

const SelectContainerScreen = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]); // New state for storing positions

  const handleSelectedItems = (selectedItems, positions) => {
    setSelectedNames(selectedItems);
    setSelectedPositions(positions); // Update positions state
  };

  useEffect(() => {
    console.log("Selected Names:", selectedNames);
    console.log("Selected Positions:", selectedPositions);
  }, [selectedNames, selectedPositions]);
  return (
    <div style={containerStyle}>
      <GridComp onSelectedItemsChange={handleSelectedItems} />
      <EnterNameOfContainerComp selectedNames={selectedNames} />
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "row", // Change to row for side-by-side layout
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  height: "100vh", // Full viewport height
};

export default SelectContainerScreen;
