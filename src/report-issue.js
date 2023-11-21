import React, { useState } from 'react';


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
    <div>
      <div>
       <h1>Report Issue</h1>
      </div>
      <textarea
        placeholder="Enter Text"
        value={paragraph}
        onChange={handleInputChange}
      />
      <div style={{ textAlign: 'right' }}>
        Word Count: {wordCount}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WordCounter;