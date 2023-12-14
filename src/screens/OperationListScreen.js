import React, { useState, useEffect } from "react";
import GridComp from "../components/OperationAnimationComponents/GridComponent";
// Import a loading spinner component (you can use any spinner of your choice)
import Spinner from "../components/OperationAnimationComponents/Spinner";
import Home from './home';

function OperationListScreen({ isBalance }) {
  const [moves, setMoves] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const [showDowloadManifestButton, setShowDowloadManifestButton] =
    useState(false);

  const [showWeightInput, setShowWeightInput] = useState(false); // State to control the display of the weight input
  const [weight, setWeight] = useState(""); // State to hold the entered weight

  useEffect(() => {
    if (isBalance) {
      fetchBalanceData();
    } else {
      fetchTransferData();
    }
  }, [isBalance]);

  const resetFilesForNewShip = () => {
    fetch("http://127.0.0.1:5000/resetFilesForNewShip", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Success:", data);
        if (alert("Please Remember to Email the Manifest to the captain"))
         {return <Home/>};
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  const fetchTransferData = () => {
    setIsLoading(true); // Set loading to true when the fetch starts
    fetch("http://127.0.0.1:5000/transfer")
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

  const propagateWeights = () => {
    if (currentIndex < moves.length) {
      const currentMoveFrom = moves[currentIndex][0];
      const currentMoveTo = moves[currentIndex][1];
      const nextMoveNum = currentIndex + 1;

      const url = "http://127.0.0.1:5000/propagateWeights";
      const data = {
        fromRow: currentMoveFrom[0],
        fromCol: currentMoveFrom[1],
        toRow: currentMoveTo[0],
        toCol: currentMoveTo[1],
        moveNum: nextMoveNum,
        totalNumMoves: moves.length,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  const goToNextMove = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length - 1));
    propagateWeights();
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

    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length));
    propagateWeights();
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

  useEffect(() => {
    console.log("Current Move:", currentMove);
  }, [currentMove]);

  const checkCurrentMove = (move) => {
    if (
      move &&
      move[0] &&
      Array.isArray(move[0]) &&
      move[0][0] === 0 &&
      move[0][1] === 0
    ) {
      console.log("coming from truck");
      setShowWeightInput(true); // Show the weight input
    } else {
      setShowWeightInput(false); // Hide the weight input
    }
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value); // Update the weight state when the input changes
  };

  const submitWeight = () => {
    const url = "http://127.0.0.1:5000/updateWeight";
    const data = {
      weight: weight,
      row: currentMove[1][0],
      column: currentMove[1][1],
      moveNum: currentIndex,
    }; // Construct data object with the weight

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    checkCurrentMove(currentMove); // Call the function within useEffect
  }, [currentMove]); // Dependency array ensures this runs whenever currentMove changes

  return (
    <div style={containerStyle}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div>
          <GridComp currentMove={currentMove} moveNum={currentIndex} />

          {/* Conditionally render the weight input and submit button */}
          {showWeightInput && (
            <div style={{ marginTop: "20px" }}>
              <label>Enter weight: </label>
              <input
                type="text"
                value={weight}
                onChange={handleWeightChange}
                style={{ marginLeft: "10px" }}
              />
              <button onClick={submitWeight} style={{ marginLeft: "10px" }}>
                Submit
              </button>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            {moves.length > 0 && (
              <>
                <div>
                  Move {currentIndex + 1} of {moves.length}
                </div>
                {!isDone && (
                  <>
                    {/* <button
                      onClick={goToPreviousMove}
                      disabled={currentIndex === 0}
                    >
                      Previous
                    </button> */}
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
              <div>
                <button onClick={handleDowloadManifestButtonClick}>
                  Download updated manifest
                </button>
                <button onClick={resetFilesForNewShip}>
                  Reset Files for New Ship
                </button>
              </div>
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
