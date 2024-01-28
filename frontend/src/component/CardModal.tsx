import { motion } from "framer-motion";
import styled from "styled-components";

const Background = styled.div`
  position: relative;
  background: #000;
  width: 100vw;
  height: 100vh;
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 20vw;
  height: 60vh;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 99;
`;

const CardModal = () => {
  return (
    <>
      <Background>
        <Modal />
      </Background>
    </>
  );
};

export default CardModal;
