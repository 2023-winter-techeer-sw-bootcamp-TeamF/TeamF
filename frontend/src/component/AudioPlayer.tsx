import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { audioSrcState, isPlayingState } from "../state/atom";

const AudioPlayer = () => {
  const isSoundOn = useRecoilValue(isPlayingState);
  const audioSrc = useRecoilValue(audioSrcState);
  const audioRef = useRef(new Audio(audioSrc));

  useEffect(() => {
    const audio = audioRef.current;

    if (isSoundOn) {
      audio.play();
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isSoundOn, audioSrc]);

  return null; // UI를 렌더링하지 않습니다.
};

export default AudioPlayer;
