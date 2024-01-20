import styled from "styled-components";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";
import Swal from "sweetalert2";

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
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const confirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const showToast = async (): Promise<void> => {
    await Swal.fire({
      icon: "success",
      title: "회원가입 성공!",
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
    navigate("/login");
  };

  const showToastFail = async (): Promise<void> => {
    await Swal.fire({
      icon: "question",
      title: "이미 존재하는 계정입니다",
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

  const showToastType = async (): Promise<void> => {
    await Swal.fire({
      icon: "info",
      title: "모두 입력해주세요!",
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

  const showToastConfirm = async (): Promise<void> => {
    await Swal.fire({
      icon: "info",
      title: "비밀번호가 일치하지 않습니다.",
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

  const handleSignup = async () => {
    if (!loginId || !name || !password || !confirmPassword) {
      await showToastType();
      return;
    }

    if (password !== confirmPassword) {
      await showToastConfirm();
      return;
    }
    try {
      const response = await axios.post(
        `/user/signup?login_id=${loginId}&name=${name}&password=${password}`
      );

      console.log(response.data);
      await showToast();
    } catch (error) {
      await showToastFail();
    }
  };

  return (
    <Outside>
      <LoadingPage></LoadingPage>
      <Circle>
        <SWord>SIGN UP</SWord>
        <Id placeholder="ID" value={loginId} onChange={loginIdChange} />
        <Pw placeholder="PASSWORD" value={password} onChange={passwordChange} />

        <ConfirmP
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChange={confirmPasswordChange}
        />
        <Username placeholder="USERNAME" value={name} onChange={nameChange} />
        <SButton onClick={handleSignup}>SIGN UP</SButton>
      </Circle>
    </Outside>
  );
}

export default Signup;
