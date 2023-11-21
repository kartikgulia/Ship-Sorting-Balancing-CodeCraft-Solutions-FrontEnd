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
  const [showImage, setShowImage] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === 'password123') {
      setShowImage(true);
    }
  };

  const handleDownloadImage = () => {
    // Replace the URL with the actual URL of the image you want to download
    const imageUrl = 'https://media.istockphoto.com/id/537317925/photo/willow-log-isolated.jpg?s=612x612&w=0&k=20&c=9rLi7wqd-0AdLETxdg8OFUlbhI5ZhwFx66UxvxVwBBU=';

    // Customize the download logic here ex: create a link and trigger a click event
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'downloaded-image.jpg';
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

      {showImage && (
        <div>
          <img
            src="https://media.istockphoto.com/id/537317925/photo/willow-log-isolated.jpg?s=612x612&w=0&k=20&c=9rLi7wqd-0AdLETxdg8OFUlbhI5ZhwFx66UxvxVwBBU=" // Image URL
            alt="Download Image"
            style={{ maxWidth: '100%', marginTop: '20px' }}
          />
          <button onClick={handleDownloadImage}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default Viewlog;