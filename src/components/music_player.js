import { useRef, useState } from "react";

const musicList = [
  "bensound-creativeminds",
  "bensound-hey",
  "bensound-littleidea",
];

function MusicPlayer() {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlay = (e) => {
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying((playing) => !playing);
  };
  const handlePrev = (e) => {
    if (currentIndex < 1) return;
    audioRef.current.pause();
    setPlaying(false);
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };
  const handleNext = (e) => {
    if (currentIndex > musicList.length - 2) return;
    audioRef.current.pause();
    setPlaying(false);
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };
  return (
    <div className="music-player">
      <div className="music-player--info">
        <h4 className="music-player--title">{`${musicList[currentIndex]}`}</h4>
        <div className="music-player--progress-container">
          <div className="music-player--progress-bar"></div>
        </div>
      </div>

      <audio
        src={`./music/${musicList[currentIndex]}.mp3`}
        ref={audioRef}
      ></audio>
      <div className="music-player--art-container">
        <img src={`./images/${musicList[currentIndex]}.jpg`} alt="music-art" />
      </div>

      <div className="music-player--control">
        <button
          className="music-player--control__btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <i className="fas fa-backward"></i>
        </button>
        <button className="music-player--control__btn" onClick={handlePlay}>
          <i className={`fas ${playing ? "fa-pause" : "fa-play"}`}></i>
        </button>
        <button
          className="music-player--control__btn"
          onClick={handleNext}
          disabled={currentIndex === musicList.length - 1}
        >
          <i className="fas fa-forward"></i>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
