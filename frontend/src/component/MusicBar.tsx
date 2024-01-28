import styled from "styled-components";
import SoundBtnImg from "../assets/Sound.png";
import NoSoundBtnImg from "../assets/NoSound.png";
import React, { useState } from "react";

const MusicContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
  // justify-content: flex-start;
  position: fixed;
  opacity: 0.5;
  // bottom: 8rem;
  // left: 2rem;
  right: 1.5rem;
  top: 1.6rem;
  &:hover {
    opacity: 1;
    transition: transform 0.2 ease;
  }
`;

const Button = styled.div`
  display: flex;
  border: none;
  // background: #000;
  align-items: center;
  // width: 12rem;
  // padding: 0.625rem;
  // width: 9rem;
  margin-right: 4rem;
`;
const SoundBtn = styled.button`
  background-color: #000;
  border: none;
`;

const NoSoundBtn = styled.button`
  background-color: #000;
  border: none;
`;

const BtnImg = styled.img`
  width: 3rem;
  height: 3rem;
`;

const MusicBar = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const handleSoundToggle = () => {
    setIsSoundOn((prevIsSoundOn) => !prevIsSoundOn);
  };
  return (
    <MusicContainer>
      <Button>
        {isSoundOn ? (
          <SoundBtn onClick={handleSoundToggle}>
            <BtnImg src={SoundBtnImg} />
          </SoundBtn>
        ) : (
          <NoSoundBtn onClick={handleSoundToggle}>
            <BtnImg src={NoSoundBtnImg} />
          </NoSoundBtn>
        )}
      </Button>
    </MusicContainer>
  );
};

export default MusicBar;
