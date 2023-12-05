import React, { useState } from "react";
import UploadScreen from "./UploadManifest";



const SignIn = () => {

  const [username, setUsername] = useState("");
  const [showUploadScreen, setShowUploadScreen] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProceed = () => {
    const data = {
      currentUser: username,
    };

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
        // After receiving response, conditionally show UploadScreen based on some condition
        if (responseData.someCondition) {
          setShowUploadScreen(true); // Set showUploadScreen to true if condition met
        } else {
          setShowUploadScreen(false); // Set showUploadScreen to false if condition not met
        }
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
      {/* Conditional rendering of UploadScreen based on showUploadScreen state */}
      {showUploadScreen ? <UploadScreen /> : null}
    </div>
  );
};

export default SignIn;
