import { useRef, useState, useEffect } from "react";

const musicList = [
  "bensound-creativeminds",
  "bensound-hey",
  "bensound-littleidea",
];

function MusicPlayer() {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ref = audioRef.current;
    const nextSong = () => {
      if (currentIndex === musicList.length - 1) return;
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setTimeout(function () {
        ref.play();
      }, 150);
      
    };
    if (audioRef && ref) {
      ref.addEventListener("ended", nextSong);
      ref.addEventListener("ended", timeupdate);
      return () => {
        ref.removeEventListener("ended", nextSong);
      };
    }
  });

  const handlePlay = (e) => {
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying((playing) => !playing);
  };
  const handlePrev = (e) => {
    if (currentIndex < 1) return;
    setPlaying(true);
    setCurrentIndex(currentIndex - 1);
    setTimeout(function () {
      audioRef.current.play();
    }, 150);
  };
  const handleNext = (e) => {
    if (currentIndex === musicList.length - 1) return;
    setPlaying(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(function () {
      audioRef.current.play();
    }, 150);
  };
  return (
    <div className={`music-player${playing ? " play" : ""}`}>
      <div className="music-player--info">
        <h4 className="music-player--title">{`${musicList[currentIndex]}`}</h4>
        <div className="music-player--progress-container">
          <div className="music-player--progress-bar"></div>
        </div>
      </div>

      <audio
        src={`./music/${musicList[currentIndex]}.mp3`}
        ref={audioRef}
        id="aux"
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
        <button
          className="music-player--control__btn music-player--control__btn_big"
          onClick={handlePlay}
        >
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
