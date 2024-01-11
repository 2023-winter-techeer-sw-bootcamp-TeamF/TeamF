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
  width: 580px;
  height: 580px;
  flex-shrink: 0;
  border-radius: 501px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  gap: 1.73rem;

  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 420px;
    height: 420px;
    gap: 1.1rem;
  }
`;

const LWord = styled.div`
  color: #ecb973;
  font-family: Inter;
  font-size: 38px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1.9rem;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 30px;
    margin-bottom: 1.6rem;
  }
`;

const Id = styled.input`
  width: 400px;
  height: 52px;
  border-radius: 17px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  text-indent: 10px;
  line-height: normal;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 10px;
  }
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 270px;
    height: 35px;
    font-size: 12px;
    border-radius: 12px;
  }
`;

const Pw = styled.input`
  width: 400px;
  height: 52px;
  border-radius: 17px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  text-indent: 10px;
  line-height: normal;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 10px;
  }
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 270px;
    height: 35px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const LButton = styled.button`
  width: 400px;
  height: 52px;
  border-radius: 17px;
  border: 1px solid #ecb973;
  background: #c58122;
  color: #fff;
  font-family: Inter;
  font-size: 21px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 270px;
    height: 35px;
    border-radius: 12px;
    font-size: 14px;
  }
`;

const Sign = styled.button`
  color: #ecb973;
  background: #000;
  border: none;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  text-decoration-line: underline;
  margin-top: -0.4rem;
  cursor: pointer;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 12px;
  }
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
