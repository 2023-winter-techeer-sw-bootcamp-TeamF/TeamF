import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";

const Outside = styled.div`
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Circle = styled.div`
  width: 36.25rem;
  height: 36.25rem;
  flex-shrink: 0;
  border-radius: 31.3125rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  gap: 0.8rem;
`;

const SWord = styled.div`
  color: #ecb973;
  font-family: Inter;
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 2.6rem;
  margin-top: -3rem;
`;

const Id = styled.input`
  width: 23.875rem;
  height: 2.875rem;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  text-indent: 0.625rem;
  line-height: normal;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 0.625rem;
  }
`;

const Pw = styled.input`
  width: 23.875rem;
  height: 2.875rem;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  text-indent: 0.625rem;
  line-height: normal;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 0.625rem;
  }
`;

const ConfirmP = styled.input`
  width: 23.875rem;
  height: 2.875rem;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  text-indent: 0.625rem;
  line-height: normal;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 0.625rem;
  }
`;

const Username = styled.input`
  width: 23.875rem;
  height: 2.875rem;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 200;
  text-indent: 0.625rem;
  line-height: normal;
  display: flex;
  align-items: center;
  &::placeholder {
    color: #ecb973;
    text-indent: 0.625rem;
  }
`;

const SButton = styled.button`
  width: 23.875rem;
  height: 2.875rem;
  border-radius: 0.9375rem;
  border: 0.0625rem solid #ecb973;
  background: #c58122;
  color: #fff;
  font-family: Inter;
  font-size: 1.1875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function Signup() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const loginIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/user/signup?login_id=${loginId}&name=${name}&password=${password}`
      );

      console.log(response.data);
      alert("성공");
    } catch (error) {
      console.error("실패", error);
      alert("실패");
    }
  };

  return (
    <Outside>
      <Circle>
        <SWord>SIGN UP</SWord>
        <Id placeholder="ID" value={loginId} onChange={loginIdChange} />
        <Pw placeholder="PASSWORD" value={password} onChange={passwordChange} />

        <ConfirmP placeholder="CONFIRM PASSWORD" />
        <Username placeholder="USERNAME" value={name} onChange={nameChange} />
        <SButton onClick={handleSignup}>SIGN UP</SButton>
      </Circle>
    </Outside>
  );
}

export default Signup;
