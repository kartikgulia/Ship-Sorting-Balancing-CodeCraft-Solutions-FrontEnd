import React, { useState, useEffect } from "react";
import GridComp from "../components/OperationAnimationComponents/GridComponent";
import Spinner from "../components/OperationAnimationComponents/Spinner";

function OperationListScreen({ isBalance }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDowloadManifestButton, setShowDowloadManifestButton] =
    useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weight, setWeight] = useState("");

  const [moveCoordinates, setMoveCoordinates] = useState([]);
  const [names, setNames] = useState([]);
  const [times, setTimes] = useState([]);
  const [timesRemaining, setTimesRemaining] = useState([]);

  useEffect(() => {
    fetchOperationData(isBalance);
  }, []);

  const resetFilesForNewShip = () => {
    fetch("http://127.0.0.1:5000/resetFilesForNewShip", {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          alert("Please Remember to Email the Manifest to the captain");
          window.location.reload();
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Please Remember to Email the Manifest to the captain");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchOperationData = (isBalance) => {
    setIsLoading(true);

    // The data to be sent in the request
    const requestData = {
      isBalance: isBalance,
    };

    console.log(requestData);

    // Using fetch with POST method
    fetch("http://127.0.0.1:5000/fetchOperationData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMoveCoordinates(data.moveCoordinates);
        setNames(data.names);
        setTimes(data.times);
        setTimesRemaining(data.timesRemaining);

        console.log("Info from backend");
        console.log(names);
        console.log(times);
        console.log(timesRemaining);
        setCurrentIndex(0);
        setIsDone(
          data.moveCoordinates.length === 0 || data.moveCoordinates.length === 1
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const propagateWeights = () => {
    if (currentIndex < moveCoordinates.length) {
      const currentMoveFrom = moveCoordinates[currentIndex][0];
      const currentMoveTo = moveCoordinates[currentIndex][1];
      const nextMoveNum = currentIndex + 1;

      const url = "http://127.0.0.1:5000/propagateWeights";
      const data = {
        fromRow: currentMoveFrom[0],
        fromCol: currentMoveFrom[1],
        toRow: currentMoveTo[0],
        toCol: currentMoveTo[1],
        moveNum: nextMoveNum,
        totalNumMoves: moveCoordinates.length,
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
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, moveCoordinates.length - 1)
    );
    propagateWeights();
    if (
      currentIndex === moveCoordinates.length - 2 ||
      moveCoordinates.length === 1
    ) {
      setIsDone(true);
    }
  };

  // const goToPreviousMove = () => {
  //   setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  //   setIsDone(false);
  // };

  const handleDoneClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, moveCoordinates.length)
    );
    propagateWeights();
    setShowDowloadManifestButton(true);
    setIsDone(true);
  };

  const handleDowloadManifestButtonClick = async () => {
    console.log("Requesting outbound manifest name");
    try {
      const nameResponse = await fetch("http://127.0.0.1:5000/getOutboundName");
      if (!nameResponse.ok) {
        throw new Error(
          "Network response was not ok for getting manifest name."
        );
      }
      const nameData = await nameResponse.json();
      const fileName = nameData.fileName;
      console.log("Downloading:", fileName);

      const manifestResponse = await fetch(
        "http://127.0.0.1:5000/downloadUpdatedManifest"
      );
      if (!manifestResponse.ok) {
        throw new Error(
          "Network response was not ok for downloading manifest."
        );
      }
      const blob = await manifestResponse.blob();

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Call resetFilesForNewShip after successful manifest download
      resetFilesForNewShip();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const currentMove =
    moveCoordinates.length > 0 ? moveCoordinates[currentIndex] : null;

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
      setShowWeightInput(true);
    } else {
      setShowWeightInput(false);
    }
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const submitWeight = () => {
    const url = "http://127.0.0.1:5000/updateWeight";
    const data = {
      weight: weight,
      row: currentMove[1][0],
      column: currentMove[1][1],
      moveNum: currentIndex,
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
  };

  useEffect(() => {
    checkCurrentMove(currentMove);
  }, [currentMove]);

  return (
    <div style={containerStyle}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div>
          <GridComp currentMove={currentMove} moveNum={currentIndex} />

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
            {moveCoordinates.length > 0 && (
              <>
                <div>
                  Move {currentIndex + 1} of {moveCoordinates.length}
                </div>
                {!isDone && (
                  <button
                    onClick={goToNextMove}
                    disabled={currentIndex === moveCoordinates.length - 1}
                  >
                    Next
                  </button>
                )}
              </>
            )}

            {/* Render 'Done' button when moves.length is 0 or isDone is true */}
            {(moveCoordinates.length === 0 || isDone) && (
              <button onClick={handleDoneClick}>Done</button>
            )}

            {showDowloadManifestButton && (
              <div>
                <button onClick={handleDowloadManifestButtonClick}>
                  Download updated manifest
                </button>
                {/* <button onClick={resetFilesForNewShip}>
                  Reset Files for New Ship
                </button> */}
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
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
