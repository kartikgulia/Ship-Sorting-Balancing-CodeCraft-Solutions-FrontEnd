import React, { useState, useEffect } from "react";
import GridComp from "../components/SelectContainerComponents/GridComponent";
import EnterNameOfContainerComp from "../components/SelectContainerComponents/EnterNameOfContainerComponent";

const SelectContainerScreen = () => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedNames(selectedItems);
  };

  useEffect(() => {
    console.log(selectedNames); // Log out selected names whenever they change
  }, [selectedNames]); // Dependency array includes selectedNames
  return (
    <div style={containerStyle}>
      <GridComp onSelectedItemsChange={handleSelectedItems} />
      <EnterNameOfContainerComp />
      {/* You can use selectedNames here for further processing */}
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
