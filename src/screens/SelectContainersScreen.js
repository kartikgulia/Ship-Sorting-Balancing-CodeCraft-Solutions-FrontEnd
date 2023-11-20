import React from "react";
import GridComp from "../components/SelectContainerComponents/GridComponent";
import EnterNameOfContainerComp from "../components/SelectContainerComponents/EnterNameOfContainerComponent";

const SelectContainerScreen = () => {
  return (
    <div style={containerStyle}>
      <GridComp />
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
