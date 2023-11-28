import React from 'react';
import YouTube from "react-youtube";


 class MovieClip extends React.Component {
    render() {
      const options = {
        height: '490',
        width: '640',
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      };
  
      return <YouTube videoId="dQw4w9WgXcQ" options={options} onReady={this._onReady} id="video"/>;
    }
  
    _onReady(event) {
      event.target.pauseVideo();
    }
  }

  export default MovieClip;
// const Tutorial = () => {
//   return (
//     <div>
//       <h2>Tutorial Page</h2>
//       <p>Hello, World!</p>
//     </div>
//   );
// };

// export default Tutorial;
