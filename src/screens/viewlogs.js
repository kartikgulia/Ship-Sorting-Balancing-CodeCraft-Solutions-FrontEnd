import React, { useState } from "react";

const Viewlog = () => {
  const [password, setPassword] = useState("");
  const [showText, setShowText] = useState(false);
  const [fileContent, setFileContent] = useState("");
  const [logContent, setLogContent] = useState("");

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
  const handleDownloadTextFile = () => {
    // Fetch log file content
    fetch("http://127.0.0.1:5000/downloadLog")
      .then((response) => {
        // Access the Content-Disposition header to get the filename
        const contentDispositionHeader = response.headers.get(
          "Content-Disposition"
        );

        let filename = "Keogh2023.txt"; // Default filename
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
  };

  return (
    <div>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button onClick={handlePasswordSubmit}>Submit</button>

      {showText && (
        <div>
          <pre>{fileContent}</pre>
          <button onClick={handleDownloadTextFile}>Download Text File</button>
        </div>
      )}

      {logContent && (
        <div>
          <h2>Log Content:</h2>
          <pre>{logContent}</pre>
        </div>
      )}
    </div>
  );
};

export default Viewlog;
