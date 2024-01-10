import React from "react";
import Navbar from "../component/Navbar";
import styled from "styled-components";
import TaroEx1 from "../assets/TaroEx1.png";
import TaroEx2 from "../assets/TaroEx2.png";
import TaroEx3 from "../assets/TaroEx3.png";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
`;

const Inside = styled.div`
  width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 18px;
`;

const DetailBackground = styled.div`
  width: 965px;
  height: 719px;
  border-radius: 4px;
  background: #e9e5da;
  margin-top: 2rem;

  display: flex;
  justify-content: center;
  @media screen and (max-width: 1300px), (max-height: 800px) {
    height: 500px;
  }
`;

const DetailLine1 = styled.div`
  width: 940px;
  height: 680px;
  border-radius: 10px;
  border: 0.5px solid #b88150;
  background: rgba(217, 217, 217, 0);

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  flex-direction: column;
  @media screen and (max-width: 1300px), (max-height: 800px) {
    height: 450px;
  }
`;

const DetailLine2 = styled.div`
  width: 929px;
  height: 634px;
  border-radius: 8px 8px 0px 0px;
  border: 0.5px solid #b88150;
  background: rgba(217, 217, 217, 0);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 1300px), (max-height: 800px) {
    height: 400px;
  }
`;

const Date = styled.p`
  display: flex;
  width: 177px;
  height: 41px;
  flex-direction: column;
  justify-content: center;
  color: #b88150;
  text-align: center;
  font-family: "Italiana", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const Title = styled.p`
  color: #b99e6f;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  width: 4.5rem;
  margin-top: 15px;
  line-height: 1.5;

  @media screen and (max-width: 1300px), (max-height: 800px) {
    display: none;
  }
`;

const Worry = styled.p`
  width: 450px;
  height: 50px;
  color: #b99e6f;
  text-align: center;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 13px;
  overflow-y: scroll;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 5px; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }

  @media screen and (max-width: 1300px), (max-height: 800px) {
    display: none;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: row;
  gap: 76px;
  margin-top: 2rem;
`;

const CardBackground = styled.div`
  width: 141.75px;
  height: 243px;
  border-radius: 15px;
  background: #b99e6f;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1300px), (max-height: 800px) {
    height: 180px;
  }
`;

const TaroEx = styled.img`
  width: 125.135px;
  height: 225.243px;
  @media screen and (max-width: 1300px), (max-height: 800px) {
    height: 150px;
  }
`;

const Solutions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 29px;
  align-items: center;
`;

const SolutionTitle = styled.p`
  color: #806838;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  @media screen and (max-width: 1300px), (max-height: 800px) {
    display: none;
  }
`;

const SolutionDetail = styled.p`
  width: 622px;
  color: #806838;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ecb973; /* 황금색 스크롤바 색상 */
    border-radius: 5px; /* 스크롤바 모양 (둥근 모서리) */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #daa520; /* 호버시 색상 변경 (더 진한 황금색) */
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
`;

function ResultDetail() {
  return (
    <>
      <Background>
        <Inside>
          <Navbar />
          <Details>
            <DetailBackground>
              <DetailLine1>
                <DetailLine2>
                  <Title>당신의 고민 . . .</Title>
                  <Worry>
                    일하는데 스트레스를 너무 많이 받습니다. 이직을 하면 좋을 지
                    아니면 더 적응을 해야할 지 알려주세요. 일하는데 스트레스를
                    너무 많이 받습니다. 이직을 하면 좋을 지 아니면 더 적응을
                    해야할 지 알려주세요.
                  </Worry>
                  <Cards>
                    <CardBackground>
                      <TaroEx src={TaroEx1} />
                    </CardBackground>
                    <CardBackground>
                      <TaroEx src={TaroEx2} />
                    </CardBackground>
                    <CardBackground>
                      <TaroEx src={TaroEx3} />
                    </CardBackground>
                  </Cards>
                  <Solutions>
                    <SolutionTitle>OOO 타로 마스터의 솔루션</SolutionTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="20"
                      viewBox="0 0 27 20"
                      fill="none"
                    >
                      <path
                        d="M8.4375 3.33333L10.125 0H6.75C3.02062 0 0 4.65 0 8.33333V20H11.8125V8.33333H5.0625C5.0625 3.33333 8.4375 3.33333 8.4375 3.33333ZM20.25 8.33333C20.25 3.33333 23.625 3.33333 23.625 3.33333L25.3125 0H21.9375C18.2081 0 15.1875 4.65 15.1875 8.33333V20H27V8.33333H20.25Z"
                        fill="#B99E6F"
                        fill-opacity="0.8"
                      />
                    </svg>
                    <SolutionDetail>
                      지금 당신이 처한 상황에서 가장 중요한 건, 새로운 시작에
                      대한 용기와 기존 직장에서의 성장 가능성, 그리고 미래에
                      대한 안정성 사이의 균형을 찾는 것 같아. 변화는 두려울 수
                      있지만, 새로운 도전에서 더 큰 만족과 성취를 발견할 수도
                      있어. 네가 어떤 결정을 내리든, 너를 응원할게! 🌟💕 지금
                      당신이 처한 상황에서 가장 중요한 건, 새로운 시작에 대한
                      용기와 기존 직장에서의 성장 가능성, 그리고 미래에 대한
                      안정성 사이의 균형을 찾는 것 같아. 변화는 두려울 수
                      있지만, 새로운 도전에서 더 큰 만족과 성취를 발견할 수도
                      있어. 네가 어떤 결정을 내리든, 너를 응원할게! 🌟💕
                    </SolutionDetail>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="20"
                      viewBox="0 0 27 20"
                      fill="none"
                    >
                      <path
                        d="M15.1875 8.33333V20H27V8.33333C27 4.66667 23.9625 0 20.25 0H16.875L18.5625 3.33333C18.5625 3.33333 21.9375 3.33333 21.9375 8.33333H15.1875ZM0 8.33333V20H11.8125V8.33333C11.8125 4.66667 8.775 0 5.0625 0H1.6875L3.375 3.33333C3.375 3.33333 6.75 3.33333 6.75 8.33333H0Z"
                        fill="#B99E6F"
                        fill-opacity="0.8"
                      />
                    </svg>
                  </Solutions>
                </DetailLine2>
                <Date>ㆍ2024.00.00ㆍ</Date>
              </DetailLine1>
            </DetailBackground>
            <Buttons>
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle cx="20" cy="20" r="19.5" stroke="#ECB973" />
                  <path
                    d="M20.9558 25.7525C21.1057 25.9056 21.1899 26.1131 21.1899 26.3295C21.1899 26.5459 21.1057 26.7535 20.9558 26.9066L19.9621 27.9269C18.9112 28.9988 17.4862 29.6007 16.0005 29.6003C14.5148 29.5998 13.0901 28.9969 12.0399 27.9244C10.9897 26.8518 10.3999 25.3973 10.4004 23.8809C10.4009 22.3646 10.9915 20.9105 12.0424 19.8386L14.4537 17.3775C15.4631 16.3464 16.8204 15.7481 18.2478 15.7048C19.6753 15.6616 21.0649 16.1767 22.1325 17.1448C22.2112 17.2161 22.2755 17.3026 22.3215 17.3992C22.3676 17.4958 22.3945 17.6007 22.4008 17.708C22.4071 17.8153 22.3927 17.9227 22.3583 18.0243C22.3239 18.1258 22.2703 18.2195 22.2004 18.2999C22.1306 18.3803 22.0459 18.4459 21.9513 18.4928C21.8566 18.5398 21.7538 18.5674 21.6487 18.5738C21.5436 18.5802 21.4383 18.5655 21.3388 18.5304C21.2393 18.4953 21.1475 18.4406 21.0688 18.3693C20.3063 17.6782 19.314 17.3105 18.2947 17.3414C17.2755 17.3723 16.3063 17.7995 15.5854 18.5356L13.1741 20.9936C12.424 21.7592 12.0026 22.7975 12.0026 23.8802C12.0026 24.9629 12.424 26.0012 13.1741 26.7668C13.9241 27.5323 14.9415 27.9624 16.0022 27.9624C17.063 27.9624 18.0803 27.5323 18.8304 26.7668L19.8241 25.7525C19.8984 25.6766 19.9866 25.6164 20.0837 25.5754C20.1808 25.5343 20.2849 25.5131 20.39 25.5131C20.4951 25.5131 20.5991 25.5343 20.6962 25.5754C20.7933 25.6164 20.8815 25.6766 20.9558 25.7525ZM27.9618 11.6717C26.9107 10.6013 25.4866 10.0002 24.0019 10.0002C22.5172 10.0002 21.0931 10.6013 20.0421 11.6717L19.0484 12.6869C18.8984 12.8401 18.8142 13.0478 18.8143 13.2643C18.8144 13.4808 18.8988 13.6884 19.0489 13.8415C19.1989 13.9945 19.4024 14.0804 19.6145 14.0803C19.8267 14.0802 20.0301 13.9941 20.18 13.8409L21.1737 12.8267C21.9238 12.0611 22.9411 11.6311 24.0019 11.6311C25.0627 11.6311 26.08 12.0611 26.8301 12.8267C27.5802 13.5923 28.0016 14.6306 28.0016 15.7133C28.0016 16.796 27.5802 17.8343 26.8301 18.5999L24.4188 21.063C23.6975 21.7986 22.7281 22.2253 21.7088 22.2556C20.6896 22.2859 19.6975 21.9177 18.9354 21.2263C18.7763 21.0823 18.5677 21.0087 18.3555 21.0217C18.1432 21.0347 17.9448 21.1333 17.8037 21.2956C17.6627 21.458 17.5906 21.6709 17.6033 21.8875C17.6161 22.1041 17.7126 22.3067 17.8717 22.4507C18.939 23.4191 20.3285 23.9346 21.756 23.8917C23.1834 23.8489 24.5408 23.2509 25.5505 22.2201L27.9618 19.759C29.0111 18.6862 29.6004 17.2322 29.6004 15.7164C29.6004 14.2005 29.0111 12.7465 27.9618 11.6737V11.6717Z"
                    fill="#ECB973"
                  />
                </svg>
              </Button>
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle cx="20" cy="20" r="19.5" stroke="#ECB973" />
                  <path
                    d="M12 12L28 28M12 28L28 12"
                    stroke="#ECB973"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <circle cx="20" cy="20" r="19.5" stroke="#ECB973" />
                  <path
                    d="M14.4876 30.0003C13.9261 30.0003 13.4471 29.8007 13.0507 29.4016C12.6551 29.0026 12.4573 28.5194 12.4573 27.9521V12.245H11.2002V10.9768H16.2288V10.0002H23.7716V10.9768H28.8002V12.245H27.5431V27.9521C27.5431 28.5354 27.3495 29.0224 26.9623 29.4131C26.5742 29.8045 26.0911 30.0003 25.5128 30.0003H14.4876ZM26.2859 12.245H13.7145V27.9521C13.7145 28.1795 13.787 28.3663 13.932 28.5126C14.077 28.6589 14.2622 28.732 14.4876 28.732H25.5128C25.7055 28.732 25.8828 28.6509 26.0445 28.4885C26.2055 28.3253 26.2859 28.1465 26.2859 27.9521V12.245ZM17.2445 26.1956H18.5017V14.7815H17.2445V26.1956ZM21.4987 26.1956H22.7559V14.7815H21.4987V26.1956Z"
                    fill="#ECB973"
                  />
                </svg>
              </Button>
            </Buttons>
          </Details>
        </Inside>
      </Background>
    </>
  );
}

export default ResultDetail;
