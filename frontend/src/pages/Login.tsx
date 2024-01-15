import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "../state/atom.ts";
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
  gap: 1.73rem;
`;

const LWord = styled.div`
  color: #ecb973;
  font-family: Inter;
  font-size: 2.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 1.9rem;
`;

const Id = styled.input`
  width: 25rem;
  height: 3.25rem;
  border-radius: 1.0625rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 1.125rem;
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
  width: 25rem;
  height: 3.25rem;
  border-radius: 1.0625rem;
  border: 0.0625rem solid #ecb973;
  background: rgba(217, 217, 217, 0);
  color: #ecb973;
  font-family: Inter;
  font-size: 1.125rem;
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

const LButton = styled.button`
  width: 25rem;
  height: 3.25rem;
  border-radius: 1.0625rem;
  border: 0.0625rem solid #ecb973;
  background: #c58122;
  color: #fff;
  font-family: Inter;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  text-decoration-line: underline;
  margin-top: -0.4rem;
  cursor: pointer;
`;

function Login() {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);

  const loginIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/user/login", {
        login_id: loginId,
        password: password,
      });

      setAccessToken(response.data.data.accessToken);
      setRefreshToken(response.data.data.refreshToken);

      alert("성공");
      navigate("/fortuneselect");
    } catch (error) {
      console.error("실패", error);
      alert("실패");
    }
  };

  return (
    <>
      <Outside>
        <Circle>
          <LWord>LOG IN</LWord>
          <Id placeholder="ID" value={loginId} onChange={loginIdChange} />
          <Pw
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={passwordChange}
          ></Pw>
          <LButton onClick={handleLogin}>LOG IN</LButton>
          <Sign>
            <Link to="/signup">SIGN UP</Link>
          </Sign>
        </Circle>
      </Outside>
    </>
  );
}

export default Login;
