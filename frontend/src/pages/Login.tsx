import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Outside = styled.div`
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Circle = styled.div`
  width: 364px;
  height: 364px;
  flex-shrink: 0;
  border-radius: 501px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  gap: 1.13rem;
`;

const LWord = styled.div`
  color: #ecb973;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom: 1.9rem;
`;
const Id = styled.input`
  width: 200px;
  height: 26px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 200;
  text-indent: 10px;
  line-height: normal;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 10px;
  }
`;

const Pw = styled.input`
  width: 200px;
  height: 26px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 200;
  text-indent: 10px;
  line-height: normal;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 10px;
  }
`;

const LButton = styled.button`
  width: 200px;
  height: 26px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: #c58122;
  color: #fff;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Sign = styled.button`
  color: #ecb973;
  background: #000;
  border: none;
  font-family: Inter;
  font-size: 9px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  text-transform: uppercase;
  text-decoration-line: underline;
  margin-top: -0.4rem;
  cursor: pointer;
`;

function Login() {
  return (
    <>
      <Outside>
        <Circle>
          <LWord>LOG IN</LWord>
          <Id placeholder="ID" />
          <Pw placeholder="PASSWORD"></Pw>
          <LButton> LOG IN</LButton>
          <Sign>
            <Link to="/signup">SIGN UP</Link>
          </Sign>
        </Circle>
      </Outside>
    </>
  );
}

export default Login;
