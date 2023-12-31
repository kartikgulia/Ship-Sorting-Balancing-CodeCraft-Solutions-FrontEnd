import React, { useState } from "react";
import Home from "./home";
import "./viewlogs.css";

const Viewlog = () => {
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [logContent, setLogContent] = useState("");

  const [downloadComplete, setDownloadComplete] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === "password123") {
      // Text about for the text file. Need to fetch it here. Backend gotta help
      const textFileContent = "Download the log file";

      setFileContent(textFileContent);
      setShowText(true);
    }
  };
  const handleDownloadTextFile = async () => {
    const nameResponse = await fetch("http://127.0.0.1:5000/getLogFileName");
    if (!nameResponse.ok) {
      throw new Error("Network response was not ok for getting log name.");
    }
    const nameData = await nameResponse.json();
    const filename = nameData.fileName;

    // Fetch log file content
    fetch("http://127.0.0.1:5000/downloadLog")
      .then((response) => {
        // Access the Content-Disposition header to get the filename
        const contentDispositionHeader = response.headers.get(
          "Content-Disposition"
        );

        if (contentDispositionHeader) {
          const matches = contentDispositionHeader.match(/filename="(.+)"/);
          if (matches && matches.length > 1) {
            filename = matches[1]; // Extract the filename
            console.log(filename);
          }
        }

        console.log("Filename:", filename);

        return response.blob().then((blob) => ({
          blob,
          filename,
        }));
      })
      .then(({ blob, filename }) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename; // Use the extracted filename
        document.body.appendChild(downloadLink); // Append to body
        downloadLink.click();
        document.body.removeChild(downloadLink); // Clean up
      })
      .catch((error) => {
        console.error("Error fetching log file:", error);
      });

    const removeLog = await fetch("http://127.0.0.1:5000/removeLog");
    if (!nameResponse.ok) {
      throw new Error("Network response was not ok for removing log");
    } else {
      setDownloadComplete(true);
    }
  };

  if (downloadComplete) {
    return <Home />; // Render Home component after download
  }
  return (
    <div className="viewlog-container">
      Password:
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className="password-input"
        placeholder="Enter Password"
      />
      <button onClick={handlePasswordSubmit} className="button">
        Submit
      </button>
      {showText && (
        <div>
          <pre className="file-content">{fileContent}</pre>
          <button onClick={handleDownloadTextFile} className="button">
            Download Text File
          </button>
        </div>
      )}
      {logContent && (
        <div>
          <h2 className="log-content">Log Content:</h2>
          <pre className="log-content">{logContent}</pre>
        </div>
      )}
    </div>
  );
};

export default Viewlog;
