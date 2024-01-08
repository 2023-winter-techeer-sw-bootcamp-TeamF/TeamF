import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 1204px;
  margin-left: auto;
  margin-right: auto;
`;

function MyPage() {
  return (
    <>
      <Background>
        <Navbar />
        <Inside>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="31"
            viewBox="0 0 37 31"
            fill="none"
          >
            <path
              d="M33.9688 6.35938H18.7918L13.7838 1.35313C13.5887 1.15642 13.3564 1.00042 13.1006 0.894206C12.8447 0.787987 12.5702 0.733661 12.2932 0.734382H3.03125C2.47181 0.734382 1.93528 0.956619 1.5397 1.3522C1.14411 1.74779 0.921875 2.28432 0.921875 2.84376V28.2652C0.922804 28.7955 1.13386 29.3038 1.5088 29.6787C1.88375 30.0537 2.39201 30.2647 2.92227 30.2656H34.1252C34.643 30.2652 35.1395 30.0593 35.5056 29.6931C35.8718 29.327 36.0777 28.8305 36.0781 28.3127V8.46876C36.0781 7.90932 35.8559 7.37279 35.4603 6.9772C35.0647 6.58162 34.5282 6.35938 33.9688 6.35938ZM2.32812 2.84376C2.32812 2.65728 2.4022 2.47843 2.53407 2.34657C2.66593 2.21471 2.84477 2.14063 3.03125 2.14063H12.2932C12.4791 2.14095 12.6573 2.2149 12.7889 2.3463L16.802 6.35938H2.32812V2.84376ZM34.6719 28.3127C34.6714 28.4576 34.6137 28.5963 34.5112 28.6988C34.4088 28.8012 34.27 28.8589 34.1252 28.8594H2.92227C2.76483 28.8589 2.61398 28.7962 2.50266 28.6849C2.39133 28.5735 2.32859 28.4227 2.32812 28.2652V7.76563H33.9688C34.1552 7.76563 34.3341 7.83971 34.4659 7.97157C34.5978 8.10343 34.6719 8.28228 34.6719 8.46876V28.3127Z"
              fill="#ECB973"
            />
          </svg>
        </Inside>
      </Background>
    </>
  );
}

export default MyPage;
