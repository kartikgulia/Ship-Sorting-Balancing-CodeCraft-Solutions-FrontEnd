import React, { useState } from 'react';
import './report-issue.css'

// function Issue() {
//   return (
//     <div>
//       <h1>Report Issue Page</h1>
//     </div>
//   );
// };

// export default Issue;

const WordCounter = () => {
  const [paragraph, setParagraph] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setParagraph(inputText);

    // Calculate word count
    const words = inputText.split(/\s+/);
    setWordCount(words.length);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    console.log('Submitted paragraph:', paragraph);
  };

  return (
    <div className="word-counter-container">
      <div>
        <h1 className="word-counter-title">Report Issue</h1>
      </div>
      <textarea
        className="word-counter-textarea"
        placeholder="Enter Text"
        value={paragraph}
        onChange={handleInputChange}
      />
      <div style={{ textAlign: 'right' }}>
        Word Count: {wordCount}
      </div>
      <button className="word-counter-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WordCounter;