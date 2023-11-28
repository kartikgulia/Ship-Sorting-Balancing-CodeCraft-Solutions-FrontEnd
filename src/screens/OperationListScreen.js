import React, { useState } from "react";
import GridComp from "../components/OperationAnimationComponents/GridComponent";

function OperationListScreen({ isBalance }) {
  const [moves, setMoves] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        setMoves(data.listOfMoves); // Assuming data.listOfOperations is the array of moves
        setCurrentIndex(0); // Reset to the first move
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const goToNextMove = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length - 1));
  };

  const goToPreviousMove = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const currentMove = moves.length > 0 ? moves[currentIndex] : null;

  return (
    <div style={containerStyle}>
      <GridComp currentMove={currentMove} />

      <button onClick={handleButtonClick}>Get Balance</button>
      <div>
        {moves.length > 0 && (
          <>
            <div>
              Move {currentIndex + 1} of {moves.length}
            </div>
            <div>{JSON.stringify(moves[currentIndex])}</div>
            <button onClick={goToPreviousMove} disabled={currentIndex === 0}>
              Previous
            </button>
            <button
              onClick={goToNextMove}
              disabled={currentIndex === moves.length - 1}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OperationListScreen;

const containerStyle = {
  display: "flex",
  flexDirection: "column", // Changed to column for vertical layout
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
