import React, { useState } from "react";

export default function EnterNameOfContainerComponent({ onNamesUpdate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [names, setNames] = useState([]);

  const handleNext = () => {
    setCurrentSlide(currentSlide + 1);
    onNamesUpdate(names);
  };

  const handleInputChange = (e) => {
    const newNames = [...names];
    newNames[currentSlide] = e.target.value;
    setNames(newNames);
  };

  return (
    <div style={containerStyle}>
      <h1> Enter name </h1>
      <input
        type="text"
        value={names[currentSlide] || ""}
        onChange={handleInputChange}
      />
      <button onClick={handleNext}>Confirm Name</button>
      {/* Display the names for demonstration purposes */}
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
