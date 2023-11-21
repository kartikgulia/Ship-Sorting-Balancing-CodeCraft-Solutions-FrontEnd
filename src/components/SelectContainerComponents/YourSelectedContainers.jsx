export default function YourSelectedContainers(props) {
  return (
    <div style={containerStyle}>
      <h1> Your Selected Containers </h1>
      <div>
        {props.selectedNames.length > 0 ? (
          props.selectedNames.map((name, index) => <p key={index}>{name}</p>)
        ) : (
          <p>Click on the grid to select unload containers</p> // Message when no names are selected
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  margin: "20px",
};
