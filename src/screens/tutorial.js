import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Home from './home';
import './tutorial.css'
const TutorialPage = () => {
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleDone = () => {
    setRedirectToHome(true); // Set redirectToHome to true when the "Done" button is clicked
  };

  const options = {
    height: '490',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  const _onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <div>
      {redirectToHome ? (
        <Home />
      ) : (
        <div>
          <YouTube videoId="dQw4w9WgXcQ" options={options} onReady={_onReady} id="video" />
          <button className="done-button" onClick={handleDone}>Done</button>
        </div>
      )}
    </div>
  );
};

export default TutorialPage;
