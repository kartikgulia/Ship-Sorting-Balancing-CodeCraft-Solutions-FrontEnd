import React from "react";

function OperationListScreen({ isBalance }) {
  const handleButtonClick = () => {
    fetch("http://127.0.0.1:5000/balance")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Balance data:", data);
        // Process the data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Get Balance</button>
    </div>
  );
}

export default OperationListScreen;
