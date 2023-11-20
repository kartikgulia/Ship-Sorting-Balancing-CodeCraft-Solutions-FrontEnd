import React from "react";

const ContainerComponent = ({ value, isSelected, onClick }) => {
  const style = isSelected ? selectedStyle : cellStyle;

  return (
    <div style={style} onClick={onClick}>
      {value}
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

export default ContainerComponent;
