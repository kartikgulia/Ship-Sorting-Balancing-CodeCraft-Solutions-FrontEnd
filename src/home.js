import React, { useState } from 'react';

import UploadScreen from './UploadManifest'; // Import the UploadScreen component

const Home = () => {
  const [showUploadScreen, setShowUploadScreen] = useState(false);

  const handleTransfer = () => {
    // Add logic for transferring
    console.log('Transfer button clicked');
    // Example: Trigger a transfer function or API call

    // Show the UploadScreen component
    setShowUploadScreen(true);
  };

  const handleCheckBalance = () => {
    // Add logic for checking balance
    console.log('Balance button clicked');
    // Example: Fetch balance information

    // Show the UploadScreen component
    setShowUploadScreen(true);
  };

  return (
    <div className="home-container">
      {showUploadScreen ? (
        <UploadScreen />
      ) : (
        <div>
          <h2>Home</h2>
          <div className="button-row">
            <button className="action-button transfer-button" onClick={handleTransfer}>
              Transfer
            </button>
            <button className="action-button balance-button" onClick={handleCheckBalance}>
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
