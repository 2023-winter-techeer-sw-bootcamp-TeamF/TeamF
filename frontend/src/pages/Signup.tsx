import React from "react";
import styled from "styled-components";

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
  gap: 0.8rem;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 420px;
    height: 420px;
    gap: 0.7rem;
  }
`;

const SWord = styled.div`
  color: #ecb973;
  font-family: Inter;
  font-size: 35px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 2.6rem;
  margin-top: -3rem;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    font-size: 25px;
    margin-bottom: 1.6rem;
    margin-top: -2rem;
  }
`;

const Id = styled.input`
  width: 382px;
  height: 46px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 16px;
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
    width: 260px;
    height: 35px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const Pw = styled.input`
  width: 382px;
  height: 46px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 16px;
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
    width: 260px;
    height: 35px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const ConfirmP = styled.input`
  width: 382px;
  height: 46px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 16px;
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
    width: 260px;
    height: 35px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const Username = styled.input`
  width: 382px;
  height: 46px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 16px;
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
    width: 260px;
    height: 35px;
    border-radius: 12px;
    font-size: 12px;
  }
`;

const SButton = styled.button`
  width: 382px;
  height: 46px;
  border-radius: 15px;
  border: 1px solid #ecb973;
  background: #c58122;
  color: #fff;
  font-family: Inter;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1300px), (max-height: 650px) {
    width: 260px;
    height: 35px;
    border-radius: 12px;
    font-size: 14px;
  }
`;

function Signup() {
  return (
    <>
      <Outside>
        <Circle>
          <SWord>SIGN UP</SWord>
          <Id placeholder="ID"></Id>
          <Pw placeholder="PASSWORD"></Pw>
          <ConfirmP placeholder="CORNFIRM PASSWORD"></ConfirmP>
          <Username placeholder="USERNAME"></Username>
          <SButton>SIGN UP</SButton>
        </Circle>
      </Outside>
    </>
  );
}

export default Signup;
