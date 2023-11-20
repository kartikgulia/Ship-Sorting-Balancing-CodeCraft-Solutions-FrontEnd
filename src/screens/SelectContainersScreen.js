import React from "react";
import GridComp from "../components/SelectContainerComponents/GridComponent";
import EnterNameOfContainerComp from "../components/SelectContainerComponents/EnterNameOfContainerComponent";

const SelectContainerScreen = () => {
  // Generate a 9x13 array of strings
  const gridData = Array.from({ length: 9 }, (_, rowIndex) =>
    Array.from({ length: 13 }, (_, colIndex) => `R${rowIndex}C${colIndex}`)
  );

  return (
    <div style={containerStyle}>
      <GridComp gridData={gridData} />
      <EnterNameOfContainerComp />
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center vertically
  alignItems: "center", // Center horizontally
  height: "100vh", // Full viewport height
};

export default SelectContainerScreen;
