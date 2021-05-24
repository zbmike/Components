import { useRef, useState, useEffect } from "react";

function MusicPlayer() {
  const audioRef = useRef();
  const progressRef = useRef();
  const progressContainerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [musicList, setMusicList] = useState([]);

  const nameArr = Object.keys(musicList);

  useEffect(() => {
    async function getMusicNames() {
      const res = await fetch('http://localhost:5000/api/get-music');
      const data = await res.json();
      setMusicList(data);
    }
    getMusicNames();

  }, []);

  useEffect(() => {
    const audioElem = audioRef.current;
    const progressElem = progressRef.current;
    const progressContainerElem = progressContainerRef.current;
    const nextSong = () => {
      if (currentIndex === nameArr.length - 1) return;
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setTimeout(function () {
        audioElem.play();
      }, 150);
    };

    const updateProgress = (e) => {
      const { duration, currentTime } = e.srcElement;
      const progressPercent = (currentTime / duration) * 100;
      progressElem.style.width = `${progressPercent}%`;
    };

    const setProgress = (e) => {
      const width = e.srcElement.clientWidth;
      const clickX = e.offsetX;
      const duration = audioElem.duration;
      audioElem.currentTime = (clickX / width) * duration;
    };

    if (
      audioRef &&
      progressRef &&
      progressContainerRef &&
      audioElem &&
      progressElem &&
      progressContainerElem
    ) {
      audioElem.addEventListener("ended", nextSong);
      audioElem.addEventListener("timeupdate", updateProgress);
      progressContainerElem.addEventListener("click", setProgress);
      return () => {
        audioElem.removeEventListener("ended", nextSong);
        audioElem.removeEventListener("timeupdate", updateProgress);
        progressContainerElem.removeEventListener("click", setProgress);
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
    if (currentIndex === nameArr.length - 1) return;
    setPlaying(true);
    setCurrentIndex(currentIndex + 1);
    setTimeout(function () {
      audioRef.current.play();
    }, 150);
  };
  return (
    <div className={`music-player${playing ? " play" : ""}`}>
      <div className="music-player__info">
        <h4 className="music-player__title">{`${nameArr[currentIndex]}`}</h4>
        <div
          className="music-player__progress-container"
          ref={progressContainerRef}
        >
          <div className="music-player__progress-bar" ref={progressRef}></div>
        </div>
      </div>

      <audio
        src={`./music/${nameArr[currentIndex]}.mp3`}
        ref={audioRef}
        id="aux"
      ></audio>
      <div className="music-player__art-container">
        <img src={musicList[nameArr[currentIndex]] ? `./images/${nameArr[currentIndex]}.jpg` : `./images/CDCover.jpg`} alt="music-art" />
      </div>

      <div className="music-player__control">
        <button
          className="music-player__control--btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <i className="fas fa-backward"></i>
        </button>
        <button
          className="music-player__control--btn music-player__control--btn_big"
          onClick={handlePlay}
        >
          <i className={`fas ${playing ? "fa-pause" : "fa-play"}`}></i>
        </button>
        <button
          className="music-player__control--btn"
          onClick={handleNext}
          disabled={currentIndex === nameArr.length - 1}
        >
          <i className="fas fa-forward"></i>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
