import React, { useState, useEffect } from "react";
import GridComp from "../components/OperationAnimationComponents/GridComponent";

function OperationListScreen({ isBalance }) {
  const [moves, setMoves] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [showDowloadManifestButton, setShowDowloadManifestButton] =
    useState(false);

  useEffect(() => {
    if (isBalance) {
      fetchBalanceData();
    }
  }, [isBalance]); // This effect runs only when isBalance changes

  const fetchBalanceData = () => {
    fetch("http://127.0.0.1:5000/balance")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Balance data:", data);
        setMoves(data.listOfMoves);
        setCurrentIndex(0);
        setIsDone(false);
        if (currentIndex >= moves.length - 2) {
          setIsDone(true);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const goToNextMove = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length - 1));
    // Check if the next move is the last move to enable the "done" button
    if (currentIndex >= moves.length - 2) {
      setIsDone(true);
    }
  };

  const goToPreviousMove = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setIsDone(false); // Disable "done" button when navigating to a previous move
  };

  const handleDoneClick = () => {
    console.log("User clicked 'Done' for the final move.");
    setCurrentIndex(moves.length);
    setShowDowloadManifestButton(true); // Enable the new button
  };

  const handleDowloadManifestButtonClick = () => {
    fetch("http://127.0.0.1:5000/downloadUpdatedManifest")
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not ok.");
      })
      .then((blob) => {
        // Create a new URL for the blob
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;

        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const currentMove = moves.length > 0 ? moves[currentIndex] : null;

  return (
    <div style={containerStyle}>
      <GridComp currentMove={currentMove} moveNum={currentIndex} />

      <div>
        {moves.length > 0 && (
          <>
            <div>
              Move {currentIndex + 1} of {moves.length}
            </div>
            <button onClick={goToPreviousMove} disabled={currentIndex === 0}>
              Previous
            </button>
            <button
              onClick={goToNextMove}
              disabled={currentIndex >= moves.length - 1}
            >
              Next
            </button>
            {isDone && <button onClick={handleDoneClick}>Done</button>}
          </>
        )}

        {showDowloadManifestButton && (
          <button onClick={handleDowloadManifestButtonClick}>
            Download updated manifest
          </button>
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
