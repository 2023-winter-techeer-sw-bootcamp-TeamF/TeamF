import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 7.72438rem;
  height: 13.90388rem;
  transition: all 0.1s;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  width: 7.72438rem;
  height: 13.90388rem;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.8) 45%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 54%
  );
  filter: brightness(1.1) opacity(0.8);
  //mix-blend-mode: color-dodge;
  background-size: 150% 150%;
  background-position: 100%;
  transition: all 0.1s;
`;
const CardBackground = styled(motion.div)`
  width: 8.75rem;
  height: 15rem;
  border-radius: 0.9375rem;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div<{ imageUrl: string }>`
  width: 7.72438rem;
  height: 13.90388rem;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
`;

interface InteractiveCardProps {
  imageUrl: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ imageUrl }) => {
  const [overlayStyle, setOverlayStyle] = useState({});
  const [containerStyle, setContainerStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const rotateY = (-1 / 5) * x + 20;
    const rotateX = (4 / 30) * y - 20;

    setOverlayStyle({
      backgroundPosition: `${x / 5 + y / 5}%`,
      filter: `opacity(${x / 200}) brightness(1.2)`,
    });

    setContainerStyle({
      transform: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  };

  const handleMouseOut = () => {
    setOverlayStyle({ filter: "opacity(0)" });
    setContainerStyle({
      transform: "perspective(350px) rotateY(0deg) rotateX(0deg)",
    });
  };

  return (
    <Container
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <CardBackground>
        <Overlay style={overlayStyle}></Overlay>
        <Card imageUrl={imageUrl}></Card>
      </CardBackground>
    </Container>
  );
};

export default InteractiveCard;
