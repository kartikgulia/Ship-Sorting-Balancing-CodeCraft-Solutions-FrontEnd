import React, { useState, useEffect } from "react";
import UploadScreen from "./UploadManifest"; // Import the UploadScreen component
import OperationListScreen from "./OperationListScreen";
import "./home.css";
const Home = () => {
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [isBalance, setIsBalance] = useState(false);

  const [powerCutHappened, setPowerCutHappened] = useState(false);
  const [moveNumber, setMoveNumber] = useState(null); // To store the move number after power cut recovery

  const handleTransfer = () => {
    // Logic for transferring
    console.log("Transfer button clicked");
    setIsBalance(false); // Set isBalance to false
    setShowUploadScreen(true); // Show the UploadScreen component
  };

  const handleCheckBalance = () => {
    // Logic for checking balance
    console.log("Balance button clicked");
    setIsBalance(true); // Set isBalance to true
    setShowUploadScreen(true); // Show the UploadScreen component
  };

  // Every time home screen loads, we check for power cut because it's where the user first goes to in the website

  const recoverFromPowerCut = async () => {
    // needs to check if there was a power cut (can be done by seeing if there's a directory called MoveIndexState in the backend)

    console.log("Checking for power cut");

    const checkIfPowerCutHappened = await fetch(
      "http://127.0.0.1:5000/checkIfPowerCutHappened"
    );

    if (!checkIfPowerCutHappened.ok) {
      throw new Error("Network response was not ok for recovering.");
    }

    const didHappenResponseData = await checkIfPowerCutHappened.json();

    const didHappen = didHappenResponseData.powerCutHappened;

    if (didHappen) {
      console.log("Power cut happened. Getting move state");
      const moveNumberResponse = await fetch(
        "http://127.0.0.1:5000/recoverFromPowerCut"
      );
      if (!moveNumberResponse.ok) {
        throw new Error("Network response was not ok for recovering.");
      }
      const moveNumberResponseData = await moveNumberResponse.json();
      const moveNumberFromBackend = moveNumberResponseData.moveNumber;

      setMoveNumber(moveNumberFromBackend); // Set the move number
      console.log("Move num at home screen: " + moveNumber);
      setPowerCutHappened(true); // Update state to indicate power cut happened

      console.log(moveNumber);
    } else {
      console.log("No Power Cut");
      setPowerCutHappened(false);
      return;
    }
  };
  useEffect(() => {
    recoverFromPowerCut();
  }, []);

  return (
    <div className="home-container">
      {powerCutHappened ? (
        // Render OperationListScreen if power cut happened
        <OperationListScreen moveNumFromPowerCut={moveNumber} />
      ) : showUploadScreen ? (
        // Render UploadScreen with isBalance based on the state
        <UploadScreen isBalance={isBalance ? 1 : 0} />
      ) : (
        // Render buttons when showUploadScreen is false
        <div>
          <h2>Home</h2>
          <div className="button-row">
            <button
              className="action-button transfer-button"
              onClick={handleTransfer}
            >
              Transfer
            </button>
            <button
              className="action-button balance-button"
              onClick={handleCheckBalance}
            >
              Balance
            </button>
          </div>
          {/* Additional content for the Home component if needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
