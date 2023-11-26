import React, { useState } from 'react';

// const ViewLog = () => {
//   return (
//     <div>
//       <h2>View Log Page</h2>
//       <p>Hello, World!</p>
//     </div>
//   );
// };

// export default ViewLog;

const Viewlog = () => {
  const [password, setPassword] = useState('');
  const [showText, setShowText] = useState(false);
  const [fileContent, setFileContent] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === 'password123') {
      //text about for the textfile. Need to fetch it here. Backend gotta help
      const textFileContent = 'This is the content of the text file.\nCustomizable it.';
      
      setFileContent(textFileContent);
      setShowText(true);
    }
  };

  const handleDownloadTextFile = () => {
    const blob = new Blob([fileContent], { type: 'text/plain' });

    // Creates link and click event to download the text file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'downloaded-file.txt';
    downloadLink.click();
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
    </div>
  );
};

export default Viewlog;