import React, { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageStyle, setImageStyle] = useState({});
  const [randomImageKey, setRandomImageKey] = useState(0);

  const handleClick = () => {
    setShowImage(true);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      setShowImage(false);
    }, 5000);
  };

  const generateRandomPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      startX: Math.random() * viewportWidth,
      startY: Math.random() * viewportHeight,
      endX: Math.random() * viewportWidth,
      endY: Math.random() * viewportHeight,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const { startX, startY, endX, endY } = generateRandomPosition();

      setImageStyle({
        left: startX,
        top: startY,
        transform: `translate(${endX - startX}px, ${endY - startY}px)`,
      });

      setRandomImageKey((prevKey) => prevKey + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
  <div className="background">
    <div className="overlay">
      <div className="centered-text">
        <h1>8bitcoin</h1>
        <p>$8bit</p>
        <p className="small-text">ca:</p>
      </div>

      <a
        href="https://t.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="button left-button"
      >
        TG
      </a>
      <button className="button right-button" onClick={handleClick}>
        more
      </button>

      {showImage && (
        <div className={`image-container ${isSpinning ? "spinning" : ""}`}>
          <img
            src="./bit_pix2.png"
            alt="Spinning"
            className="spinnable-image"
          />
        </div>
      )}

      <div
        key={randomImageKey}
        className="moving-image"
        style={imageStyle}
      >
        <img
          src="./bit_pix2.png"
          alt="Diagonal Moving"
          className="diagonal-image"
        />
      </div>
    </div>
  </div>
</div>

  );
}

export default App;
