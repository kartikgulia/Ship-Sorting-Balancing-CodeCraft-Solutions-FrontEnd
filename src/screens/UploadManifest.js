import SelectContainerScreen from "./SelectContainersScreen";
import React, { useState } from 'react';


const UploadScreen = () => {
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = (event) => {
    event.preventDefault();
    // Perform file upload logic here
    // For the example, let's simulate a successful upload after 2 seconds
    setTimeout(() => {
      // After successful upload, set 'uploaded' to true
      setUploaded(true);
    }, 2000);
  };

  return (
    <div>
      {uploaded ? (
        <SelectContainerScreen />
      ) : (
        <div>
          <h1>Upload a Text File</h1>
          <form
            onSubmit={handleUpload}
            action="http://127.0.0.1:5000/sendManifest"
            method="post"
            enctype="multipart/form-data"
          >
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