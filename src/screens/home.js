import React, { useState } from "react";
import UploadScreen from "./UploadManifest"; // Import the UploadScreen component
import './home.css'
const Home = () => {
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [isBalance, setIsBalance] = useState(false);

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

  return (
    <div className="home-container">
      {showUploadScreen ? (
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
