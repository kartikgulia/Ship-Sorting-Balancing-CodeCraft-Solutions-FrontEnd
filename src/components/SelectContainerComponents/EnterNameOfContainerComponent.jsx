import React, { useState } from "react";
import "./EnterNameOfContainerComponents.css";

export default function EnterNameOfContainerComponent({ onNamesUpdate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [names, setNames] = useState([]);
  const [inputName, setInputName] = useState(""); // State for the current input name
  const [error, setError] = useState(""); // State to hold error message

  const handleNext = () => {
    if (inputName.length > 256) {
      setError(
        `Description cannot be more than 256 characters. You typed ${inputName.length} characters`
      );
    } else if (inputName === "NAN" || inputName === "UNUSED") {
      setError('Name cannot be "NAN" or "UNUSED"');
    } else {
      const newNames = [...names];
      newNames[currentSlide] = inputName;
      setNames(newNames);
      onNamesUpdate(newNames);

      setCurrentSlide(currentSlide + 1);
      setInputName(""); // Reset input field
      setError(""); // Reset error message
    }
  };

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  return (
    <div className="container-style">
      <h1> Enter name </h1>
      <input
        type="text"
        value={inputName}
        onChange={handleInputChange}
        // onPaste={(e) => e.preventDefault()}
        // onCopy={(e) => e.preventDefault()}
        className="input-style"
      />

      <button onClick={handleNext} className="button-style">
        Confirm Name
      </button>
      {error && <p className="error-message">{error}</p>}
      <div>
        <h2>Entered Names:</h2>
        {names.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </div>
    </div>
  );
}

const containerStyle = {
  margin: "20px",
};
