import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "../state/atom.ts";
import LoadingPage from "../component/LoadingPage";
import Swal from "sweetalert2";
import axios from "axios";
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

  &:hover {
    opacity: 0.7;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
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

  const showToast = async (): Promise<void> => {
    await Swal.fire({
      icon: "success",
      title: "로그인 성공",
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    navigate("/fortuneselect");
  };

  const showToastFail = async (): Promise<void> => {
    await Swal.fire({
      icon: "error",
      title: "로그인 실패",
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

  const refreshAccessToken = async (refreshToken: object) => {
    try {
      const response = await axios.post("/api/v1/users/refresh-token", {
        refreshToken: refreshToken,
      });
      // 새로운 토큰 저장
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data.data;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      console.log(response.data.data);
      setAccessTokenTimeout(newRefreshToken);
    } catch (error) {
      console.error("토큰 재발급에 실패했습니다.", error);
    }
  };

  // 엑세스 토큰 만료 5분 전에 토큰을 재발급하는 타이머 설정
  const setAccessTokenTimeout = (refreshToken: object) => {
    // 엑세스 토큰 만료 시간을 가정하여 55분으로 설정
    const EXPIRES_IN = 55 * 60 * 1000;
    setTimeout(() => {
      refreshAccessToken(refreshToken);
    }, EXPIRES_IN);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/v1/users/login", {
        login_id: loginId,
        password: password,
      });
      console.log(response.data);
      const { accessToken, refreshToken } = response.data.data;
      setAccessToken(accessToken); // 엑세스 토큰을 상태에 저장합니다.
      setRefreshToken(refreshToken); // 리프레시 토큰을 상태에 저장합니다.

      setAccessTokenTimeout(refreshToken);

      await showToast();
    } catch (error) {
      console.error("로그인에 실패했습니다", error);
      await showToastFail();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <>
      <Outside>
        <LoadingPage></LoadingPage>
        <form onSubmit={handleSubmit}>
          <Circle>
            <LWord>LOG IN</LWord>
            <Id placeholder="ID" value={loginId} onChange={loginIdChange} />
            <Pw
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={passwordChange}
            />
            <LButton type="submit">LOG IN</LButton>
            <Sign>
              <Link to="/signup">SIGN UP</Link>
            </Sign>
          </Circle>
        </form>
      </Outside>
    </>
  );
}

export default Login;
