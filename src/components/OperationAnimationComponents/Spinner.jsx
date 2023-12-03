import React from "react";

const Spinner = () => {
  const spinnerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px", // Adjust as needed
    width: "100%", // Adjust as needed
  };

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTopColor: "#09f",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    animation: "spin 1s ease infinite",
  };

  return (
    <div style={spinnerContainerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
