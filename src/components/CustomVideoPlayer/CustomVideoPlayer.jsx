import { useRef, useState } from "react";
import Video from "../../assets/glorieux-saint-germain.mp4";

const CustomVideoPlayer = () => {
  const videoPlayer = useRef();
  const inputToChangeVolume = useRef();
  const inputToMoveVideo = useRef();
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [videoProgress, setVideoProgress] = useState(0);
  const [totalVideoLenght, setTotalVideoLength] = useState();
  const [playPauseButton, setplayPauseButton] = useState(false);

  const handleClick = (e) => {
    const videoStatus = videoPlayer.current;
    videoStatus.paused ? videoStatus.play() : videoStatus.pause();
    setplayPauseButton(!playPauseButton);
  };

  const volume = (e) => {
    const currentVolume = inputToChangeVolume.current.value;
    videoPlayer.current.volume = currentVolume;
  };

  const totalDuration = (e) => {
    setTotalVideoLength(e.target.duration);
  };

  function addZero(nb) {
    return nb < 10 ? `0${nb}` : nb;
  }

  const durationProgress = (e) => {
    const value = e.target.currentTime;
    const min = Math.floor(value / 60);
    const sec = Math.floor(value % 60);
    setElapsedTime(`${addZero(min)}:${addZero(sec)}`);
    setVideoProgress(
      videoPlayer.current.currentTime / videoPlayer.current.duration
    );
  };

  const handleVideoProgress = (e) => {
    const videoProgress = parseFloat(e.target.value);
    videoPlayer.current.currentTime = videoProgress * totalVideoLenght;
  };

  return (
    <>
      <h3>Pratique : Exercices sur les états d'un composant</h3>
      <h4>Créer un lecteur vidéo personnalisé</h4>
      <video
        src={Video}
        ref={videoPlayer}
        width="50%"
        onLoadedMetadata={totalDuration}
        onTimeUpdate={durationProgress}
      ></video>
      <br />
      <button onClick={handleClick}>
        {playPauseButton ? "Pause" : "Play"}
      </button>
      <br />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        onInput={volume}
        ref={inputToChangeVolume}
      />

      <p>{elapsedTime}</p>

      <p>
        {addZero(Math.floor(totalVideoLenght / 60))}:
        {addZero(Math.floor(totalVideoLenght % 60))}
      </p>

      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={videoProgress}
        ref={inputToMoveVideo}
        onChange={handleVideoProgress}
      />
      <hr />
    </>
  );
};

export default CustomVideoPlayer;
