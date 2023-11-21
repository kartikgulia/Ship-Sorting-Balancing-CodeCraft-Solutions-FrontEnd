import React, { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProceed = () => {
    // Create a data object with the desired structure
    const data = {
      currentUser: username,
    };

    // Send a POST request using the fetch API
    fetch("http://127.0.0.1:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((responseData) => {
        console.log("Response Data:", responseData);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  };

  return (
    <div>
      <h2>Sign In Page</h2>
      <form>
        <label>
          Enter your name: <br />
          <input type="text" value={username} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleProceed}>
          Proceed
        </button>
      </form>
    </div>
  );
};

export default SignIn;
