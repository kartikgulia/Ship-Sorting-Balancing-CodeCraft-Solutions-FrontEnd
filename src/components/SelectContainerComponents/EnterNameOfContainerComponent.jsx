import React, { useState } from "react";
import './EnterNameOfContainerComponents.css'; 

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
    <div className="container-style"> 
      <h1> Enter name </h1>
      <input
        type="text"
        value={names[currentSlide] || ""}
        onChange={handleInputChange}
        className="input-style" 
      />
      <button onClick={handleNext} className="button-style">Confirm Name</button> 
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
