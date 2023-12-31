/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import GridComp from "../components/OperationAnimationComponents/GridComponent";
import Spinner from "../components/OperationAnimationComponents/Spinner";
import Home from "./home";

function OperationListScreen({ isBalance, moveNumFromPowerCut }) {
  const [moves, setMoves] = useState([]);
  const [names, setNames] = useState([]);
  const [times, setTimes] = useState([]);
  const [timesRemaining, setTimesRemaining] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDowloadManifestButton, setShowDowloadManifestButton] =
    useState(false);
  const [showDoneAndTexts, setShowDoneAndTexts] = useState(true);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [weight, setWeight] = useState("");

  const [triggerSave, setTriggerSave] = useState(false);

  useEffect(() => {
    if (isBalance === 1) {
      fetchBalanceData();
    } else if (isBalance == 0) {
      fetchTransferData();
    }
  }, [isBalance]);

  useEffect(() => {
    if (moveNumFromPowerCut >= 0) {
      fetchPowerCutData(moveNumFromPowerCut);
    }
  }, [moveNumFromPowerCut]);
  useEffect(() => {
    if (triggerSave) {
      saveMoveStateInBackendForPowerCut();
      setTriggerSave(false); // Reset the trigger
    }
  }, [triggerSave]); // Dependency array only includes triggerSave

  useEffect(() => {
    if (moves.length - 1 === currentIndex) {
      setIsDone(true);
    }
    console.log(moves.length);
    console.log(currentIndex);
  }, [moves]);
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
        if (alert("Please Remember to Email the Manifest to the captain")) {
          return <Home />;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchPowerCutData = (moveNumFromPowerCut) => {
    console.log("Move number at operations screen: " + moveNumFromPowerCut);
    fetch("http://127.0.0.1:5000/getOperationDataBackFromPowerCut")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMoves(data.moveCoordinates);
        setNames(data.names);
        setTimes(data.times);
        setTimesRemaining(data.timesRemaining);

        console.log("Info from backend");
        console.log(names);
        console.log(times);
        console.log(timesRemaining);
        console.log(names);

        setCurrentIndex(moveNumFromPowerCut);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const fetchBalanceData = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:5000/balance")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMoves(data.moveCoordinates);
        setNames(data.names);
        setTimes(data.times);
        setTimesRemaining(data.timesRemaining);

        console.log("Info from backend");
        console.log(names);
        console.log(times);
        console.log(timesRemaining);
        console.log(names);
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

  const fetchTransferData = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:5000/transfer")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setMoves(data.moveCoordinates);
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

  const saveMoveStateInBackendForPowerCut = () => {
    console.log("Saving state into file in backend");

    fetch("http://127.0.0.1:5000/saveCurrentIndexIntoStateFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentIndex: currentIndex + 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Log entry successful:", data);
      })
      .catch((error) => {
        console.error("Error writing to log:", error);
      });
  };
  const goToNextMove = () => {
    writeToLogDuringTransfer();

    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length - 1));

    propagateWeights();

    if (currentIndex === moves.length - 2 || moves.length === 1) {
      setIsDone(true);
    }

    saveMoveStateInBackendForPowerCut();
  };

  // const goToPreviousMove = () => {
  //   setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  //   setIsDone(false);
  // };

  const handleDoneClick = () => {
    writeToLogDuringTransfer();
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, moves.length));
    saveMoveStateInBackendForPowerCut();
    propagateWeights();
    setShowDowloadManifestButton(true);
    setIsDone(true);
    setShowDoneAndTexts(false); // Hide Done button and h3 texts
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

  const currentMove = moves.length > 0 ? moves[currentIndex] : null;
  const currentName = names.length > 0 ? names[currentIndex] : null;
  const currentTime = times.length > 0 ? times[currentIndex] : null;
  const currentTimeRemaining =
    timesRemaining.length > 0 ? timesRemaining[currentIndex] : null;

  const writeToLogDuringTransfer = () => {
    if (currentMove == null) {
      return;
    }
    const fromPosition = currentMove[0];
    const toPosition = currentMove[1];

    var textForLog;

    // If the coordinate at fromPosition is [0,0], that means we are getting a container from the truck
    if (fromPosition[0] === 0 && fromPosition[1] === 0) {
      textForLog = `"${currentName}" is onloaded`;
    } else if (toPosition[0] === 0 && toPosition[1] === 0) {
      textForLog = `"${currentName}" is offloaded`;
    }

    // Check if textForLog has been set
    if (!textForLog) {
      return;
    }

    // Send POST request to backend
    fetch("http://127.0.0.1:5000/writeTransferToLog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ logText: textForLog }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Log entry successful:", data);
      })
      .catch((error) => {
        console.error("Error writing to log:", error);
      });

    console.log(textForLog);
  };

  useEffect(() => {
    console.log("Current Move:", currentMove);
    console.log(currentIndex);
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
        setWeight(""); // Clear the weight input
        alert("Weight has been saved"); // Show alert
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    checkCurrentMove(currentMove);
  }, [currentMove]);

  const formatMoveDisplay = (move) => {
    let start =
      move[0][0] === 0 && move[0][1] === 0
        ? `${currentName} from Truck`
        : ` ${currentName} at [${move[0].join(", ")}]`;

    let end =
      move[1][0] === 0 && move[1][1] === 0
        ? `Truck`
        : `[${move[1].join(", ")}]`;
    return `Current Move: ${start} to ${end}`;
  };

  return (
    <div style={containerStyle}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div>
          {showDoneAndTexts && (
            <>{currentMove && <h3>{formatMoveDisplay(currentMove)}</h3>}</>
          )}

          <GridComp
            currentMove={currentMove}
            moveNum={currentIndex}
            currentName={currentName}
          />

          {!isLoading && showDoneAndTexts && (
            <div>
              <h3>
                This move will take {currentTime ? `${currentTime}` : "0"}{" "}
                minutes
              </h3>
              <h3>
                There are{" "}
                {currentTimeRemaining ? `${currentTimeRemaining}` : "0"} minutes
                left until all moves are done
              </h3>
            </div>
          )}

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
            {moves.length > 0 && showDoneAndTexts && (
              <>
                <div>
                  Move {currentIndex + 1} of {moves.length}
                </div>
                {!isDone && (
                  <button
                    onClick={goToNextMove}
                    disabled={currentIndex === moves.length - 1}
                  >
                    Next
                  </button>
                )}
              </>
            )}

            {showDoneAndTexts && (moves.length === 0 || isDone) && (
              <button onClick={handleDoneClick}>Done</button>
            )}

            {showDowloadManifestButton && (
              <div>
                <button onClick={handleDowloadManifestButtonClick}>
                  Download updated manifest
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
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};
