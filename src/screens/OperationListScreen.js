import React, { useState, useEffect } from "react";
import GridComp from "../components/OperationAnimationComponents/GridComponent";
// Import a loading spinner component (you can use any spinner of your choice)
import Spinner from "../components/OperationAnimationComponents/Spinner";

function OperationListScreen({ isBalance }) {
  const [moves, setMoves] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const [showDowloadManifestButton, setShowDowloadManifestButton] =
    useState(false);

  useEffect(() => {
    if (isBalance) {
      fetchBalanceData();
    }
  }, [isBalance]);

  const fetchBalanceData = () => {
    setIsLoading(true); // Set loading to true when the fetch starts
    fetch("http://127.0.0.1:5000/balance")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMoves(data.listOfMoves);
        setCurrentIndex(0);
        setIsDone(data.listOfMoves.length <= 1);
        if (currentIndex === moves.length - 2) {
          setIsDone(true);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when the fetch completes
      });
  };

  const goToNextMove = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length - 1));
    // Adjust the setIsDone logic here as well
    if (currentIndex === moves.length - 2 || moves.length === 1) {
      setIsDone(true);
    }
  };

  const goToPreviousMove = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setIsDone(false); // Disable "done" button when navigating to a previous move
  };

  const handleDoneClick = () => {
    // console.log("User clicked 'Done' for the final move.");
    setCurrentIndex(moves.length);
    setShowDowloadManifestButton(true); // Enable the new button
    setIsDone(true);
  };

  const handleDowloadManifestButtonClick = () => {
    console.log("Requesting outbound manifest name");
    fetch("http://127.0.0.1:5000/getOutboundName")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Network response was not ok for getting manifest name."
        );
      })
      .then((data) => {
        const fileName = data.fileName; // Extract the filename from the response
        console.log("Downloading:", fileName);

        fetch("http://127.0.0.1:5000/downloadUpdatedManifest")
          .then((response) => {
            if (response.ok) {
              return response.blob();
            }
            throw new Error(
              "Network response was not ok for downloading manifest."
            );
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName; // Set the filename from the /getOutboundName response
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("There was a problem getting the manifest name:", error);
      });
  };

  const currentMove = moves.length > 0 ? moves[currentIndex] : null;

  return (
    <div style={containerStyle}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div>
          <GridComp currentMove={currentMove} moveNum={currentIndex} />

          <div>
            {moves.length > 0 && (
              <>
                <div>
                  Move {currentIndex + 1} of {moves.length}
                </div>
                {!isDone && ( // Conditional rendering based on isDone
                  <>
                    <button
                      onClick={goToPreviousMove}
                      disabled={currentIndex === 0}
                    >
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
      )}
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
