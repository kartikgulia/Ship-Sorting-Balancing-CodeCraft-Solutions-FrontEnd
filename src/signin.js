import React, { useState } from 'react';

const SignIn = () => {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProceed = () => {
    // Handle the logic when the user clicks the proceed button
    console.log(`Proceeding with username: ${username}`);
    // You can add logic here to redirect to another page or perform any action with the username
  };

  return (
    <div>
      <h2>Sign In Page</h2>
      <form>
        <label>
          Enter your name: <br/>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleProceed}>
          Proceed
        </button>
      </form>
    </div>
  );
};

export default SignIn;
