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

const SWord = styled.div`
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

const ConfirmP = styled.input`
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

const Username = styled.input`
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

const SButton = styled.button`
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
