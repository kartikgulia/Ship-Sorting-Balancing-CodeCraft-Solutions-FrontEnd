import React from "react";

const ContainerComponent = ({
  value,
  isSelected,
  onClick,
  startPos,
  endPos,
}) => {
  let style;
  let displayContent;

  const handleClick = () => {
    if (value !== "NAN" && value !== "UNUSED") {
      onClick(); // Only trigger onClick if value is not "NAN" or "UNUSED"
    }
  };

  if (value === "NAN") {
    // Use a special style for "NAN" to fill the whole container
    style = { ...cellStyle, padding: 0 };
    displayContent = <div style={nanStyle}></div>;
  } else if (startPos) {
    // Apply start style if startPos is true
    style = { ...cellStyle, backgroundColor: "lightgreen" };
    displayContent = value;
  } else if (endPos) {
    // Apply start style if startPos is true
    style = { ...cellStyle, backgroundColor: "red" };
    displayContent = value;
  } else if (value !== "UNUSED") {
    // Regular display for other values
    style = isSelected ? selectedStyle : cellStyle;
    displayContent = value;
  } else {
    // Apply the regular style when value is "UNUSED"
    style = isSelected ? selectedStyle : cellStyle;
  }

  return (
    <div style={style} onClick={handleClick}>
      {displayContent}
    </div>
  );
};

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
  cursor: "pointer",
  textAlign: "center",
};

const selectedStyle = {
  ...cellStyle,
  backgroundColor: "green",
};

const nanStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "black",
};

export default ContainerComponent;
