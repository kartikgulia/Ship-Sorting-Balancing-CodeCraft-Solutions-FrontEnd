import React from "react";

function UploadScreen() {
  return (
    <div>
      <h1>Upload a Text File</h1>
      <form
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
  );
}

export default UploadScreen;
