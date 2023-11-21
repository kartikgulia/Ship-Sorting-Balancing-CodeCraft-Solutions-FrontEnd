import React, { useState, useEffect } from "react";

// Top Half
import GridComp from "../components/SelectContainerComponents/GridComponent";
import YourSelectedContainers from "../components/SelectContainerComponents/YourSelectedContainers";

// Bottom Half
import EnterNameOfContainerComponent from "../components/SelectContainerComponents/EnterNameOfContainerComponent";

const SelectContainerScreen = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]); // New state for storing positions

  const handleSelectedItems = (selectedItems, positions) => {
    setSelectedNames(selectedItems);
    setSelectedPositions(positions); // Update positions state
  };

  const [namesFromTruck, setNamesFromTruck] = useState([]);

  const handleNamesUpdate = (newNamesFromTruck) => {
    console.log("Names from EnterNameOfContainerComponent:", newNamesFromTruck);
    setNamesFromTruck(newNamesFromTruck);
  };

  useEffect(() => {
    console.log("Selected Names:", selectedNames);
    console.log("Selected Positions:", selectedPositions);
  }, [selectedNames, selectedPositions]);

  const sendTransferInfo = async () => {
    try {
      console.log(selectedNames);
      const response = await fetch("http://127.0.0.1:5000/sendTransferInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          selectedNames: namesFromTruck,
          selectedPositions: selectedPositions,
        }),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Response:", jsonResponse);
        // Handle success response
      } else {
        // Handle non-success response
        console.error("Request failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  return (
    <div>
      <div style={containerStyle}>
        <GridComp onSelectedItemsChange={handleSelectedItems} />
        <YourSelectedContainers selectedNames={selectedNames} />
      </div>

      <EnterNameOfContainerComponent onNamesUpdate={handleNamesUpdate} />

      <button onClick={sendTransferInfo}>Send Transfer Info</button>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "row", // Change to row for side-by-side layout
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  height: "50vh", // Full viewport height
};

export default SelectContainerScreen;
