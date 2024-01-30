import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { audioSrcState, isPlayingState } from "../state/atom";

const AudioPlayer = () => {
  const isSoundOn = useRecoilValue(isPlayingState);
  const audioSrc = useRecoilValue(audioSrcState);
  const audioRef = useRef(new Audio(audioSrc));

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.4;
    if (isSoundOn) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isSoundOn, audioSrc]);

  return null;
};

export default AudioPlayer;
