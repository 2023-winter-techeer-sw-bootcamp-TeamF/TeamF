import Navbar from "../component/Navbar";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

function Main() {
  return (
    <>
      <Background>
        <Inside>
          <Navbar />
        </Inside>
      </Background>
    </>
  );
}

export default Main;
