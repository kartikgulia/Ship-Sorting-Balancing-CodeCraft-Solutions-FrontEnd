import React, { useState } from "react";
import Home from "./home";
import './signin.css'


const SignIn = () => {
  const [showUploadScreen, setShowUploadScreen] = useState(false);
  const [username, setUsername] = useState("");
  

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
        // if (responseData.someCondition) {
        //   setShowUploadScreen(true); // Set showUploadScreen to true if condition met
        // } else {
        //   setShowUploadScreen(false); // Set showUploadScreen to false if condition not met
        // }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });

      setShowUploadScreen(true);


  };

  return (
    <div>
      {showUploadScreen ? (
        <Home />
      ) : (
        <div className="signin-container">
          <h2>Sign In Page</h2>
          <form>
            <div className="input-wrapper"> {/* Wrapper for input and button */}
              <input
                type="text"
                value={username}
                onChange={handleInputChange}
                className="signin-input"
                placeholder="Enter your name"
              />
              <button
                className="signin-button"
                type="button"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      )}
    </div> 
  );
};
