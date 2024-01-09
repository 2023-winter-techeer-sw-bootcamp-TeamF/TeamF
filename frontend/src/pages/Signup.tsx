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

function Signup() {
  return (
    <>
      <Outside>
        <Circle>test</Circle>
      </Outside>
    </>
  );
}

export default Signup;
