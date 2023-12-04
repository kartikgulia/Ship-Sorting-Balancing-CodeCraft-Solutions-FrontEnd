import React, { useState } from "react";
import "./App.css";
import SignIn from "./screens/signin";
import ViewLog from "./screens/viewlogs";
import ReportIssue from "./report-issue";
import Tutorial from "./screens/tutorial";
import Home from "./home";
import SelectContainerScreen from "./screens/SelectContainersScreen";
import UploadScreen from "./UploadManifest";
import OperationListScreen from "./screens/OperationListScreen";
import { FaCog } from "react-icons/fa"; // This imports a gear icon from Font Awesome
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to track dropdown visibility

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
      case "Home":
        return <Home />;
      case "SelectContainers":
        return <SelectContainerScreen />;
      case "UploadManifest":
        return <UploadScreen />;

      case "OperationList":
        return <OperationListScreen isBalance={0} />;
      default:
        return null;
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false); // Close dropdown after selecting an option
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const dropdownOptions = [
    "SignIn",
    "ViewLog",
    "ReportIssue",
    "Tutorial",
    "Home",
    "SelectContainers",
    "UploadManifest",
    "OperationList",
  ];

  return (
    <div className="App">
      <Routes>
        <Route path="/UploadScreen" component={UploadScreen} />
        <Route path="/" component={Home} />
      </Routes>
      {/* Create a container to position the button to the top right */}
      <div className="button-container">
        <div className="dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            <FaCog />
          </button>
          {/* Use conditional rendering to show/hide the dropdown content */}
          {dropdownVisible && (
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
          )}
        </div>
      </div>
      <div className="component-container">{renderComponent()}</div>
    </div>
  );
};

export default App;
