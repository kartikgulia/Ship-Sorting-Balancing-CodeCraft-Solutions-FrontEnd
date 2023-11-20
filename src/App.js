import React, { useState } from "react";
import "./App.css";
import SignIn from "./screens/signin";
import ViewLog from "./screens/viewlogs";
import ReportIssue from "./report-issue";
import Tutorial from "./screens/tutorial";
// import Home from './home'

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderComponent = () => {
    switch (selectedOption) {
      case "SignIn":
        return <SignIn />;
      case "ViewLog":
        return <ViewLog />;
      case "ReportIssue":
        return <ReportIssue />;
      case "Tutorial":
        return <Tutorial />;
      // case 'Home':
      //     return <Home/>;
      default:
        return null;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const dropdownOptions = [
    "SignIn",
    "ViewLog",
    "ReportIssue",
    "Tutorial",
    "Home",
  ];

  return (
    <div className="App">
      <div className="dropdown">
        <button className="dropbtn">Select an Option</button>
        <div className="dropdown-content">
          {dropdownOptions.map((option) => (
            <React.Fragment key={option}>
              <a href="#" onClick={() => handleOptionSelect(option)}>
                {option}
              </a>
              <br /> {/* New line between options */}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="component-container">{renderComponent()}</div>
    </div>
  );
};
export default App;
