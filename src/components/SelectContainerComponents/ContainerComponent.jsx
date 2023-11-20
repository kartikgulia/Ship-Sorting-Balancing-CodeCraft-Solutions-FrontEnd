import React from "react";

const ContainerComponent = ({ value, isSelected, onClick }) => {
  let style;
  let displayContent;

  if (value === "NAN") {
    // Use a special style for "NAN" to fill the whole container
    style = { ...cellStyle, padding: 0 };
    displayContent = <div style={nanStyle}></div>;
  } else if (value !== "UNUSED") {
    // Regular display for other values
    style = isSelected ? selectedStyle : cellStyle;
    displayContent = value;
  } else {
    // Apply the regular style when value is "UNUSED"
    style = isSelected ? selectedStyle : cellStyle;
  }

  return (
    <div style={style} onClick={onClick}>
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
