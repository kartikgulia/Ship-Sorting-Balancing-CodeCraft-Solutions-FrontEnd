import SelectContainerScreen from "./SelectContainersScreen";
import OperationListScreen from "./OperationListScreen";
import React, { useState } from "react";

const UploadScreen = ({ isBalance }) => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async (event) => {
    event.preventDefault();

    // Get the file from the input
    const fileInput = document.getElementById("textfile");
    const file = fileInput.files[0];

    // Create a FormData object to build the request body
    let formData = new FormData();
    formData.append("textfile", file);

    // Use fetch to make the HTTP request
    try {
      const response = await fetch("http://127.0.0.1:5000/sendManifest", {
        method: "POST",
        body: formData,
        // Don't set content-type header for FormData,
        // the browser will set it along with the correct boundary
      });

      // Check if the upload was successful
      if (response.ok) {
        setUploaded(true);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error making the request:", error);
    }
  };

  return (
    <div>
      {uploaded ? (
        isBalance === 0 ? (
          <SelectContainerScreen />
        ) : (
          <OperationListScreen isBalance={1} />
        )
      ) : (
        <div>
          <h1>Upload a Text File</h1>
          <form onSubmit={handleUpload}>
            <label htmlFor="textfile">Select a Text File:</label>
            <input type="file" name="textfile" id="textfile" accept=".txt" />
            <br />
            <input type="submit" value="Upload" />
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadScreen;
