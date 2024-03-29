import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import lottiloading from "../lotti/animation.json";
import styled from "styled-components";
import "../assets/font-YUniverse-B.css";

const LoadingText = styled.h2`
  color: #ECB973;
  font-family: YUniverse-B;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.01rem;
`;

const LoadingPage: React.FC = () => {
  // 로딩 상태를 state로 관리
  const [isLoading, setIsLoading] = useState(true);

  /// useEffect를 사용하여 2초 후에 로딩 상태l를 false로 변경하여 로딩 페이지를 종료
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }; // 컴포넌트가 unmount될 때 타이머를 정리
  }, []);

  // isLoading이 true일 때만 로딩 페이지를 보여줌
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // 수정된 부분: 수직 정렬을 위해 flexDirection을 column으로 설정
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.9)",
          zIndex: 999,
        }}
      >
        {/* 로티 애니메이션 플레이어 */}
        <Lottie
          loop={false}
          animationData={lottiloading}
          play
          style={{ width: 400, height: 400 }}
        />

        {/* 로그인 중에 보여줄 컨텐츠 (로딩 메시지 등) */}
        <LoadingText>Loading...</LoadingText>
      </div>
    );
  }

  // isLoading이 false일 때는 null을 반환하여 아무것도 렌더링하지 않음
  return null;
};

export default LoadingPage;
