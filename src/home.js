const Home = () => {
  const handleTransfer = () => {
    // Add functionality for the Transfer button
    console.log('Transfer button clicked');
    // Add logic for transfer functionality if required
  };

  const handleCheckBalance = () => {
    // Add functionality for the Balance button
    console.log('Balance button clicked');
    // Add logic for checking balance if required
  };

  return (
    <div className="home-container">
      <h2>Home</h2>
      <div className="button-row">
        <button className="action-button transfer-button" onClick={handleTransfer}>Transfer</button>
        <button className="action-button balance-button" onClick={handleCheckBalance}>Balance</button>
      </div>
      {/* Additional content for the Home component if needed */}
    </div>
  );
};

export default Home;
